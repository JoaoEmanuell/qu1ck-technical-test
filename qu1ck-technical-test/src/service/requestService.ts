import { prisma } from "@/config/prisma";
import { Requests } from "@prisma/client";
import {
  requestObject,
  RequestServiceInterface,
} from "@/interfaces/requestInterface";
import { encryption } from "@/security/encryption";
import { RequestStatus } from "@prisma/client";
import { internalServerErrorResponse } from "@/utils/http/internalServerErrorResponse";
import { notFound } from "@/utils/http/notFound";
import { stockService } from "./stockService";

export class RequestService implements RequestServiceInterface {
  async createRequest(json: requestObject): Promise<Requests> {
    try {
      json.request_itens = JSON.stringify(json.request_itens);
      json = await this.encryptRequestItens(json);
      await stockService.verifyStockItens();
      return await prisma.requests.create({ data: json as Requests });
    } catch (err) {
      throw internalServerErrorResponse("Error to create request");
    }
  }

  async getAllRequests(): Promise<Requests[]> {
    const requests = await prisma.requests.findMany({
      orderBy: {
        id: "asc",
      },
    });
    const decrypted = [] as Requests[];
    await Promise.all(
      requests.map(async (request) => {
        request.request_itens = await encryption.decipherText(
          request.request_itens
        );
        decrypted.push(request);
      })
    );
    return decrypted;
  }

  async getRequest(id: number): Promise<Requests> {
    const data = await prisma.requests.findUnique({
      where: { id: id },
    });
    if (!data) {
      throw notFound({ message: "request don't exist" });
    }
    data.request_itens = await encryption.decipherText(data.request_itens);
    return data;
  }
  async updateRequest(id: number, json: requestObject): Promise<Requests> {
    await this.getRequest(id); // get the request or error
    json.request_itens = JSON.stringify(json.request_itens);
    json = await this.encryptRequestItens(json);
    return await prisma.requests.update({
      where: {
        id: id,
      },
      data: json,
    });
  }
  async updateRequestStatus(
    id: number,
    status: RequestStatus
  ): Promise<Requests> {
    await this.getRequest(id); // get the request or error
    return await prisma.requests.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
  }
  async deleteRequest(id: number): Promise<Object> {
    await this.getRequest(id); // get the request or error
    await prisma.requests.delete({
      where: {
        id: id,
      },
    });
    return {
      message: "Request deleted with success",
    };
  }

  private async encryptRequestItens(json: requestObject) {
    json.request_itens = await encryption.encryptText(
      json.request_itens as string
    );
    return json;
  }
}

export const requestService = new RequestService();
