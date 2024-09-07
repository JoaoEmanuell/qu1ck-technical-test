/* eslint-disable react-hooks/rules-of-hooks */

/**
 * Define the stock columns used by data table
 */

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
import { table } from "console";
import React from "react";
import { stockObject } from "@/interfaces/stockInterfaces";

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
      cell: ({ row }) => {
        const initialValue = row.getValue("ingredient_name");
        const unitOfMeasurement = row.getValue(
          "unit_of_measurement"
        ) as stockObject["unit_of_measurement"];
        const dividerFactor = Number(unitOfMeasurement === "unit" ? 1 : 1000);
        const [value, setValue] = React.useState(initialValue);

        // Sincronizar o estado local com o valor inicial
        React.useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        // Atualizar o estado local sem interferir no global durante a digitação
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value); // Atualiza apenas o estado local
        };

        // Atualizar o estado global somente quando o input perde o foco
        const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
          props.changeStockObject(
            event,
            row.getValue("id"),
            "ingredient_name",
            dividerFactor
          );
        };

        return (
          <Input
            type="text"
            className="text-center"
            value={value as string}
            onChange={handleChange} // Muda o valor local durante a digitação
            onBlur={handleBlur} // Atualiza o estado global quando o foco sai do input
          />
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
        const initialValue = row.getValue("quantity");
        const unitOfMeasurement = row.getValue(
          "unit_of_measurement"
        ) as stockObject["unit_of_measurement"];
        const dividerFactor = Number(unitOfMeasurement === "unit" ? 1 : 1000);
        const [value, setValue] = React.useState(initialValue);

        // Sincronizar o estado local com o valor inicial
        React.useEffect(() => {
          const quantity = initialValue;
          const formatted = Math.abs(Number(quantity) / dividerFactor);
          setValue(formatted.toFixed(unitOfMeasurement === "unit" ? 0 : 1));
        }, [initialValue, unitOfMeasurement, dividerFactor]);

        // Atualizar o estado local sem interferir no global durante a digitação
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value); // Atualiza apenas o estado local
        };

        // Atualizar o estado global somente quando o input perde o foco
        const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
          props.changeStockObject(
            event,
            row.getValue("id"),
            "quantity",
            dividerFactor
          );
        };

        return (
          <Input
            type="number"
            name=""
            id=""
            min={0}
            className="w-24 text-center"
            step={row.getValue("unit_of_measurement") === "unit" ? 1 : 0.1}
            value={value as number}
            onChange={handleChange} // Muda o valor local durante a digitação
            onBlur={handleBlur} // Atualiza o estado global quando o foco sai do input
          />
        );
      },
    },
    {
      accessorKey: "unit_of_measurement",
      header: "Unidade de medida",
      cell: ({ row }) => {
        const dividerFactor = Number(
          row.getValue("unit_of_measurement") === "unit" ? 1 : 1000
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
                "unit_of_measurement",
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
