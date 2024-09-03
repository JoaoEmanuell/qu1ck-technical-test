import { RequestStatus } from "@prisma/client";
import { stockReturnDefault } from "./stockInterfaces";

export interface requestObject {
  id?: number;
  request_itens: string;
  date: Date;
  status: RequestStatus;
}

export type requestReturnDefault = stockReturnDefault;

export interface RequestServiceInterface {
  createRequest(
    json: requestObject
  ): Promise<requestObject | stockReturnDefault>;
  getRequest(id: number): Promise<requestObject | stockReturnDefault>;
  updateRequest(
    id: number,
    json: requestObject
  ): Promise<requestObject | stockReturnDefault>;
  updateRequestStatus(
    id: number,
    status: RequestStatus
  ): Promise<requestObject | stockReturnDefault>;
  deleteRequest(id: number): Promise<stockReturnDefault>;
}
