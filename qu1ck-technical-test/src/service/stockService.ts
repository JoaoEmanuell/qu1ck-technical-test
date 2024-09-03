import { prisma } from "@/config/prisma";
import {
  stockObject,
  stockReturnDefault,
  StockServiceInterface,
} from "@/interfaces/stockInterfaces";
import { encryption } from "@/security/encryption";

export class StockService implements StockServiceInterface {
  async createStock(json: stockObject): Promise<stockReturnDefault> {
    try {
      await prisma.stocks.create({
        data: {
          ingredient_name: await encryption.encryptText(json.ingredient_name),
          quantity: json.quantity,
          unit_of_measurement: json.unit_of_measurement,
        },
      });
    } catch (err) {
      console.error(`Error to add item to stock: ${err}`);
      return {
        message: "Error to add item to stock",
        error: true,
      };
    }
    return {
      message: "Item added to stock with success",
      error: false,
    };
  }
  async getAllStock(): Promise<stockObject[]> {
    const stocks = await prisma.stocks.findMany();
    let count = 0;
    // decrypt stocks
    await Promise.all(
      stocks.map(async (stock) => {
        stocks[count].ingredient_name = await encryption.decipherText(
          stock.ingredient_name
        );
        count++;
      })
    );
    return stocks;
  }
  async editStockItem(
    id: number,
    json: stockObject
  ): Promise<stockReturnDefault> {
    try {
      const data = json;
      data.ingredient_name = await encryption.encryptText(json.ingredient_name);
      await prisma.stocks.update({
        where: {
          id: id,
        },
        data: data,
      });
    } catch (err) {
      console.error(`Error to edit stock item: ${err}`);
      return { message: "Error to edit stock item", error: true };
    }
    return { message: "Item edited with success", error: false };
  }
  async deleteStockItem(id: number): Promise<stockReturnDefault> {
    try {
      await prisma.stocks.delete({
        where: {
          id: id,
        },
      });
    } catch (err) {
      console.error(`Error to delete stock item: ${err}`);
      return { message: "Error to delete stock item", error: true };
    }
    return { message: "Item deleted with success", error: false };
  }
}

export const stockService = new StockService();
