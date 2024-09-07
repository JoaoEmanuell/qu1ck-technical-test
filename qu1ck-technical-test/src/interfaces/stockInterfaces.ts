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
  /**
   * create a new stock item
   * @param json stock object
   * @returns promise with create stock
   */
  createStock(json: stockObject): Promise<Stocks>;
  /**
   * get all stock itens
   * @returns promise with stocks array
   */
  getAllStock(): Promise<Stocks[]>;
  /**
   * edit one stock item using id
   * @param id
   * @param json stock for edit
   * @returns promise with edited stock
   */
  editStockItem(id: number, json: stockObject): Promise<Stocks>;
  /**
   * edit many stock itens
   * @param json with array of stocks for edit
   * @returns object with message
   */
  editStockItens(json: Stocks[]): Promise<Object>;
  /**
   * delete stock item using id
   * @param id
   * @returns promise with message
   */
  deleteStockItem(id: number): Promise<Object>;
  /**
   * verify stock itens and send notification if stock it's ending
   * @param stock stocks array, optional
   * @returns promise with void
   */
  verifyStockItens(stock: Stocks[]): Promise<void>;
}
