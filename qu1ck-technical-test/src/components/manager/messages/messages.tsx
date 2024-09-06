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

type messagesType = {
  id: number;
  message: string;
};

interface MessagesComponentProps {
  messages: messagesType[];
}

export const MessagesComponent = (props: MessagesComponentProps) => {
  const [mainDivKey, setMainDivKey] = useState(randomKey());
  const [messages, setMessages] = useState<messagesType[] | null>(
    props.messages
  );

  const deleteMessage = async (id: number) => {
    const response = await fetch(`/api/manager/notifications/${id}/`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      alert(`Mensagem deletada com sucesso!`);
      // edit stock object
      const messagesCopy = [...messages];
      for (const position in messagesCopy) {
        if (messagesCopy[position].id === id) {
          messagesCopy.splice(Number(position), 1);
          setMessages(messagesCopy);
          setMainDivKey(randomKey());
          return;
        }
      }
    } else {
      const json = await response.json();
      alert(`Erro ao deletar o pedido: ${json.error_description}`);
    }
  };

  const deleteAllMessages = async () => {
    if (messages.length === 0) {
      return;
    }
    const confirmReturn = confirm(
      "Tem certeza que deseja deletar todas as mensagens?"
    );
    if (confirmReturn) {
      alert("Deletando todas as mensagens");
      await Promise.all(
        messages.map(async (message) => {
          await fetch(`/api/manager/notifications/${message.id}/`, {
            method: "DELETE",
          });
        })
      );
      setMessages([]);
      setMainDivKey(randomKey());
      alert("Todas as mensagens foram deletadas com sucesso!");
    }
  };

  return (
    <div key={mainDivKey}>
      <div>
        <Button
          variant="destructive"
          onClick={deleteAllMessages}
          disabled={messages.length !== 0 ? false : true}
        >
          Deletar mensagens
        </Button>
      </div>
      <div>
        <Table>
          <TableCaption>
            {messages.length !== 0
              ? "Mensagens"
              : "Nenhuma mensagem disponível!"}
          </TableCaption>
          <TableBody>
            {messages.map((message) => {
              return (
                <TableRow key={message.id}>
                  <TableCell>{message.message}</TableCell>
                  <TableCell>
                    <Trash2
                      color="red"
                      className="cursor-pointer"
                      onClick={() => {
                        deleteMessage(message.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
