"use client"

import { usePlaygroundStore } from "@/stores/PlaygroundStore";
import { Button } from "@/components/ui/button";
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import useChatActions from "@/hooks/playground/useChatActions";

const CollapsibleSidebar = () => {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = usePlaygroundStore();
  const { clearChat } = useChatActions();

  return (
    <div
      // The sidebar container with a dynamic width: w-64 when expanded, w-16 when collapsed.
      className={`flex flex-col h-screen p-4 bg-gray-100 transition-all duration-300 ${
        isSidebarCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* New Chat button area at the top */}
      <div className="mb-4">
        <Button
          onClick={clearChat}
          className={`w-full ${isSidebarCollapsed ? "justify-center" : "justify-start"}`}
        >
          <PlusIcon />
          {!isSidebarCollapsed && <span className="ml-2">New Chat</span>}
        </Button>
      </div>

      {/* Optional sidebar content area */}
      <div className="flex-grow">
        {/* Additional sidebar content can go here */}
      </div>

      {/* Collapse/Expand toggle button at the bottom */}
      <div>
        <Button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          variant="ghost"
          className="w-full justify-center"
        >
          {isSidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </Button>
      </div>
    </div>
  );
};

export default CollapsibleSidebar; 