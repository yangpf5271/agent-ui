import { memo } from "react";

// import Icon from '@/components/ui/icon'

import MarkdownRenderer from "@/components/ui/typography/MarkdownRenderer";
import { usePlaygroundStore } from "@/stores/PlaygroundStore";

import type { PlaygroundChatMessage } from "@/types/playground";
import AgentThinkingLoader from "../AgentThinkingLoader";

interface MessageProps {
  message: PlaygroundChatMessage;
}

export const AgentMessage = ({ message }: MessageProps) => {
  const { streamingError } = usePlaygroundStore();

  let messageContent;
  if (message.content) {
    messageContent = (
      <div className="flex w-full flex-col gap-4">
        <MarkdownRenderer>{message.content}</MarkdownRenderer>
      </div>
    );
  } else if (streamingError) {
    messageContent = (
      <p className="text-destructive">
        Oops! Something went wrong with the stream. Please try again, or refresh
        the page.
      </p>
    );
  } else {
    messageContent = (
      <div className="mt-2 flex items-start">
        <AgentThinkingLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-row items-start gap-4">
      <div className="shrink-0">
        <div>AI</div>
      </div>
      {messageContent}
    </div>
  );
};

export const UserMessage = memo(({ message }: MessageProps) => {
  return (
    <div className="flex flex-row-reverse items-start gap-4 pt-4 text-start max-md:break-words">
      <div className="text-md font-medium text-primary/80 bg-secondary px-2 py-1 rounded-lg">
        {message.content}
      </div>
    </div>
  );
});

UserMessage.displayName = "UserMessage";
