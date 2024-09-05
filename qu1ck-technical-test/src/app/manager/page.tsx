/**
 * v0 by Vercel.
 * @see https://v0.dev/t/W5oMgfmrGXU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Stock } from "@/components/manager/stock/stock";

export default function Component() {
  const [activeTab, setActiveTab] = useState<
    "Estoque" | "Pedidos" | "Mensagens"
  >("Estoque");

  const [stockComponent, setStockComponent] = useState<JSX.Element | null>();

  const constructStockComponent = (stock: any[]) => {
    setStockComponent(<Stock stock={stock} />);
  };

  useEffect(() => {
    // get stock
    fetch("/api/manager/stock", {}).then((response) => {
      response.json().then((json) => {
        constructStockComponent(json);
      });
    });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          <Button
            className={
              activeTab === "Estoque" ? "bg-blue-500 rounded-sm" : "ghost"
            }
            onClick={() => setActiveTab("Estoque")}
          >
            Estoque
          </Button>
          <Button
            className={
              activeTab === "Pedidos" ? "bg-blue-500 rounded-sm" : "ghost"
            }
            onClick={() => setActiveTab("Pedidos")}
          >
            Pedidos
          </Button>
          <Button
            className={
              activeTab === "Mensagens" ? "bg-blue-500 rounded-sm" : "ghost"
            }
            onClick={() => setActiveTab("Mensagens")}
          >
            Mensagens
          </Button>
        </div>
      </header>
      <main className="flex-1 bg-background p-8">
        {activeTab === "Estoque" && (
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Gerenciamento de estoque</h2>
            {stockComponent}
          </div>
        )}
        {activeTab === "Pedidos" && (
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Gerenciamento de pedidos</h2>
            <p>Sessão de pedidos</p>
          </div>
        )}
        {activeTab === "Mensagens" && (
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">
              Gerenciamento de mensagens
            </h2>
            <p>Sessão de mensagens</p>
          </div>
        )}
      </main>
    </div>
  );
}
