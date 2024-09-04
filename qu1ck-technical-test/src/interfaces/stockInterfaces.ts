import { Stocks, StocksUnits } from "@prisma/client";

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
  createStock(json: stockObject): Promise<Stocks>;
  getAllStock(): Promise<Stocks[]>;
  editStockItem(id: number, json: stockObject): Promise<Stocks>;
  editStockItens(json: Stocks[]): Promise<Object>;
  deleteStockItem(id: number): Promise<Object>;
}
