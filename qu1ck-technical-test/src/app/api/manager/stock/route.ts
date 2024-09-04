import { CreateStockDto, EditStockItens } from "@/dtos/stockDtos";
import { stockService } from "@/service/stockService";
import { errorReport } from "@/utils/errorReport";
import { badRequest } from "@/utils/http/badRequest";
import { validateDto } from "@/utils/validators/validationDto";
import { Stocks } from "@prisma/client";

export async function GET(request: Request) {
  return stockService.getAllStock();
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
  return await stockService.createStock(json);
}

export async function PUT(request: Request) {
  let json;
  try {
    json = await request.json();
    if (!json.hasOwnProperty("data")) throw "invalid json";
  } catch (err) {
    return badRequest(errorReport("INVALID_DATA", "invalid json"));
  }
  // validate the data
  const data = json["data"] as EditStockItens["data"];
  for (const stock of data) {
    const dtoInstance = Object.assign(new CreateStockDto(), stock);
    const erros = await validateDto(dtoInstance);
    if (erros) {
      return badRequest(erros);
    }
  }
  return await stockService.editStockItens(data as Stocks[]);
}
