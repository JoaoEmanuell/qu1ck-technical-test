/**
 * Define the requests columns used by data table
 */

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { request } from "./requests";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Trash2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { randomKey } from "@/utils/generateRandomKey";

interface RequestsColumnsInterface {
  changeSelectStatus: (status: request["status"], id: number) => void;
  deleteRequest: (id: number) => void;
}

const statusHashMap = {
  received: "Recebido",
  in_progress: "Em progresso",
  completed: "Completado",
  cancelled: "Cancelado",
};

export const RequestColumns = (props: RequestsColumnsInterface) => {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "request_itens",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Itens
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <ul className="list-disc">
            {(row.getValue("request_itens") as string)
              .split(";")
              .map((item) => {
                return <li key={randomKey()}>{item.replaceAll(`"`, "")}</li>;
              })}
          </ul>
        );
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <p>
            {new Date(row.getValue("date")).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        return (
          <Select
            onValueChange={(value) => {
              props.changeSelectStatus(
                value as request["status"],
                row.getValue("id")
              );
            }}
          >
            <SelectTrigger>
              <SelectValue
                className="text-center"
                placeholder={
                  statusHashMap[row.getValue("status") as request["status"]]
                }
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
        );
      },
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row }) => {
        return (
          <Trash2
            onClick={() => {
              props.deleteRequest(row.getValue("id"));
            }}
            color="red"
            className="cursor-pointer"
          />
        );
      },
    },
  ] as ColumnDef<request>[];
};
