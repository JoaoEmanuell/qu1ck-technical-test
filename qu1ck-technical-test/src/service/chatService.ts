import {
  ChatObjectInterface,
  ChatServiceInterface,
} from "@/interfaces/chatInterfaces";
import { stockService } from "./stockService";
import { dify } from "@/dify/dify";
import { difyJson } from "@/interfaces/difyInterfaces";
import { requestService } from "./requestService";
import { requestObject } from "@/interfaces/requestInterface";

export class ChatService implements ChatServiceInterface {
  async createRequest(json: ChatObjectInterface): Promise<Object> {
    const stock = await stockService.getAllStock();
    const message = json.text;
    const difyResponse = await dify.requestServiceToChatBot(stock, message);
    const difyMessage = difyResponse.answer;

    let difyJson: difyJson;

    try {
      difyJson = JSON.parse(
        difyMessage.replaceAll("```json\n", "").replaceAll("\n```", "")
      );
    } catch (err) {
      return { message: "Error to parse json response" };
    }

    if (!difyJson.status) {
      // case the order cannot be assembled
      console.warn(`message: ${message} | dev: ${difyJson.dev}`);
      const toReturn = {
        status: false,
        message_for_client:
          "Não foi possível realizar o seu pedido, nós sentimos muito por isso!",
      };
      if (difyJson.hasOwnProperty("message_for_client"))
        toReturn["message_for_client"] = difyJson.message_for_client;
      return toReturn;
    }

    // register the request

    const request = {
      request_itens: difyJson.items.join(";"),
      date: new Date(),
    };

    await requestService.createRequest(request as requestObject); // create request

    await stockService.editStockItens(difyJson.database); // update stock in db

    return { status: true, message_for_client: difyJson.message_for_client };
  }
}

export const chatService = new ChatService();
