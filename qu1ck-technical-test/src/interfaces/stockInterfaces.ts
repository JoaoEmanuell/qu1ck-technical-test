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
  createStock(json: stockObject): Promise<Response>;
  getAllStock(): Promise<Response>;
  editStockItem(id: number, json: stockObject): Promise<Response>;
  editStockItens(json: Stocks[]): Promise<Response>;
  deleteStockItem(id: number): Promise<Response>;
}
