"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StockItem } from "./stock";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Trash2 } from "lucide-react";
import { ChangeEvent } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface StockColumnsInterface {
  changeStockObject: (
    event: ChangeEvent<HTMLInputElement> | string,
    id: number,
    keyToChange: keyof StockItem,
    dividerFactor: number
  ) => void;
  deleteItem: (id: number) => void;
}

const unitOfMeasurementHashMap = {
  gram: "quilos",
  milliliter: "litros",
  unit: "unidades",
};

export const StockColumns = (props: StockColumnsInterface) => {
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
      accessorKey: "ingredient_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome do ingrediente
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quantidade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const quantity = row.getValue("quantity");
        const dividerFactor = Number(
          row.getValue("unit_of_measurement") === "unit" ? 1 : 100
        );

        const formatted = Math.abs(Number(quantity) / dividerFactor);

        return (
          <Input
            type="number"
            name=""
            id=""
            min={0}
            className="w-24 text-center"
            step={row.getValue("unit_of_measurement") === "unit" ? 1 : 0.1}
            defaultValue={parseFloat(`${formatted}`).toFixed(
              row.getValue("unit_of_measurement") === "unit" ? 0 : 1
            )}
            onChange={(element) => {
              props.changeStockObject(
                element,
                row.getValue("id"),
                "quantity",
                dividerFactor
              );
            }}
          />
        );
      },
    },
    {
      accessorKey: "unit_of_measurement",
      header: "Unidade de medida",
      cell: ({ row }) => {
        const dividerFactor = Number(
          row.getValue("unit_of_measurement") === "unit" ? 1 : 100
        );
        const unitOfMeasurement = row.getValue(
          "unit_of_measurement"
        ) as StockItem["unit_of_measurement"];
        return (
          <Select
            onValueChange={(element) => {
              props.changeStockObject(
                element,
                row.getValue("id"),
                "quantity",
                dividerFactor
              );
            }}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={unitOfMeasurementHashMap[unitOfMeasurement]}
                className="text-center"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gram" className="text-center">
                Quilos
              </SelectItem>
              <SelectItem value="milliliter" className="text-center">
                Litros
              </SelectItem>
              <SelectItem value="unit" className="text-center">
                Unidades
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
              props.deleteItem(row.getValue("id"));
            }}
            color="red"
            className="cursor-pointer"
          />
        );
      },
    },
  ] as ColumnDef<StockItem>[];
};
