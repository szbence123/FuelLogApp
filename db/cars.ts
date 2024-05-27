import { CarModel } from "../types/cars";
import { executeQuery } from "./QueryBuilder";
import { db } from "./db";

export const insertCar = async (name: string, regNumber: string, fuelTypeId: number, showToast?: Function) => {
	return executeQuery<CarModel[]>(db, "INSERT INTO CARS (name, reg_number, fuel_type_id) VALUES (?, ?, ?)", [name, regNumber, fuelTypeId], showToast);
};

export const removeCar = (id: number, refetch: Function, showToast: Function) => {
	return executeQuery<CarModel[]>(db, "DELETE FROM CARS WHERE id = ?", [id], showToast).then((r) => refetch());
};

export const getAllCars = (): Promise<CarModel[]> => {
	const cols = "c.id, c.name as name, reg_number, color, f.name as fuel_type_name, f.id as fuel_type_id, f.short_name as fuel_type_short_name";
	return executeQuery<CarModel[]>(db, `SELECT ${cols} FROM CARS c INNER JOIN FUEL_TYPES f on c.fuel_type_id = f.id`);
};
