import { RequestStatus } from "@prisma/client";
import { stockReturnDefault } from "./stockInterfaces";

export interface requestObject {
  id?: number;
  request_itens: string | object;
  date: Date;
  status: RequestStatus;
}

export interface requestObjectUpdate extends requestObject {
  request_itens: string | object | undefined;
  date: Date | undefined;
}

export type requestReturnDefault = stockReturnDefault;

export interface RequestServiceInterface {
  createRequest(json: requestObject): Promise<Response>;
  getRequest(id: number): Promise<Response>;
  updateRequest(id: number, json: requestObject): Promise<Response>;
  updateRequestStatus(id: number, status: RequestStatus): Promise<Response>;
  deleteRequest(id: number): Promise<Response>;
}
