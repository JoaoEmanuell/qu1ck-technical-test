import { CreateChatDto } from "@/dtos/chatDtos";
import { ChatService } from "@/service/chatService";
import { errorReport } from "@/utils/errorReport";
import { badRequest } from "@/utils/http/badRequest";
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
  const service = new ChatService();
  const toReturn = await service.createRequest(json);
  return Response.json(toReturn);
}
