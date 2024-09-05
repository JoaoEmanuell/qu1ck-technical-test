import { Requests, RequestStatus } from "@prisma/client";
import { stockReturnDefault } from "./stockInterfaces";

export interface requestObject {
  id?: number;
  request_itens: string;
  date: Date;
  status: RequestStatus;
}

export interface requestObjectUpdate extends requestObject {
  request_itens: string | undefined;
  date: Date | undefined;
}

export type requestReturnDefault = stockReturnDefault;

export interface RequestServiceInterface {
  createRequest(json: requestObject): Promise<Requests>;
  getAllRequests(): Promise<Requests[]>;
  getRequest(id: number): Promise<Requests>;
  updateRequest(id: number, json: requestObject): Promise<Requests>;
  updateRequestStatus(id: number, status: RequestStatus): Promise<Requests>;
  deleteRequest(id: number): Promise<Object>;
}
