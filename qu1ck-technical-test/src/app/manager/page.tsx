/**
 * v0 by Vercel.
 * @see https://v0.dev/t/W5oMgfmrGXU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Stock } from "@/components/manager/stock/stock";
import { RequestsComponent } from "@/components/manager/requests/requests";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MessagesComponent } from "@/components/manager/messages/messages";
import { ReloadButton } from "@/components/ui/reloadButton";

export default function Component() {
  const [activeTab, setActiveTab] = useState<
    "Estoque" | "Pedidos" | "Mensagens"
  >("Estoque");

  const [stockComponent, setStockComponent] = useState<JSX.Element | null>();
  const [requestsComponent, setRequestsComponent] =
    useState<JSX.Element | null>();
  const [messagesComponent, setMessagesComponent] =
    useState<JSX.Element | null>();

  const constructStockComponent = (stock: any[]) => {
    setStockComponent(<Stock stock={stock} />);
  };

  const constructRequestComponent = (requests: any[]) => {
    setRequestsComponent(<RequestsComponent requests={requests} />);
  };

  const constructMessagesComponent = (messages: any[]) => {
    setMessagesComponent(<MessagesComponent messages={messages} />);
  };

  const constructComponents = () => {
    // get stock
    fetch("/api/manager/stock", {}).then((response) => {
      response.json().then((json) => {
        constructStockComponent(json);
      });
    });
    // get requests
    fetch("/api/requests", {}).then((response) => {
      response.json().then((json) => {
        constructRequestComponent(json);
      });
    });
    // get notifications
    fetch("/api/manager/notifications", {}).then((response) => {
      response.json().then((json) => {
        constructMessagesComponent(json);
      });
    });
  };

  useEffect(() => {
    constructComponents();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-4 mr-4">
          <DropdownMenu>
            <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
            <DropdownMenuContent className="bg-blue-200">
              <DropdownMenuLabel>
                <Button
                  className={
                    activeTab === "Estoque" ? "bg-blue-500 rounded-sm" : "ghost"
                  }
                  onClick={() => setActiveTab("Estoque")}
                >
                  Estoque
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Button
                  className={
                    activeTab === "Pedidos" ? "bg-blue-500 rounded-sm" : "ghost"
                  }
                  onClick={() => setActiveTab("Pedidos")}
                >
                  Pedidos
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  className={
                    activeTab === "Mensagens"
                      ? "bg-blue-500 rounded-sm"
                      : "ghost"
                  }
                  onClick={() => setActiveTab("Mensagens")}
                >
                  Mensagens
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 bg-background p-8">
        {activeTab === "Estoque" && (
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md overflow-x-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">
                Gerenciamento de estoque
              </h2>
              <ReloadButton
                className="cursor-pointer"
                onClick={constructComponents}
              />
            </div>
            {stockComponent}
          </div>
        )}
        {activeTab === "Pedidos" && (
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">
                Gerenciamento de pedidos
              </h2>
              <ReloadButton
                className="cursor-pointer"
                onClick={constructComponents}
              />
            </div>
            {requestsComponent}
          </div>
        )}
        {activeTab === "Mensagens" && (
          <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold mb-4">
                Gerenciamento de mensagens
              </h2>
              <ReloadButton
                className="cursor-pointer"
                onClick={constructComponents}
              />
            </div>
            {messagesComponent}
          </div>
        )}
      </main>
    </div>
  );
}
