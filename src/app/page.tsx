import ChatArea from "@/components/ChatArea/ChatArea";
import ChatInput from "@/components/ChatArea/ChatInput/ChatInput";
export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <ChatArea/>
      <div className="sticky bottom-0 px-4 pb-2">
        <ChatInput/>
      </div>
    </div>
  );
}
