import { prisma } from "@/config/prisma";
import {
  requestObject,
  RequestServiceInterface,
} from "@/interfaces/requestInterface";
import { stockReturnDefault } from "@/interfaces/stockInterfaces";
import { RequestStatus } from "@prisma/client";

export class RequestService implements RequestServiceInterface {
  async createRequest(
    json: requestObject
  ): Promise<requestObject | stockReturnDefault> {
    throw new Error("Method not implemented.");
  }
  async getRequest(id: number): Promise<requestObject | stockReturnDefault> {
    try {
      return await prisma.requests.findUniqueOrThrow({
        where: { id: id },
      });
    } catch (err) {
      console.error(`request service get: ${err}`);
      return { message: "Error to find request", error: true };
    }
  }
  async updateRequest(
    id: number,
    json: requestObject
  ): Promise<requestObject | stockReturnDefault> {
    throw new Error("Method not implemented.");
  }
  async updateRequestStatus(
    id: number,
    status: RequestStatus
  ): Promise<requestObject | stockReturnDefault> {
    throw new Error("Method not implemented.");
  }
  async deleteRequest(id: number): Promise<stockReturnDefault> {
    throw new Error("Method not implemented.");
  }
}

export const requestService = new RequestService();
