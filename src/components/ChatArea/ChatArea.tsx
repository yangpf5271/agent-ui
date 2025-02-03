"use client"

import { usePlaygroundStore } from '@/stores/PlaygroundStore'
import MessageList from './Messages/MessageList'
// import ScrollToBottomButton from './ScrollToBottom'
// import { StickToBottom } from 'use-stick-to-bottom'
const ChatArea = () => {
  const { messages } = usePlaygroundStore()

  return (
    <div
      className="relative flex min-h-0 flex-grow flex-col overflow-y-auto"
      // resize="smooth"
      // initial="smooth"
    >
      <div className="flex min-h-full flex-col justify-center">
        <div className="mx-auto w-full max-w-2xl space-y-9 px-4 pb-4">
          <MessageList messages={messages} />
        </div>
      </div>
      {/* <ScrollToBottomButton /> */}
    </div>
  )
}

export default ChatArea
