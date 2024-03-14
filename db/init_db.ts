import { executeQuery } from "./QueryBuilder";
import { db } from "./db";

export const init_db = async () => {
  try {
    //await truncate(db);
    await init_car_table(db);
    await init_fuelinfo_table(db);
    await init_cost_types_table(db);
    await init_costs_table(db);
    await init_fuel_types_table(db);
  } catch (error) {
    throw error;
  }
};

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
        name TEXT UNIQUE,
        color TEXT
    );`
  );
  /*
  await executeQuery(
    db,
    `INSERT OR IGNORE INTO FUEL_TYPES (name, color)
      VALUES
        ('95-ös Benzin', 'green'),
        ('100-as Benzin', 'green'),
        ('B7 Dízel', 'black');`
  ); */
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
  console.info("FUEL_TYPES");
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
      DROP TABLE IF EXISTS FUEL_TYPES
      DROP TABLE IF EXISTS COST_TYPES;
      DROP TABLE IF EXISTS COSTS;
      `
  );
}
