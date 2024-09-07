/**
 * Notification controller
 * Get notifications
 * Create notification
 * Delete all notifications
 */

import {
  CreateManagerNotificationDto,
  DeleteManagerNotificationsDto,
} from "@/dtos/notificationsDto";
import { managerNotificationsService } from "@/service/managerNotificationService";
import { errorReport } from "@/utils/errorReport";
import { badRequest } from "@/utils/http/badRequest";
import { createResponse } from "@/utils/http/createResponse";
import { deleteResponse } from "@/utils/http/deleteResponse";
import { responseManager } from "@/utils/http/responseManager";
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
    return responseManager(err);
  }
}

export async function PUT(request: Request) {
  let json;
  try {
    json = await request.json();
  } catch (err) {
    return badRequest(errorReport("INVALID_DATA", "invalid json"));
  }
  const dtoInstance = Object.assign(new DeleteManagerNotificationsDto(), json);
  const erros = await validateDto(dtoInstance);
  if (erros) {
    return badRequest(erros);
  }
  try {
    return deleteResponse(
      await managerNotificationsService.deleteAllNotificationsUsingObject(
        json.notifications
      )
    );
  } catch (err) {
    return responseManager(err);
  }
}
