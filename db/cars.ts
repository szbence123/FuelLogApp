import { CarModel } from "../typedefs/cars";
import { executeQuery } from "./QueryBuilder";
import { db } from "./db";

export const insertCar = (
  name: string,
  regNumber: string,
  fuelTypeId: number
) => {
  return executeQuery<CarModel[]>(
    db,
    "INSERT INTO CARS (name, reg_number, fuel_type_id) VALUES (?, ?, ?)",
    [name, regNumber, fuelTypeId]
  );
};

export const removeCar = (id: number, refetch: Function) => {
  return executeQuery<CarModel[]>(db, "DELETE FROM CARS WHERE id = ?", [
    id
  ]).then((r) => refetch());
};

export const getAllCars = (): Promise<CarModel[]> => {
  return executeQuery<CarModel[]>(
    db,
    "SELECT c.id, c.name as name, reg_number, color, f.name as fuel_type_name, f.id as fuel_type_id FROM CARS c INNER JOIN FUEL_TYPES f on c.fuel_type_id = f.id"
  );
};
