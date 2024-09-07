/**
 * Notifications controller
 * Delete the notification using id
 */

import { managerNotificationsService } from "@/service/managerNotificationService";
import { badRequest } from "@/utils/http/badRequest";
import { deleteResponse } from "@/utils/http/deleteResponse";
import { responseManager } from "@/utils/http/responseManager";

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = Number(url.pathname.split("/").pop());

  if (!id) {
    return badRequest({ message: "INVALID_DATA", details: "Invalid ID" });
  }

  try {
    return deleteResponse(
      await managerNotificationsService.deleteNotification(Number(id))
    );
  } catch (err) {
    return responseManager(err);
  }
}
