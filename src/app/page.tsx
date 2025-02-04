import ChatArea from "@/components/ChatArea/ChatArea";
import ChatInput from "@/components/ChatArea/ChatInput/ChatInput";
import CollapsibleSidebar from "@/components/Sidebar/CollapsibleSidebar";

export default function Home() {
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
