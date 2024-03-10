import * as SQLite from "expo-sqlite";
import {FuelInfoModel} from "../typedefs/cars";
import { executeQuery } from "./QueryBuilder";

const db = SQLite.openDatabase('fuel-log.db');


export const insertFuelInfo = (date: string, km: number, all_km: number, price: number,  location: string, amount: number, car_id: number) => {
    return executeQuery(db,
        "INSERT INTO FUELINFO (date, km, all_km, price, location, amount, car_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [date, km,  all_km, price, location, amount, car_id]
    )         
};


export const getAllFuelInfo = (carId: number): Promise<FuelInfoModel[]> => {
    return executeQuery(db, "SELECT * FROM FUELINFO WHERE car_id = ?", [carId]);
};

export const getAllFuelPricesForChart = (carId: number, year: string): Promise<FuelInfoModel[]> => {
   return executeQuery(db, 
        "SELECT SUM(price) as price, DATE(date) FROM FUELINFO WHERE car_id = ? AND strftime('%Y', date) = ? GROUP BY DATE(date)",
        [carId, year]
    )
};


export const removeFuelInfo = (id: number, refetch: Function) => {
    return executeQuery(db, "DELETE FROM FUELINFO WHERE id = ?", [id]).then(r => refetch())
};
