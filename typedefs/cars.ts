export type CarModel = {
  id: number;
  name: string;
  regNumber: string;
  color: string;
  fuel_type_name: string;
  fuel_type_id: string;
};

export type FuelInfoModel = {
  id: number;
  date: string;
  km: number;
  all_km: number;
  price: number;
  location: string;
  amount: number;
  car_id: number;
  name: string;
  color: string;
};

export type CostTypeModel = {
  id: number;
  name: string;
};

export type CostModel = {
  id: number;
  cost_type_id: number;
  car_id: number;
  price: number;
};
