/**
 * Interfaces for chat
 */

export interface ChatServiceInterface {
  /**
   * Create a request.
   * @param json `{ text: string }` | text sended by user
   */
  createRequest(json: ChatObjectInterface): Promise<Object>;
}

export interface ChatObjectInterface {
  text: string;
}

export interface ChatRequestReturn {
  message: string;
}
