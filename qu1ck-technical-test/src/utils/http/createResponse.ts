import { putResponse } from "./putResponse";

/**
 * create response with 201 status code
 * @param json for send to user
 * @returns response
 */
export const createResponse = (json: any) => {
  return putResponse(json);
};
