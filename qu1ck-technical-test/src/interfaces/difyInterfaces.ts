import { Stocks } from "@prisma/client";

export type difyReturn = {
  answer: string;
};

export type difyJson = {
  status: boolean;
  message_for_client?: string;
  database?: Stocks[];
  dev?: string;
};

export interface DifyInterface {
  requestServiceToChatBot(
    stock: Stocks[],
    message: string
  ): Promise<difyReturn>;
}
