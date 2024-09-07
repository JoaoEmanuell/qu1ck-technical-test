/**
 * Chat controller
 */

import { CreateChatDto } from "@/dtos/chatDtos";
import { chatService } from "@/service/chatService";
import { errorReport } from "@/utils/errorReport";
import { badRequest } from "@/utils/http/badRequest";
import { createResponse } from "@/utils/http/createResponse";
import { responseManager } from "@/utils/http/responseManager";
import { validateDto } from "@/utils/validators/validationDto";

export async function POST(request: Request) {
  let json;
  try {
    json = await request.json();
  } catch (err) {
    return badRequest(errorReport("INVALID_DATA", "invalid json"));
  }
  const dtoInstance = Object.assign(new CreateChatDto(), json);
  const erros = await validateDto(dtoInstance);
  if (erros) {
    return badRequest(erros);
  }

  try {
    return createResponse(await chatService.createRequest(json));
  } catch (err) {
    return responseManager(err);
  }
}
