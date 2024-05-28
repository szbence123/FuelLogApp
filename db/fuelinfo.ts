import { FuelInfoModel } from "../types/cars";
import { db } from "./db";
import { showSuccessMessage, showErrorMessage } from "./messages";

export const insertFuelInfo = (
	date: string,
	km: number,
	all_km: number,
	price: number,
	location: string,
	amount: number,
	car_id: number,
	fuel_type_id: number,
	showToast: Function
) => {
	db.runAsync(
		"INSERT INTO FUEL_LOGS(date, km, all_km, price, location, amount, car_id, fuel_type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
		date,
		km,
		all_km,
		price,
		location,
		amount,
		car_id,
		fuel_type_id
	)
		.then((_) => showSuccessMessage(showToast))
		.catch((err) => showErrorMessage(showToast, err));
};

export const getFuelInfoForExport = () => {
	const cols = `date as "Dátum", amount as "Mennyiség (l)", price as "Ár (Ft)", km as "Km állása", all_km as "Össz.Km", location as "Tankolás helye", c.name as "Autó neve", ft.name as "Üzemanyag"`;

	return db.getAllAsync(
		`SELECT ${cols} FROM FUEL_LOGS fl INNER JOIN FUEL_TYPES ft on fl.fuel_type_id = ft.id INNER JOIN CARS c on c.id = fl.car_id ORDER BY date DESC`
	);
};

export const getAllFuelInfo = (carId: number, selectedYear: string, start?: string, end?: string): Promise<FuelInfoModel[]> => {
	const cols = "date, km, all_km, price, fl.id, location, amount, car_id, fuel_type_id, ft.name, ft.color";

	if (start && end) {
		return db.getAllAsync(
			`SELECT ${cols} FROM FUEL_LOGS fl INNER JOIN FUEL_TYPES ft on fl.fuel_type_id = ft.id  WHERE car_id = ? AND date BETWEEN  ?  AND  ? ORDER BY date DESC`,
			carId,
			start,
			end
		);
	}
	if (selectedYear == "összes") {
		return db.getAllAsync(
			`SELECT ${cols} FROM FUEL_LOGS fl INNER JOIN FUEL_TYPES ft on fl.fuel_type_id = ft.id  WHERE car_id = ?  ORDER BY date DESC`,
			carId
		);
	}
	return db.getAllAsync(
		`SELECT ${cols} FROM FUEL_LOGS fl INNER JOIN FUEL_TYPES ft on fl.fuel_type_id = ft.id  WHERE car_id = ? AND date LIKE '%' || ? || '%' ORDER BY date DESC`,
		carId,
		selectedYear
	);
};

export const getAllFuelPricesForChart = (carId: number, year: string, start: string, end: string): Promise<FuelInfoModel[]> => {
	if (start && end) {
		console.log(start, end);
		return db.getAllAsync(
			"SELECT SUM(price) as price, DATE(date) as date FROM FUEL_LOGS WHERE car_id = ? AND date BETWEEN  ?  AND  ? GROUP BY DATE(date)",
			carId,
			start,
			end
		);
	}
	return db.getAllAsync(
		"SELECT SUM(price) as price, DATE(date) as date FROM FUEL_LOGS WHERE car_id = ? AND strftime('%Y', date) = ? GROUP BY DATE(date)",
		carId,
		year
	);
};

export const removeFuelInfo = (id: number, showToast: Function) => {
	return db
		.runAsync("DELETE FROM FUEL_LOGS WHERE id = ?", id)
		.then((_) => showSuccessMessage(showToast))
		.catch((err) => showErrorMessage(showToast, err));
};
