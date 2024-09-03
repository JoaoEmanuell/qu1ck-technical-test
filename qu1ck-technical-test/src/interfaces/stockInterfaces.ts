import { StocksUnits } from "@prisma/client";

export interface stockObject {
  id?: number;
  ingredient_name: string;
  quantity: number;
  unit_of_measurement: StocksUnits;
}

export type stockReturnDefault = {
  message: string;
  error: boolean;
};

export interface StockServiceInterface {
  createStock(json: stockObject): Promise<stockReturnDefault>;
  getAllStock(): Promise<stockObject[]>;
  editStockItem(id: number, json: stockObject): Promise<stockReturnDefault>;
  deleteStockItem(id: number): Promise<stockReturnDefault>;
}
