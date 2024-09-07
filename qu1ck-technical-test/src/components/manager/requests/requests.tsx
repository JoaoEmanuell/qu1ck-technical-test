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
import { DataTable } from "@/components/ui/data-table";
import { RequestColumns } from "./requestsColumns";

export type request = {
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
      <DataTable
        columns={RequestColumns({
          changeSelectStatus: changeSelectStatus,
          deleteRequest: deleteRequest,
        })}
        data={requests}
      />
    </div>
  );
};
