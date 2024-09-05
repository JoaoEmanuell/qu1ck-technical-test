"use client";

import { Button } from "../../ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { ChangeEvent, useState } from "react";
import { AddItem } from "./addItem";
import { randomKey } from "@/utils/generateRandomKey";
import { Trash2 } from "lucide-react";

type StockItem = {
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

  const changeStockObject = (
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
  };

  const addItemToStock = () => {
    setAddDivElement([...addDivElement, <AddItem key={randomKey()} />]);
  };

  const deleteItem = async (id: number) => {
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
  };

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
      <table className="table-auto">
        <tr>
          <th>Nome do ingrediente</th>
          <th>Quantidade</th>
          <th>Unidade de medida</th>
        </tr>
        <tbody>
          {stock.map((stockItem) => {
            const dividerFactor =
              stockItem.unit_of_measurement === "unit" ? 1 : 1000;

            const unitOfMeasurementHashMap = {
              gram: "quilos",
              milliliter: "litros",
              unit: "unidades",
            };

            return (
              <tr key={stockItem["id"]}>
                <td>
                  <input
                    type="text"
                    name=""
                    id=""
                    defaultValue={stockItem.ingredient_name}
                    className="border-b border-black p-1 text-center"
                    onChange={(element) => {
                      changeStockObject(
                        element,
                        stockItem.id,
                        "ingredient_name",
                        dividerFactor
                      );
                    }}
                  />
                </td>
                <td className="px-8">
                  <div className="flex justify-center items-center">
                    <input
                      type="number"
                      name=""
                      id=""
                      min={0}
                      className="w-12 text-center"
                      step={0.1}
                      defaultValue={parseFloat(
                        `${stockItem.quantity / dividerFactor}`
                      ).toFixed(1)}
                      onChange={(element) => {
                        changeStockObject(
                          element,
                          stockItem.id,
                          "quantity",
                          dividerFactor
                        );
                      }}
                    />
                  </div>
                </td>
                <td>
                  <Select
                    onValueChange={(value) => {
                      changeStockObject(
                        value,
                        stockItem.id,
                        "unit_of_measurement",
                        dividerFactor
                      );
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          unitOfMeasurementHashMap[
                            stockItem.unit_of_measurement
                          ]
                        }
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
                </td>
                <td className="pl-4">
                  <Trash2
                    onClick={() => {
                      deleteItem(stockItem.id);
                    }}
                    color="red"
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4">
        {...addDivElement}
        <div className="flex items-center space-x-4">
          <Button onClick={addItemToStock}>Adicionar item</Button>
          <Button onClick={saveStock} variant="green">
            Salvar alterações
          </Button>
        </div>
      </div>
    </div>
  );
};
