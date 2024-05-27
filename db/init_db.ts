import { SQLiteDatabase } from "expo-sqlite";

export const initDatabase = async (db: SQLiteDatabase) => {
	try {
		await init_fuel_types_table(db);
		await init_car_table(db);
		await init_fuelinfo_table(db);
		await init_cost_types_table(db);
		//await init_costs_table();
	} catch (error) {
		throw error;
	}
};

async function alter() {
	//await executeQuery(db, `SELECT * FROM FUEL_TYPES`);
	//await executeQuery(db, `UPDATE FUEL_TYPES SET name='E7' WHERE id = 1`);
	//await executeQuery(db, `UPDATE FUEL_TYPES SET name='B7' WHERE id = 3`);
}

async function init_fuel_types_table(db: SQLiteDatabase) {
	console.info("FUEL_TYPES");
	await db.execAsync(
		`CREATE TABLE IF NOT EXISTS FUEL_TYPES (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        short_name TEXT UNIQUE,
        color TEXT
    );`
	);

	await db.execAsync(
		`INSERT OR IGNORE INTO FUEL_TYPES (name, short_name, color)
      VALUES
        ('95-ös Benzin', 'E10', 'green'),
        ('100-as Benzin', 'E5', 'green'),
        ('Dízel', 'B7', 'black'),
        ('Dízel Premium', 'B7P', 'black');`
	);
}

async function init_car_table(db: SQLiteDatabase) {
	console.info("CARS");
	await db.execAsync(
		`CREATE TABLE IF NOT EXISTS CARS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        reg_number INTEGER UNIQUE,
        fuel_type_id INTEGER,
        FOREIGN KEY (fuel_type_id) REFERENCES FUEL_TYPES(id)
       );`
	);
}

async function init_fuelinfo_table(db: SQLiteDatabase) {
	console.info("FUEL_LOG");
	await db.execAsync(
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

async function init_cost_types_table(db: SQLiteDatabase) {
	console.info("COST_TYPES");
	await db.execAsync(
		`CREATE TABLE IF NOT EXISTS COST_TYPES (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )`
	);
}

/*
async function init_costs_table() {
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
*/
export async function truncate(db: SQLiteDatabase) {
	console.info("TRUNCATE");
	await db.execAsync(
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
