import { FuelType } from "../types/fuelTypes";
import { db } from "./db";

export const getAllFuelTypes = async (): Promise<FuelType[]> => {
	return db.getAllAsync("SELECT * FROM FUEL_TYPES");
};
