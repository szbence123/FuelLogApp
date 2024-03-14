import { FuelType } from "../typedefs/fuelTypes";
import { executeQuery } from "./QueryBuilder";
import { db } from "./db";

export const getAllFuelTypes = (): Promise<FuelType[]> => {
  return executeQuery(db, "SELECT * FROM FUEL_TYPES");
};
