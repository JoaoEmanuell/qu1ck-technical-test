import { stockObject } from "./stockInterfaces";

export interface ChatServiceInterface {
  createRequest(json: ChatObjectInterface): Promise<stockObject[]>;
}

export interface ChatObjectInterface {
  text: string;
}

export interface ChatRequestReturn {
  message: string;
}
