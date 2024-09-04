import { DifyInterface, difyReturn } from "@/interfaces/difyInterfaces";
import { Stocks } from "@prisma/client";

export class Dify implements DifyInterface {
  private apiKey;
  private host;

  constructor() {
    this.apiKey = process.env["DIFY_API_KEY"];
    this.host = process.env["DIFY_API_HOST"];
  }

  async requestServiceToChatBot(
    stock: Stocks[],
    message: string
  ): Promise<difyReturn> {
    const stockJson = JSON.stringify(stock);
    const body = {
      inputs: {
        stock: stockJson,
      }, // por alguma razão desconhecida o input não é passado de forma correta para a api, tendo que ser passado dentro da query.
      response_mode: "blocking",
      user: "common-user",
      // query: `stock: ${stockJson}\nmessage: ${message}`,
      query: message,
    };
    const response = await fetch(this.host, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  }
}

export const dify = new Dify();
