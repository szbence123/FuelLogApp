import { FuelInfoModel } from "../typedefs/cars";
import { executeQuery } from "./QueryBuilder";
import { db } from "./db";

export const insertFuelInfo = (
  date: string,
  km: number,
  all_km: number,
  price: number,
  location: string,
  amount: number,
  car_id: number,
  fuel_type_id: number
) => {
  return executeQuery(
    db,
    "INSERT INTO FUEL_LOGS(date, km, all_km, price, location, amount, car_id, fuel_type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [date, km, all_km, price, location, amount, car_id, fuel_type_id]
  );
};

export const getAllFuelInfo = (
  carId: number,
  selectedYear: string,
  start?: string,
  end?: string
): Promise<FuelInfoModel[]> => {
  if (start && end) {
    console.log(start, end);
    return executeQuery(
      db,
      "SELECT * FROM FUEL_LOGS fl INNER JOIN FUEL_TYPES ft on fl.fuel_type_id = ft.id  WHERE car_id = ? AND date BETWEEN  ?  AND  ?",
      [carId, start, end]
    );
  }
  if (selectedYear == "összes") {
    return executeQuery(db, "SELECT * FROM FUEL_LOGS WHERE car_id = ?", [
      carId
    ]);
  } else {
    return executeQuery(
      db,
      "SELECT * FROM FUEL_LOGS WHERE car_id = ? AND date LIKE '%' || ? || '%'",
      [carId, selectedYear]
    );
  }
};

export const getAllFuelPricesForChart = (
  carId: number,
  year: string,
  start: string,
  end: string
): Promise<FuelInfoModel[]> => {
  if (start && end) {
    console.log(start, end);
    return executeQuery(
      db,
      "SELECT SUM(price) as price, DATE(date) as date FROM FUEL_LOGS WHERE car_id = ? AND date BETWEEN  ?  AND  ? GROUP BY DATE(date)",
      [carId, start, end]
    );
  }
  return executeQuery(
    db,
    "SELECT SUM(price) as price, DATE(date) as date FROM FUEL_LOGS WHERE car_id = ? AND strftime('%Y', date) = ? GROUP BY DATE(date)",
    [carId, year]
  );
};

export const removeFuelInfo = (id: number, refetch: Function) => {
  return executeQuery(db, "DELETE FROM FUEL_LOGS WHERE id = ?", [id]).then(
    (r) => refetch()
  );
};
