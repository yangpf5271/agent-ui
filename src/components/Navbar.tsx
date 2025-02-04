"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { AgentSelector } from "@/components/AgentSelector";
import useChatActions from "@/hooks/playground/useChatActions";

export default function Navbar() {
  const { clearChat } = useChatActions();

  return (
    <header className="p-4 flex items-center gap-4">
      <Button onClick={clearChat} className="bg-brand hover:bg-brand/80">
        <PlusIcon />
        <span className="ml-2">New Chat</span>
      </Button>
      <AgentSelector />
    </header>
  );
} 