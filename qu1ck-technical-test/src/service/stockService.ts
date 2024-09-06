import { prisma } from "@/config/prisma";
import {
  stockObject,
  StockServiceInterface,
} from "@/interfaces/stockInterfaces";
import { encryption } from "@/security/encryption";
import { internalServerErrorResponse } from "@/utils/http/internalServerErrorResponse";
import { notFound } from "@/utils/http/notFound";
import { Stocks, StocksUnits } from "@prisma/client";
import { managerNotificationsService } from "./managerNotificationService";

export class StockService implements StockServiceInterface {
  async createStock(json: stockObject): Promise<Stocks> {
    try {
      return await prisma.stocks.create({
        data: {
          ingredient_name: await encryption.encryptText(
            json.ingredient_name.toLowerCase()
          ),
          quantity: json.quantity,
          unit_of_measurement: json.unit_of_measurement,
        },
      });
    } catch (err) {
      console.error(`Error to add item to stock: ${err}`);
      throw internalServerErrorResponse("Error to add item to stock");
    }
  }

  private async getStockOrNotFound(id: number) {
    const stock = await prisma.stocks.findUnique({
      where: {
        id: id,
      },
    });
    if (!stock) {
      throw notFound({ message: "stock not found" });
    }
  }

  async getAllStock(): Promise<Stocks[]> {
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
    return decryptedStock;
  }

  async editStockItem(id: number, json: stockObject): Promise<Stocks> {
    await this.getStockOrNotFound(id);

    if (json.ingredient_name) {
      json.ingredient_name = await encryption.encryptText(
        json.ingredient_name.toLowerCase()
      );
    }

    return await prisma.stocks.update({
      where: {
        id: id,
      },
      data: json,
    });
  }

  async editStockItens(json: Stocks[]): Promise<Object> {
    await Promise.all(
      json.map(async (stock) => {
        await this.editStockItem(stock.id, stock);
      })
    );

    return { message: "Itens edited with success" };
  }

  async deleteStockItem(id: number): Promise<Object> {
    await this.getStockOrNotFound(id);

    await prisma.stocks.delete({
      where: {
        id: id,
      },
    });

    return { message: "Item deleted with success" };
  }

  async verifyStockItens(stock: Stocks[] = null) {
    const verifyStockQuantity = (
      quantity: number,
      unit_of_measurement: StocksUnits
    ) => {
      if (quantity < 5 && unit_of_measurement === "unit") {
        return true;
      } else if (
        (quantity < 1000 && unit_of_measurement === "gram") ||
        (quantity < 1000 && unit_of_measurement === "milliliter")
      ) {
        return true;
      }
      return false;
    };
    const stocks = stock || (await this.getAllStock());
    await Promise.all(
      stocks.map(async (stock) => {
        if (verifyStockQuantity(stock.quantity, stock.unit_of_measurement)) {
          await managerNotificationsService.createNotification({
            message: `Alerta, o estoque de ${stock.ingredient_name} está acabando`,
          });
        }
      })
    );
  }
}

export const stockService = new StockService();
