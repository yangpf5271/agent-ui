"use client"

import React from "react"
import { usePlaygroundStore } from "@/stores/PlaygroundStore";
import { Button } from "@/components/ui/button";
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Icon from "../ui/icon";
import useChatActions from "@/hooks/playground/useChatActions";
import { AgentSelector } from "@/components/AgentSelector"

const CollapsibleSidebar = () => {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = usePlaygroundStore();
  const { clearChat } = useChatActions();

  return (
    <div
      className={`flex flex-col h-screen bg-gray-100 transition-all duration-300 ${
        isSidebarCollapsed ? "w-16 p-2" : "w-64 p-2"
      }`}
    >

      <div className="mb-4">
        <Button
          onClick={clearChat}
          className={`w-full bg-brand hover:bg-brand/80 ${isSidebarCollapsed ? "justify-center" : "justify-start"}`}
        >
          <PlusIcon />
          {!isSidebarCollapsed && <span className="ml-2">New Chat</span>}
        </Button>
      </div>

      <div className={`${isSidebarCollapsed ? "hidden" : " my-2"}`}>
        <AgentSelector />
      </div>

      <div className="flex-grow">
      </div>

      <div>
        <Button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="w-full p-1"
        >
          {isSidebarCollapsed ? (
            <ChevronRightIcon className="size-4" />
          ) : (
            <ChevronLeftIcon className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CollapsibleSidebar; 