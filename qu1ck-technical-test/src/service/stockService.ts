import { prisma } from "@/config/prisma";
import {
  stockObject,
  StockServiceInterface,
} from "@/interfaces/stockInterfaces";
import { encryption } from "@/security/encryption";
import { createResponse } from "@/utils/http/createResponse";
import { deleteResponse } from "@/utils/http/deleteResponse";
import { internalServerErrorResponse } from "@/utils/http/internalServerErrorResponse";
import { putResponse } from "@/utils/http/putResponse";
import { Stocks } from "@prisma/client";

export class StockService implements StockServiceInterface {
  async createStock(json: stockObject): Promise<Response> {
    try {
      await prisma.stocks.create({
        data: {
          ingredient_name: await encryption.encryptText(json.ingredient_name),
          quantity: json.quantity,
          unit_of_measurement: json.unit_of_measurement,
        },
      });
      return createResponse({
        message: "Item added to stock with success",
      });
    } catch (err) {
      console.error(`Error to add item to stock: ${err}`);
      return internalServerErrorResponse("Error to add item to stock");
    }
  }

  async getAllStock(): Promise<Response> {
    const stocks = await prisma.stocks.findMany({
      orderBy: {
        id: "asc",
      },
    });
    // decrypt stocks
    const decryptedStock = [] as Stocks[];
    await Promise.all(
      stocks.map(async (stock) => {
        stock.ingredient_name = await encryption.decipherText(
          stock.ingredient_name
        );
        decryptedStock.push(stock);
      })
    );
    return Response.json(decryptedStock);
  }

  async editStockItem(id: number, json: stockObject): Promise<Response> {
    try {
      if (json.ingredient_name) {
        json.ingredient_name = await encryption.encryptText(
          json.ingredient_name
        );
      }
      await prisma.stocks.update({
        where: {
          id: id,
        },
        data: json,
      });
      return putResponse({ message: "Item edited with success" });
    } catch (err) {
      console.error(`Error to edit stock item: ${err}`);
      return internalServerErrorResponse("Error to edit stock item");
    }
  }

  async editStockItens(json: Stocks[]): Promise<Response> {
    try {
      await Promise.all(
        json.map(async (stock) => {
          await this.editStockItem(stock.id, stock);
        })
      );
      return putResponse({ message: "Itens edited with success" });
    } catch (err) {
      console.error(`Error to edit stock itens: ${err}`);
      return internalServerErrorResponse("Error to edit stock itens");
    }
  }

  async deleteStockItem(id: number): Promise<Response> {
    try {
      await prisma.stocks.delete({
        where: {
          id: id,
        },
      });
      return deleteResponse({ message: "Item deleted with success" });
    } catch (err) {
      console.error(`Error to delete stock item: ${err}`);
      return internalServerErrorResponse("Error to delete stock item");
    }
  }
}

export const stockService = new StockService();
