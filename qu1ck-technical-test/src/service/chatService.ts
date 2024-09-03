import { prisma } from "@/config/prisma";
import {
  ChatObjectInterface,
  ChatRequestReturn,
  ChatServiceInterface,
} from "@/interfaces/chatInterfaces";
import { stockObject } from "@/interfaces/stockInterfaces";
import { stockService } from "./stockService";

export class ChatService implements ChatServiceInterface {
  async createRequest(json: ChatObjectInterface): Promise<stockObject[]> {
    const stock = await stockService.getAllStock();
    return stock;
  }
}

const chatService = new ChatService();
