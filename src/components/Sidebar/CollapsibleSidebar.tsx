"use client"

import { usePlaygroundStore } from "@/stores/PlaygroundStore";
import { Button } from "@/components/ui/button";
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Icon from "../ui/icon";
import useChatActions from "@/hooks/playground/useChatActions";

const CollapsibleSidebar = () => {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = usePlaygroundStore();
  const { clearChat } = useChatActions();

  return (
    <div
      // The sidebar container with a dynamic width: w-64 when expanded, w-16 when collapsed.
      // Adjusted padding so that when collapsed, the inner content has more room.
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

      <div className="flex-grow">
      </div>

      <div>
        <Button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="w-full p-1"
        >
          {isSidebarCollapsed ? (
            <ChevronRightIcon className="w-4 h-4" />
          ) : (
            <ChevronLeftIcon className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CollapsibleSidebar; 