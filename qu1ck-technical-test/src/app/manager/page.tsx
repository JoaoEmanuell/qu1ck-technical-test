/**
 * v0 by Vercel.
 * @see https://v0.dev/t/W5oMgfmrGXU
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";

import { useEffect, useState } from "react";
import { Stock } from "@/components/manager/stock/stock";
import { RequestsComponent } from "@/components/manager/requests/requests";
import { MessagesComponent } from "@/components/manager/messages/messages";
import { ReloadButton } from "@/components/ui/reloadButton";
import { randomKey } from "@/utils/generateRandomKey";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";

type tabs = "Estoque" | "Pedidos" | "Mensagens";

export default function ManagerPage() {
  const [activeTab, setActiveTab] = useState<tabs>("Estoque");

  const [stockComponent, setStockComponent] = useState<JSX.Element | null>();
  const [requestsComponent, setRequestsComponent] =
    useState<JSX.Element | null>();
  const [messagesComponent, setMessagesComponent] =
    useState<JSX.Element | null>();

  const constructStockComponent = (stock: any[]) => {
    setStockComponent(<Stock stock={stock} key={randomKey()} />);
  };

  const constructRequestComponent = (requests: any[]) => {
    setRequestsComponent(
      <RequestsComponent requests={requests} key={randomKey()} />
    );
  };

  const constructMessagesComponent = (messages: any[]) => {
    setMessagesComponent(
      <MessagesComponent messages={messages} key={randomKey()} />
    );
  };

  const constructComponents = () => {
    const fetchInit = {
      cache: "force-cache",
    } as RequestInit;
    // get stock
    fetch("/api/manager/stock", fetchInit).then((response) => {
      response.json().then((json) => {
        constructStockComponent(json);
      });
    });
    // get requests
    fetch("/api/requests", fetchInit).then((response) => {
      response.json().then((json) => {
        constructRequestComponent(json);
      });
    });
    // get notifications
    fetch("/api/manager/notifications", fetchInit).then((response) => {
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
      <header className="py-4 pl-2 flex items-center justify-between">
        <div className="flex gap-4 mr-4">
          <NavigationMenu>
            <NavigationMenuList className="space-x-4">
              <NavigationMenuItem
                onClick={() => {
                  setActiveTab("Estoque");
                }}
                className={`cursor-pointer text-primary-foreground p-2 rounded-sm hover:bg-primary transition-all ${
                  activeTab === "Estoque" ? "bg-primary" : "bg-blue-400"
                }`}
              >
                Estoque
              </NavigationMenuItem>
              <NavigationMenuItem
                onClick={() => {
                  setActiveTab("Pedidos");
                }}
                className={`cursor-pointer text-primary-foreground p-2 rounded-sm hover:bg-primary transition-all ${
                  activeTab === "Pedidos" ? "bg-primary" : "bg-blue-400"
                }`}
              >
                Pedidos
              </NavigationMenuItem>
              <NavigationMenuItem
                onClick={() => {
                  setActiveTab("Mensagens");
                }}
                className={`cursor-pointer text-primary-foreground p-2 rounded-sm hover:bg-primary transition-all ${
                  activeTab === "Mensagens" ? "bg-primary" : "bg-blue-400"
                }`}
              >
                Mensagens
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
