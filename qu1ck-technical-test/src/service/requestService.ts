import { prisma } from "@/config/prisma";
import { Requests } from "@prisma/client";
import {
  requestObject,
  RequestServiceInterface,
} from "@/interfaces/requestInterface";
import { encryption } from "@/security/encryption";
import { RequestStatus } from "@prisma/client";
import { internalServerErrorResponse } from "@/utils/http/internalServerErrorResponse";
import { putResponse } from "@/utils/http/putResponse";
import { badRequest } from "@/utils/http/badRequest";
import { createResponse } from "@/utils/http/createResponse";
import { deleteResponse } from "@/utils/http/deleteResponse";

export class RequestService implements RequestServiceInterface {
  async createRequest(json: requestObject): Promise<Response> {
    try {
      json.request_itens = JSON.stringify(json.request_itens);
      json = await this.encryptRequestItens(json);
      return createResponse(
        await prisma.requests.create({
          data: json as Requests,
        })
      );
    } catch (err) {
      console.error(`request service create: ${err}`);
      return internalServerErrorResponse("Error to create request");
    }
  }
  async getRequest(id: number): Promise<Response> {
    try {
      const data = await prisma.requests.findUnique({
        where: { id: id },
      });
      if (!data) {
        return badRequest({ message: "request don't exist" });
      }
      data.request_itens = JSON.parse(
        await encryption.decipherText(data.request_itens)
      );
      return Response.json(data);
    } catch (err) {
      console.error(`request service get: ${err}`);
      return internalServerErrorResponse("Error to find request");
    }
  }
  async updateRequest(id: number, json: requestObject): Promise<Response> {
    try {
      json.request_itens = JSON.stringify(json.request_itens);
      json = await this.encryptRequestItens(json);
      return putResponse(
        await prisma.requests.update({
          where: {
            id: id,
          },
          data: json,
        })
      );
    } catch (err) {
      console.error(`request service update: ${err}`);
      return internalServerErrorResponse("Error to update request");
    }
  }
  async updateRequestStatus(
    id: number,
    status: RequestStatus
  ): Promise<Response> {
    try {
      return putResponse(
        await prisma.requests.update({
          where: {
            id: id,
          },
          data: {
            status: status,
          },
        })
      );
    } catch (err) {
      console.error(`request service update status: ${err}`);
      return internalServerErrorResponse("Error to update request status");
    }
  }
  async deleteRequest(id: number): Promise<Response> {
    try {
      await prisma.requests.delete({
        where: {
          id: id,
        },
      });
      return deleteResponse({
        message: "Request deleted with success",
      });
    } catch (err) {
      console.error(`request service update status: ${err}`);
      return internalServerErrorResponse("Error to delete request");
    }
  }

  private async encryptRequestItens(json: requestObject) {
    json.request_itens = await encryption.encryptText(
      json.request_itens as string
    );
    return json;
  }
}

export const requestService = new RequestService();
