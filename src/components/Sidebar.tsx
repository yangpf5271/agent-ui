"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { AgentSelector } from "@/components/AgentSelector";
import useChatActions from "@/hooks/playground/useChatActions";

export default function Sidebar() {
  const { clearChat } = useChatActions();

  return (
    <aside className="sticky top-0 z-10 h-screen w-64 bg-[#18181B] p-4 flex flex-col gap-4">
      <Button onClick={clearChat} className="bg-brand hover:bg-brand/80">
        <PlusIcon />
        <span className="ml-2">New Chat</span>
      </Button>
      <AgentSelector />
    </aside>
  );
} 