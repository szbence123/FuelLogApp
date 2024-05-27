import { db } from "./db";

export const insertCar = async (name: string, regNumber: string, fuelTypeId: number, showToast?: Function) => {
	return db.runAsync("INSERT INTO CARS (name, reg_number, fuel_type_id) VALUES (?, ?, ?)", name, regNumber, fuelTypeId);
};

export const removeCar = (id: number, refetch: Function, showToast: Function) => {
	return db.runAsync("DELETE FROM CARS WHERE id = ?", id).then((r) => refetch());
};

export const getAllCars = () => {
	const cols = "c.id, c.name as name, reg_number, color, f.name as fuel_type_name, f.id as fuel_type_id, f.short_name as fuel_type_short_name";
	let res = db.getAllSync(`SELECT ${cols} FROM CARS c INNER JOIN FUEL_TYPES f on c.fuel_type_id = f.id`);
	console.log(res);
	return res;
};
