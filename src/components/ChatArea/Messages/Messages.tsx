import { memo } from 'react'

// import Icon from '@/components/ui/icon'

import MarkdownRenderer from '@/components/ui/typography/MarkdownRenderer'
import { usePlaygroundStore } from '@/stores/PlaygroundStore'

import type { PlaygroundChatMessage } from '@/types/playground'
// import AgentThinkingLoader from '../AgentThinkingLoader'

interface MessageProps {
  message: PlaygroundChatMessage
}

export const AgentMessage = ({ message }: MessageProps) => {
  const { streamingError } = usePlaygroundStore()

  let messageContent
  if (message.content) {
    messageContent = (
      <div className="flex w-full flex-col gap-4">
        <MarkdownRenderer>{message.content}</MarkdownRenderer>
      </div>
    )
  } else if (streamingError) {
    messageContent = (
      <p className="text-destructive">
        Oops! Something went wrong with the stream. Please try again, or refresh
        the page.
      </p>
    )
  } else {
    messageContent = (
      <div className="mt-2 flex items-start">
        {/* <AgentThinkingLoader /> */}
      </div>
    )
  }

  return (
    <div className="flex flex-row items-start gap-4">
      <div className="shrink-0">
        <div>AI : </div>
      </div>
      {messageContent}
    </div>
  )
}

export const UserMessage = memo(({ message }: MessageProps) => {
  const username = "user message"

  return (
    <div className="flex flex-row items-start gap-4 pt-4 text-start max-md:break-words">
      <div className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-sm bg-secondary text-[10px]">
        <div className="text-primary uppercase">
          {username}
        </div>
      </div>
      <div className="mt-0.1 text-lg font-medium text-primary/80">
        {message.content}
      </div>
    </div>
  )
})

UserMessage.displayName = 'UserMessage'
