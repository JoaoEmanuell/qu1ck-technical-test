import { CreateStockDto } from "@/dtos/stockDtos";
import { stockService } from "@/service/stockService";
import { errorReport } from "@/utils/errorReport";
import { badRequest } from "@/utils/http/badRequest";
import { createResponse } from "@/utils/http/createResponse";
import { internalServerErrorResponse } from "@/utils/http/internalServerErrorResponse";
import { validateDto } from "@/utils/validators/validationDto";

export async function GET(request: Request) {
  const serviceResponse = await stockService.getAllStock();
  return Response.json(serviceResponse);
}

export async function POST(request: Request) {
  let json;
  try {
    json = await request.json();
  } catch (err) {
    return badRequest(errorReport("INVALID_DATA", "invalid json"));
  }
  const dtoInstance = Object.assign(new CreateStockDto(), json);
  const erros = await validateDto(dtoInstance);
  if (erros) {
    return badRequest(erros);
  }
  const serviceResponse = await stockService.createStock(json);
  if (serviceResponse.error) {
    return internalServerErrorResponse(serviceResponse.message);
  }
  return createResponse(serviceResponse);
}
