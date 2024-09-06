"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Pizzaria</h1>
      <NavigationMenu>
        <NavigationMenuList className="space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink
              className="bg-blue-400 p-2 rounded-sm hover:bg-blue-500 transition-all"
              href="/chat"
            >
              Chatbot
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="bg-blue-400 p-2 rounded-sm hover:bg-blue-500 transition-all"
              href="/manager"
            >
              Dashboard
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
