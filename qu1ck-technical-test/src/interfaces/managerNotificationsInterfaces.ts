import { CreateManagerNotificationDto } from "@/dtos/notificationsDto";
import { ManagerNotifications } from "@prisma/client";

export interface ManagerNotificationServiceInterface {
  createNotification(
    json: CreateManagerNotificationDto
  ): Promise<ManagerNotifications>;
  getAllNotifications(): Promise<ManagerNotifications[]>;
  deleteNotification(id: number): Promise<Object>;
  deleteAllNotificationsUsingObject(
    notifications: ManagerNotifications[]
  ): Promise<Object>;
}
