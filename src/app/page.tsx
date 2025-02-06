"use client";
import ChatArea from "@/components/ChatArea/ChatArea";
import ChatInput from "@/components/ChatArea/ChatInput/ChatInput";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-primary text-secondary">
      <main className="relative flex flex-col flex-grow">
        <ChatArea />
        <div className="sticky bottom-0 px-4 pb-2">
          <ChatInput />
        </div>
      </main>
    </div>
  );
}
