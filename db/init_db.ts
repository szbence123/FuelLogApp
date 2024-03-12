import { executeQuery } from "./QueryBuilder";
import { db } from "./db";

export const init_db = async () => {
  try {
    await init_car_table(db);
    await init_fuelinfo_table(db);
    await init_cost_types_table(db);
    await init_costs_table(db);
    await init_fuel_types_table(db);
    //await alter();
  } catch (error) {
    throw error;
  }
};

async function init_car_table(db) {
  await executeQuery(
    db,
    `CREATE TABLE IF NOT EXISTS CAR (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        regNumber INTEGER
      )`
  );
}
async function init_fuelinfo_table(db) {
  await executeQuery(
    db,
    `CREATE TABLE IF NOT EXISTS FUELINFO (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date DATETIME,
        km REAL,
        all_km REAL,
        price REAL,
        location TEXT,
        amount REAL,
        car_id INTEGER,
        FOREIGN KEY (car_id) REFERENCES CAR(id),
        fuel_type_id INTEGER,
        FOREIGN KEY (fuel_type_id) REFERENCES FUELTaYPES(id)
    )`
  );
}

async function init_cost_types_table(db) {
  await executeQuery(
    db,
    ` CREATE TABLE IF NOT EXISTS COST_TYPES (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )`
  );
}

async function init_costs_table(db) {
  await executeQuery(
    db,
    `CREATE TABLE IF NOT EXISTS COSTS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cost_type_id INTEGER,
        car_id INTEGER,
        price REAL,
        FOREIGN KEY (cost_type_id) REFERENCES COST_TYPES(id),
        FOREIGN KEY (car_id) REFERENCES CAR(id)
    )`
  );
}

async function init_fuel_types_table(db) {
  await executeQuery(
    db,
    `CREATE TABLE IF NOT EXISTS FUELTYPES (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        color TEXT
    )`
  );

  // await executeQuery(
  //   db,
  //   `INSERT OR IGNORE INTO FUELTYPES (name, color)
  //     VALUES
  //       ('95-ös Benzin', 'green'),
  //       ('100-as Benzin', 'green'),
  //       ('B7 Dízel', 'black'),`
  // );
}

async function alter() {
  await executeQuery(
    db,
    `
    CREATE TABLE IF NOT EXISTS FUELINFO_NEW (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATETIME,
      km REAL,
      all_km REAL,
      price REAL,
      location TEXT,
      amount REAL,
      car_id INTEGER,
      fuel_type_id INTEGER,
      FOREIGN KEY (car_id) REFERENCES CAR(id),
      FOREIGN KEY (fuel_type_id) REFERENCES FUELTYPES(id)
  );
  `
  );
}

export function truncate(db) {
  executeQuery(
    db,
    `
      DROP TABLE CAR;
      DROP TABLE FUELINFO;
      DROP TABLE COST_TYPES;
      DROP TABLE COSTS;`
  );
}
