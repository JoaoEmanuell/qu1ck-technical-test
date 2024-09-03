import { CreateStockDto } from "@/dtos/stockDtos";
import { stockService } from "@/service/stockService";
import { errorReport } from "@/utils/errorReport";
import { badRequest } from "@/utils/http/badRequest";
import { deleteResponse } from "@/utils/http/deleteResponse";
import { internalServerErrorResponse } from "@/utils/http/internalServerErrorResponse";
import { putResponse } from "@/utils/http/putResponse";
import { validateDto } from "@/utils/validators/validationDto";

export async function PUT(request: Request) {
  let json;
  try {
    json = await request.json();
  } catch (err) {
    return badRequest(errorReport("INVALID_DATA", "invalid json"));
  }

  const url = new URL(request.url);
  const id = Number(url.pathname.split("/").pop());

  if (!id) {
    return badRequest({ message: "INVALID_DATA", details: "Invalid ID" });
  }

  const dtoInstance = Object.assign(new CreateStockDto(), json);
  const erros = await validateDto(dtoInstance);
  if (erros) {
    return badRequest(erros);
  }

  const serviceResponse = await stockService.editStockItem(Number(id), json);
  if (serviceResponse.error) {
    return badRequest(serviceResponse.message);
  }
  return putResponse(serviceResponse);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = Number(url.pathname.split("/").pop());

  if (!id) {
    return badRequest({ message: "INVALID_DATA", details: "Invalid ID" });
  }

  const serviceResponse = await stockService.deleteStockItem(Number(id));
  if (serviceResponse.error) {
    return internalServerErrorResponse(serviceResponse.message);
  }
  return deleteResponse(serviceResponse);
}
