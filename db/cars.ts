import { CarModel } from "../typedefs/cars";
import { executeQuery } from "./QueryBuilder";
import { db } from "./db";

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
