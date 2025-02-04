import ChatArea from "@/components/ChatArea/ChatArea";
import ChatInput from "@/components/ChatArea/ChatInput/ChatInput";
import NewChatButton from "@/components/ChatArea/NewChatButton";



export default function Home() {
  return (
    <div className="relative flex h-screen flex-col">
      <NewChatButton/>
      <ChatArea/>
      <div className="sticky bottom-0 px-4 pb-2">
        <ChatInput/>
      </div>
    </div>
  );
}
