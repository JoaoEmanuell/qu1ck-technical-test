export interface ChatServiceInterface {
  createRequest(json: ChatObjectInterface): Promise<Object>;
}

export interface ChatObjectInterface {
  text: string;
}

export interface ChatRequestReturn {
  message: string;
}
