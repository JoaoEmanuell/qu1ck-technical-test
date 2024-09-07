/**
 * Dto for notifications
 */

import { ManagerNotifications } from "@prisma/client";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateManagerNotificationDto {
  @IsString()
  @IsNotEmpty()
  message: string;
}

export class DeleteManagerNotificationsDto {
  @IsArray()
  @IsNotEmpty()
  notifications: ManagerNotifications[];
}
