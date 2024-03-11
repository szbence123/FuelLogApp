import * as SQLite from "expo-sqlite";
import { CarModel } from "../typedefs/cars";
import { executeQuery } from "./QueryBuilder";

const db = SQLite.openDatabase("fuel-log.db");
export const insertCar = (name: string, regNumber: string) => {
  return executeQuery<CarModel[]>(
    db,
    "INSERT INTO CAR (name, regNumber) VALUES (?, ?)",
    [name, regNumber]
  );
};

export const removeCar = (id: number, refetch: Function) => {
  return executeQuery<CarModel[]>(db, "DELETE FROM CAR WHERE id = ?", [
    id
  ]).then((r) => refetch());
};

export const getAllCars = (): Promise<CarModel[]> => {
  return executeQuery<CarModel[]>(db, "SELECT * FROM CAR");
};
