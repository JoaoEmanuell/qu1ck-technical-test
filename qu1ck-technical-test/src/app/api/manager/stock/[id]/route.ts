import { EditStockDto } from "@/dtos/stockDtos";
import { stockService } from "@/service/stockService";
import { errorReport } from "@/utils/errorReport";
import { badRequest } from "@/utils/http/badRequest";
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

  const dtoInstance = Object.assign(new EditStockDto(), json);
  const erros = await validateDto(dtoInstance);
  if (erros) {
    return badRequest(erros);
  }

  return await stockService.editStockItem(Number(id), json);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = Number(url.pathname.split("/").pop());

  if (!id) {
    return badRequest({ message: "INVALID_DATA", details: "Invalid ID" });
  }

  return await stockService.deleteStockItem(Number(id));
}
