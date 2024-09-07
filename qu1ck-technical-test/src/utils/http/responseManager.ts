import { internalServerErrorResponse } from "./internalServerErrorResponse";

/**
 * translate a error to response
 * @param err
 * @returns Response
 */
export const responseManager = (err: unknown) => {
  if (err instanceof Response) {
    return err;
  }
  try {
    return internalServerErrorResponse(err.toString());
  } catch (err) {
    return internalServerErrorResponse("Error");
  }
};
