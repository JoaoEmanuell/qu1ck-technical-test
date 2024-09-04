import { CreateManagerNotificationDto } from "@/dtos/notificationsDto";
import { managerNotificationsService } from "@/service/managerNotificationService";
import { errorReport } from "@/utils/errorReport";
import { badRequest } from "@/utils/http/badRequest";
import { createResponse } from "@/utils/http/createResponse";
import { validateDto } from "@/utils/validators/validationDto";

export async function GET(request: Request) {
  return Response.json(await managerNotificationsService.getAllNotifications());
}

export async function POST(request: Request) {
  let json;
  try {
    json = await request.json();
  } catch (err) {
    return badRequest(errorReport("INVALID_DATA", "invalid json"));
  }
  const dtoInstance = Object.assign(new CreateManagerNotificationDto(), json);
  const erros = await validateDto(dtoInstance);
  if (erros) {
    return badRequest(erros);
  }
  try {
    return createResponse(
      await managerNotificationsService.createNotification(json)
    );
  } catch (err) {
    return err;
  }
}
