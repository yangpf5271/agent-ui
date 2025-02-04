"use client";
import ChatArea from "@/components/ChatArea/ChatArea";
import ChatInput from "@/components/ChatArea/ChatInput/ChatInput";
import CollapsibleSidebar from "@/components/Sidebar/CollapsibleSidebar";
import useChatActions from "@/hooks/playground/useChatActions";
import { useEffect } from "react";

export default function Home() {
  const { getAgents } = useChatActions();
  useEffect(() => {
    const fetchAgents = async () => {
      const agents = await getAgents();
      console.log(agents);
    };
    fetchAgents();
  }, [getAgents]);
  return (
    <div className="flex h-screen">
      <CollapsibleSidebar />
      <div className="relative flex flex-col flex-grow">
        <ChatArea />
        <div className="sticky bottom-0 px-4 pb-2">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
