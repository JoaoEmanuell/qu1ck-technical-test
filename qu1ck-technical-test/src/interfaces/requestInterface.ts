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
  /**
   * create a request in database
   * @param json json with request
   * @returns promise with created request
   */
  createRequest(json: requestObject): Promise<Requests>;
  /**
   * get all requests
   * @returns promise with array containing the requests
   */
  getAllRequests(): Promise<Requests[]>;
  /**
   * get the request using id
   * @param id
   * @returns promise with request
   */
  getRequest(id: number): Promise<Requests>;
  /**
   * update the request using id
   * @param id
   * @param json with request object
   * @returns promise with updated request
   */
  updateRequest(id: number, json: requestObject): Promise<Requests>;
  /**
   * update the request status
   * @param id for the request
   * @param status "received" | "in_progress" | "completed" | "cancelled"
   * @returns promise with request edited
   */
  updateRequestStatus(id: number, status: RequestStatus): Promise<Requests>;
  /**
   * delete the request using id
   * @param id
   */
  deleteRequest(id: number): Promise<Object>;
}
