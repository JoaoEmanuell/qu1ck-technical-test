import { requestReturnDefault } from "@/interfaces/requestInterface";
import { requestService } from "@/service/requestService";
import { badRequest } from "@/utils/http/badRequest";
import { RequestStatus } from "@prisma/client";
import { isEnum } from "class-validator";

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = Number(
    url.pathname.split("/")[url.pathname.split("/").length - 2]
  );
  const status = url.pathname.split("/").pop().trim().toLowerCase();

  if (!id) {
    return badRequest({ message: "INVALID_DATA", details: "Invalid ID" });
  }

  if (!status || !isEnum(status, RequestStatus)) {
    return badRequest({ message: "INVALID_DATA", details: "Invalid status" });
  }

  const serviceResponse = await requestService.updateRequestStatus(
    id,
    status as RequestStatus
  );
  return serviceResponse;
}
