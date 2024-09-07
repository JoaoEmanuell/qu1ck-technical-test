/**
 * Stock session component
 */

"use client";

import { Button } from "../../ui/button";
import { ChangeEvent, useCallback, useState } from "react";
import { AddItem } from "./addItem";
import { randomKey } from "@/utils/generateRandomKey";
import { DataTable } from "@/components/ui/data-table";
import { StockColumns } from "./stockColumns";

export type StockItem = {
  id: number;
  unit_of_measurement: "unit" | "milliliter" | "gram";
  ingredient_name: string;
  quantity: number;
};

interface StockProps {
  stock: StockItem[];
}

export const Stock = (props: StockProps) => {
  const [stock, setStock] = useState<StockItem[]>(props.stock);
  const [addDivElement, setAddDivElement] = useState<JSX.Element[] | null>([]);
  const [mainDivElementKey, setMainDivElementKey] = useState(randomKey());

  const changeStockObject = useCallback(
    (
      event: ChangeEvent<HTMLInputElement> | string,
      id: number,
      keyToChange: keyof StockItem,
      dividerFactor: number
    ) => {
      const handleGetTheCorrectValue = (value: string) => {
        if (keyToChange === "quantity")
          return Math.abs(Number(value) * dividerFactor);
        else return value.trim();
      };

      const stockCopy = [...stock];
      for (const position in stockCopy) {
        if (stockCopy[position].id === id) {
          stockCopy[position] = {
            ...stockCopy[position],
            [keyToChange]: handleGetTheCorrectValue(
              typeof event === "object" ? event.target.value : event
            ),
          };
          setStock(stockCopy);
          return;
        }
      }
    },
    [stock, setStock]
  );

  const addItemToStock = () => {
    setAddDivElement([...addDivElement, <AddItem key={randomKey()} />]);
  };

  const deleteItem = useCallback(
    async (id: number) => {
      // delete on api
      const response = await fetch(`/api/manager/stock/${id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        alert("Item deletado com sucesso");
      } else {
        const json = await response.json();
        alert(`Erro ao deletar o item: ${json.error_description}`);
      }
      // edit stock object
      const stockCopy = [...stock];
      for (const position in stockCopy) {
        if (stockCopy[position].id === id) {
          stockCopy.splice(Number(position), 1);
          setStock(stockCopy);
          setMainDivElementKey(randomKey());
          return;
        }
      }
    },
    [stock, setStock]
  );

  const saveStock = async () => {
    const response = await fetch("/api/manager/stock", {
      method: "PUT",
      body: JSON.stringify({ data: stock }),
    });
    if (response.status === 201) {
      alert("As alterações no estoque foram salvas com sucesso!");
    } else {
      const json = await response.json();
      alert(`Erro ao salvar alterações: ${json.error_description}`);
    }
  };

  return (
    <div key={mainDivElementKey}>
      <DataTable
        columns={StockColumns({
          changeStockObject: changeStockObject,
          deleteItem: deleteItem,
        })}
        data={stock}
      />
      <div className="mt-4">
        {...addDivElement}
        <div className="flex items-center space-x-4">
          <Button onClick={addItemToStock}>Adicionar item</Button>
          <Button
            onClick={saveStock}
            variant="green"
            disabled={props.stock === stock}
          >
            Salvar alterações
          </Button>
        </div>
      </div>
    </div>
  );
};
