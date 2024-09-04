import { prisma } from "@/config/prisma";
import { CreateManagerNotificationDto } from "@/dtos/notificationsDto";
import { ManagerNotificationServiceInterface } from "@/interfaces/managerNotificationsInterfaces";
import { encryption } from "@/security/encryption";
import { internalServerErrorResponse } from "@/utils/http/internalServerErrorResponse";
import { notFound } from "@/utils/http/notFound";
import { ManagerNotifications } from "@prisma/client";

export class ManagerNotificationService
  implements ManagerNotificationServiceInterface
{
  async createNotification(
    json: CreateManagerNotificationDto
  ): Promise<ManagerNotifications> {
    try {
      json.message = await encryption.encryptText(json.message);
      return await prisma.managerNotifications.create({
        data: json,
      });
    } catch (err) {
      console.error(`error to create the notification: ${err}`);
      throw internalServerErrorResponse("Error to create the notification");
    }
  }
  async getAllNotifications(): Promise<ManagerNotifications[]> {
    const notifications = await prisma.managerNotifications.findMany();
    const decrypted = [] as ManagerNotifications[];
    await Promise.all(
      notifications.map(async (notification) => {
        notification.message = await encryption.decipherText(
          notification.message
        );
        decrypted.push(notification);
      })
    );
    return decrypted;
  }
  async deleteNotification(id: number): Promise<Object> {
    const notification = await prisma.managerNotifications.findUnique({
      where: {
        id: id,
      },
    });
    if (!notification) {
      throw notFound({ message: "notification not found" });
    }
    await prisma.managerNotifications.delete({
      where: {
        id: id,
      },
    });
    return { message: "notification deleted with success" };
  }
}

export const managerNotificationsService = new ManagerNotificationService();
