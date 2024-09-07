"use client";

import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "@/components/ui/table";
import { randomKey } from "@/utils/generateRandomKey";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Trash2 } from "lucide-react";

type request = {
  id: number;
  request_itens: string;
  date: string;
  status: "received" | "in_progress" | "completed" | "cancelled";
};

interface RequestProps {
  requests: request[];
}

const statusHashMap = {
  received: "Recebido",
  in_progress: "Em progresso",
  completed: "Completado",
  cancelled: "Cancelado",
};

export const RequestsComponent = (props: RequestProps) => {
  const [mainDivKey, setMainDivKey] = useState(randomKey());
  const [requests, setRequests] = useState(props.requests);

  const deleteRequest = async (id: number) => {
    const response = await fetch(`/api/requests/${id}/`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      alert(`Pedido deletado com sucesso!`);
      // edit stock object
      const requestsCopy = [...requests];
      for (const position in requestsCopy) {
        if (requestsCopy[position].id === id) {
          requestsCopy.splice(Number(position), 1);
          setRequests(requestsCopy);
          setMainDivKey(randomKey());
          return;
        }
      }
    } else {
      const json = await response.json();
      alert(`Erro ao deletar o pedido: ${json.error_description}`);
    }
  };

  const changeSelectStatus = async (status: request["status"], id: number) => {
    const response = await fetch(`/api/requests/${id}/${status}`, {
      method: "PUT",
    });
    if (response.status !== 201) {
      const json = await response.json();
      alert(`Erro ao alterar o status do pedido: ${json.error_description}`);
    }
  };

  return (
    <div key={mainDivKey} className="overflow-x-auto">
      <Table>
        <TableCaption>Pedidos realizados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Itens</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => {
            return (
              <TableRow key={request.id}>
                <TableCell>
                  <ul className="list-disc">
                    {request.request_itens.split(";").map((item) => {
                      return (
                        <li key={randomKey()}>{item.replaceAll(`"`, "")}</li>
                      );
                    })}
                  </ul>
                </TableCell>
                <TableCell>
                  {new Date(request.date).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false, // Opcional, para formato 24 horas
                  })}
                </TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) => {
                      changeSelectStatus(
                        value as request["status"],
                        request.id
                      );
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        className="text-center"
                        placeholder={statusHashMap[request.status]}
                      ></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="received" className="text-center">
                        Recebido
                      </SelectItem>
                      <SelectItem value="in_progress" className="text-center">
                        Em progresso
                      </SelectItem>
                      <SelectItem value="completed" className="text-center">
                        Completado
                      </SelectItem>
                      <SelectItem value="cancelled" className="text-center">
                        Cancelado
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Trash2
                    color="red"
                    className="cursor-pointer"
                    onClick={() => {
                      deleteRequest(request.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
