/**
 * Notifications session component
 */

import { Button } from "@/components/ui/button";
import {
  Table,
  TableCaption,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { randomKey } from "@/utils/generateRandomKey";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type notificationsType = {
  id: number;
  message: string;
};

interface NotificationsComponentProps {
  notifications: notificationsType[];
}

export const NotificationsComponent = (props: NotificationsComponentProps) => {
  const [mainDivKey, setMainDivKey] = useState(randomKey());
  const [notifications, setNotifications] = useState<
    notificationsType[] | null
  >(props.notifications);

  const deleteMessage = async (id: number) => {
    const response = await fetch(`/api/manager/notifications/${id}/`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      alert(`Notificação deletada com sucesso!`);
      // edit stock object
      const notificationsCopy = [...notifications];
      for (const position in notificationsCopy) {
        if (notificationsCopy[position].id === id) {
          notificationsCopy.splice(Number(position), 1);
          setNotifications(notificationsCopy);
          setMainDivKey(randomKey());
          return;
        }
      }
    } else {
      const json = await response.json();
      alert(`Erro ao deletar o pedido: ${json.error_description}`);
    }
  };

  const deleteAllNotifications = async () => {
    const confirmReturn = confirm(
      "Tem certeza que deseja deletar todas as mensagens?"
    );
    if (confirmReturn) {
      alert("Deletando todas as mensagens");
      await fetch(`/api/manager/notifications/`, {
        method: "PUT",
        body: JSON.stringify({
          notifications: notifications,
        }),
      });
      setNotifications([]);
      setMainDivKey(randomKey());
      alert("Todas as mensagens foram deletadas com sucesso!");
    }
  };

  return (
    <div key={mainDivKey}>
      <div>
        <Table>
          <TableCaption>
            {notifications.length !== 0
              ? "Mensagens"
              : "Nenhuma mensagem disponível!"}
          </TableCaption>
          <TableBody>
            {notifications.map((notification) => {
              return (
                <TableRow key={notification.id}>
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>
                    <Trash2
                      color="red"
                      className="cursor-pointer"
                      onClick={() => {
                        deleteMessage(notification.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div>
        <Button
          variant="destructive"
          onClick={deleteAllNotifications}
          disabled={notifications.length !== 0 ? false : true}
        >
          Deletar mensagens
        </Button>
      </div>
    </div>
  );
};
