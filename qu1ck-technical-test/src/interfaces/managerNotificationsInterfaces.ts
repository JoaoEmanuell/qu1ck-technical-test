import { CreateManagerNotificationDto } from "@/dtos/notificationsDto";
import { ManagerNotifications } from "@prisma/client";

export interface ManagerNotificationServiceInterface {
  /**
   * create the notification
   * @param json json with notification
   * @return promise with created notification
   */
  createNotification(
    json: CreateManagerNotificationDto
  ): Promise<ManagerNotifications>;
  /**
   * get all notifications
   * @returns promise with array containing the notifications
   */
  getAllNotifications(): Promise<ManagerNotifications[]>;
  /**
   * delete notification using id
   * @param id
   */
  deleteNotification(id: number): Promise<Object>;
  /**
   * delete all notifications
   * @param notifications notifications for delete
   */
  deleteAllNotificationsUsingObject(
    notifications: ManagerNotifications[]
  ): Promise<Object>;
}
