import { validate } from "class-validator";
import { errorReport } from "../errorReport";

/**
 * validate the dto
 * @param dto dto used to model the body request
 * @returns errorReport with INVALID_DATA and error description (if has a error) or null if validation is successes
 */
export async function validateDto(dto: any) {
  const errors = await validate(dto);
  if (errors.length > 0) {
    // stop in the first error
    const constraints = errors[0].constraints as {
      [type: string]: string;
    };
    const firstConstraint = constraints[Object.keys(constraints)[0]];
    return errorReport("INVALID_DATA", firstConstraint);
  }
  return null;
}
