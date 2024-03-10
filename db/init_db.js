export const init_db = async (db) => {
    await create_car_table(db);
    await create_fuelinfo_table(db);
    await create_cost_types_table(db);
    await create_costs_table(db);
}


async function create_car_table(db) {
    db.transaction(tx => {
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS CAR (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          regNumber INTEGER
        );
      `,
            [],
        (res) => { 
            //console.log(res)
        },
        error => { console.log('Error creating table', error) });
    })
}
async function create_fuelinfo_table(db) {
    db.transaction(tx => {
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS FUELINFO (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date DATETIME,
          km REAL,
          all_km REAL,
          price REAL,
          location TEXT,
          amount REAL,
          car_id INTEGER,
          FOREIGN KEY (car_id) REFERENCES CAR(id)
        );
      `,
            [],
            () => { console.log('FUELINFO table created successfully'); },
            error => { console.log('Error creating table', error) });
    })
}

async function create_cost_types_table(db) {
    db.transaction(tx => {
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS COST_TYPES (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT
        );
      `,
            [],
            () => { console.log('COST_TYPES table created successfully'); },
            error => { console.log('Error creating table', error) });
    })
}
            // Execute SQL to create the COSTS table
async function create_costs_table(db) {
    db.transaction(tx => {
        tx.executeSql(`
        CREATE TABLE IF NOT EXISTS COSTS (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          cost_type_id INTEGER,
          car_id INTEGER,
          price REAL,
          FOREIGN KEY (cost_type_id) REFERENCES COST_TYPES(id),
          FOREIGN KEY (car_id) REFERENCES CAR(id)
        );
      `,
            [],
            () => { console.log('COSTS table created successfully'); },
            error => { console.log('Error creating table', error) });
    })
}

export function truncate(db) {
    db.transaction(tx => {
        tx.executeSql(`
            DROP TABLE CAR;
            DROP TABLE FUELINFO;
            DROP TABLE COST_TYPES;
            DROP TABLE COSTS;`,
            [],
            () => { console.log('Database dropped'); },
            error => { console.log('Error dropping database', error) });
    });
}
