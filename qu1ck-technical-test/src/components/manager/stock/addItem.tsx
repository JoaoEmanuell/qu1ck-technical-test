import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

type measurementType = "gram" | "milliliter" | "unit" | null;

export const AddItem = () => {
  const ingredientNameRef = useRef<HTMLInputElement | null>();
  const quantityRef = useRef<HTMLInputElement | null>();
  const [measurement, setMeasurement] = useState<measurementType>(null);
  const [id, setId] = useState<number | null>(null);

  const validateElements = () => {
    const ingredientName = ingredientNameRef.current!.value;
    let quantity: string | number = quantityRef.current!.value;

    if (!ingredientName) {
      alert("Nome do ingrediente não pode ser vazio");
      throw "Invalid element";
    } else if (!quantity) {
      alert("Quantidade não pode ser vazia");
      throw "Invalid element";
    } else if (!measurement) {
      alert("Selecione um tipo de medição");
      throw "Invalid element";
    }
    quantity = Math.abs(Number(quantity) * (measurement === "unit" ? 1 : 1000));
    return [ingredientName, quantity];
  };

  const changeItem = async () => {
    try {
      const validate = validateElements();
      const ingredientName = validate[0] as string;
      const quantity = validate[1] as number;

      const data = {
        ingredient_name: ingredientName,
        quantity: quantity,
        unit_of_measurement: measurement,
      };

      const response = await fetch(`/api/manager/stock/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        alert("Item editado com sucesso");
      } else {
        const json = await response.json();
        alert(`Erro ao editar item ${json.error_description}`);
      }
    } catch (err) {
      return;
    }
  };

  const addItem = async () => {
    if (id) {
      await changeItem();
      return;
    }
    try {
      const validate = validateElements();
      const ingredientName = validate[0] as string;
      const quantity = validate[1] as number;

      const data = {
        ingredient_name: ingredientName,
        quantity: quantity,
        unit_of_measurement: measurement,
      };

      const response = await fetch("/api/manager/stock", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status === 201) {
        setId(json["id"]);
        alert("Item adicionado ao estoque com sucesso");
      } else {
        alert(`Erro ao adicionar o item: ${json.error_description}`);
      }
    } catch (err) {
      return;
    }
  };

  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <input
                type="text"
                id=""
                placeholder="Nome do ingrediente"
                className="border-b border-black p-1 text-center"
                required
                ref={ingredientNameRef}
              />
            </TableCell>
            <TableCell>
              <div className="flex justify-center items-center">
                <input
                  type="number"
                  min={0}
                  placeholder="Quantidade"
                  className="w-12 text-center"
                  required
                  ref={quantityRef}
                  defaultValue={0}
                />
              </div>
            </TableCell>
            <TableCell className="pr-4">
              <Select
                required
                onValueChange={(value: measurementType) => {
                  setMeasurement(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="Unidade de medida"
                    className="text-left"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gram" className="text-center">
                    quilos
                  </SelectItem>
                  <SelectItem value="milliliter" className="text-center">
                    litros
                  </SelectItem>
                  <SelectItem value="unit" className="text-center">
                    unidades
                  </SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Button variant="green" onClick={addItem}>
                Salvar
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
