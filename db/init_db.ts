import { executeQuery } from "./QueryBuilder";
import { db } from "./db";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

export const init_db = async () => {
	try {
		await truncate(db);
		//await alter(db);
		//deleteDatabase();
		await init_car_table(db);
		await init_fuelinfo_table(db);
		await init_cost_types_table(db);
		await init_costs_table(db);
		await init_fuel_types_table(db);

		//await alter(db);
	} catch (error) {
		throw error;
	}
};

const deleteDatabase = async () => {
	try {
		const dbName = "fuel-log.db";
		const dbPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

		// Check if the database exists
		const dbInfo = await FileSystem.getInfoAsync(dbPath);

		if (dbInfo.exists) {
			// Delete the database file
			await FileSystem.deleteAsync(dbPath, { idempotent: true });
		}
	} catch (error) {
		console.error("Error deleting database:", error);
	}
};

async function alter(db) {
	await executeQuery(db, ` DELETE FROM FUEL_LOGS`);
	//await executeQuery(db, `SELECT * FROM FUEL_TYPES`);
	//await executeQuery(db, `UPDATE FUEL_TYPES SET name='E7' WHERE id = 1`);
	//await executeQuery(db, `UPDATE FUEL_TYPES SET name='B7' WHERE id = 3`);
}

async function init_car_table(db) {
	console.info("CARS");
	await executeQuery(
		db,
		`CREATE TABLE IF NOT EXISTS CARS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        reg_number INTEGER UNIQUE,
        fuel_type_id INTEGER,
        FOREIGN KEY (fuel_type_id) REFERENCES FUEL_TYPES(id)
       );`
	);
}

async function init_fuel_types_table(db) {
	console.info("FUEL_TYPES");
	await executeQuery(
		db,
		`CREATE TABLE IF NOT EXISTS FUEL_TYPES (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        short_name TEXT UNIQUE,
        color TEXT
    );`
	);

	await executeQuery(
		db,
		`INSERT OR IGNORE INTO FUEL_TYPES (name, short_name, color)
      VALUES
        ('95-ös Benzin', 'E10', 'green'),
        ('100-as Benzin', 'E5', 'green'),
        ('Dízel', 'B7', 'black'),
        ('Dízel Premium', 'B7P', 'black');`
	);
}

async function init_fuelinfo_table(db) {
	console.info("FUEL_LOG");
	await executeQuery(
		db,
		`CREATE TABLE IF NOT EXISTS FUEL_LOGS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATETIME,
        km REAL,
        all_km REAL,
        price REAL,
        location TEXT,
        amount REAL,
        car_id INTEGER,
        fuel_type_id INTEGER,
        FOREIGN KEY (car_id) REFERENCES CARS(id),
        FOREIGN KEY (fuel_type_id) REFERENCES FUEL_TYPES(id)
    );`
	);
}

async function init_cost_types_table(db) {
	console.info("COST_TYPES");
	await executeQuery(
		db,
		` CREATE TABLE IF NOT EXISTS COST_TYPES (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )`
	);
}

async function init_costs_table(db) {
	console.info("COSTS");
	await executeQuery(
		db,
		`CREATE TABLE IF NOT EXISTS COSTS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cost_type_id INTEGER,
        car_id INTEGER,
        price REAL,
        FOREIGN KEY (cost_type_id) REFERENCES COST_TYPES(id),
        FOREIGN KEY (car_id) REFERENCES CARS(id)
    )`
	);
}

export function truncate(db) {
	console.info("TRUNCATE");
	executeQuery(
		db,
		`
      DROP TABLE IF EXISTS CAR;
      DROP TABLE IF EXISTS FUELINFO;
      DROP TABLE IF EXISTS FUEL_LOG;

      DROP TABLE IF EXISTS CARS;
      DROP TABLE IF EXISTS FUEL_LOGS;
      DROP TABLE IF EXISTS FUEL_TYPES;
      DROP TABLE IF EXISTS COST_TYPES;
      DROP TABLE IF EXISTS COSTS;
      `
	);
}
