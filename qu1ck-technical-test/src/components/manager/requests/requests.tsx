/**
 * Requests session component
 */

"use client";

import { randomKey } from "@/utils/generateRandomKey";
import { useState } from "react";
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
