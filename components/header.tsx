import React from "react";
import { SidebarTrigger } from "./ui/sidebar";

const Header = () => {
  return (
    <header className="w-full h-16 flex justify-center items-center bg-white border-b relative">
      <div className="absolute left-4">
        <SidebarTrigger className="size-9" />
      </div>
      <h1 className="text-2xl font-bold">BeastGamesGPT</h1>
    </header>
  );
};

export default Header;
