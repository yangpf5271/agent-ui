import { useCallback } from 'react'

import { useParams } from 'next/navigation'
// import { useQueryState } from 'nuqs'
// import { toast } from 'sonner'

import { APIRoutes } from '@/api/routes'

import useChatActions from '@/hooks/playground/useChatActions'
import { usePlaygroundStore } from '@/stores/PlaygroundStore'
import { RunEvent, type RunResponse } from '@/types/playground'
import { constructEndpointUrl } from '@/utils/playgroundUtils'
import useAIResponseStream from '../streaming/useAIResponseStream'

/**
 * useAIChatStreamHandler is responsible for making API calls and handling the stream response.
 * For now, it only streams message content and updates the messages state.
 */
const useAIChatStreamHandler = () => {
  // The following are commented out until needed:
  // const isMonitoring = usePlaygroundStore((s) => s.isMonitoring)
  // const username = useUser()?.username
  // const setHistoryData = usePlaygroundStore((s) => s.setHistoryData)
  const setMessages = usePlaygroundStore((state) => state.setMessages)
  const setStreamingError = usePlaygroundStore((state) => state.setStreamingError)
  const { addMessage } = useChatActions()
  const selectedAgent = "simple-agent"
  const selectedEndpoint = usePlaygroundStore((state) => state.selectedEndpoint)
  // const [sessionId, setSessionId] = useQueryState('session')
  const { streamResponse } = useAIResponseStream()
  // const setStreamingError = usePlaygroundStore((s) => s.setStreamingError)
  // const setIsStreaming = usePlaygroundStore((s) => s.setIsStreaming)
  // const params = useParams<DefaultPageParams>()
  // const teamURL = params.account !== username ? params.account : undefined
  // const userId = teamURL ? `${username}__${teamURL}` : username

  const handleStreamResponse = useCallback(
    async (input: string | FormData) => {
      // Uncomment if you want to use streaming loading state later:
      // setIsStreaming(true)

      // Create FormData if input is a string
      const formData = input instanceof FormData ? input : new FormData()
      if (typeof input === 'string') {
        formData.append('message', input)
      }

      // Remove the last two messages only if they were an errored pair
      setMessages((prevMessages) => {
        if (prevMessages.length >= 2) {
          const lastMessage = prevMessages[prevMessages.length - 1]
          const secondLastMessage = prevMessages[prevMessages.length - 2]
          if (
            lastMessage.role === 'agent' &&
            lastMessage.streamingError === true && // only remove if an error occurred
            secondLastMessage.role === 'user'
          ) {
            return prevMessages.slice(0, -2)
          }
        }
        return prevMessages
      })

      // Add user message
      addMessage({
        role: 'user',
        content: formData.get('message') as string,
        created_at: Math.floor(Date.now() / 1000)
      })

      // Add an empty agent message placeholder
      addMessage({
        role: 'agent',
        content: '',
        // tool_calls: [], // not used at the moment
        streamingError: false,
        created_at: Math.floor(Date.now() / 1000) + 1
      })

      // Session-related variables commented out until needed:
      // let lastContent = ''
      // let newSessionId = sessionId

      try {
        const endpointUrl = constructEndpointUrl(selectedEndpoint)

        // Build URL with the selected agent's parameter
        const playgroundRunUrl = APIRoutes.AgentRun(endpointUrl).replace(
          '{agent_id}',
          selectedAgent
        )

        // Append required field
        formData.append('stream', 'true')

        await streamResponse({
          apiUrl: playgroundRunUrl,
          requestBody: formData,
          onChunk: (chunk: RunResponse) => {
            if (chunk.event === RunEvent.RunResponse) {
              // Update the last (agent) message with new content from the stream chunk
              setMessages((prevMessages) => {
                const newMessages = [...prevMessages]
                const lastMessage = newMessages[newMessages.length - 1]
                if (
                  lastMessage &&
                  lastMessage.role === 'agent' &&
                  typeof chunk.content === 'string'
                ) {
                  // Simply append the new content
                  lastMessage.content += chunk.content
                  lastMessage.created_at =
                    chunk.created_at ?? lastMessage.created_at
                }
                return newMessages
              })
            } else if (chunk.event === RunEvent.RunCompleted) {
              // Final update (if needed) on completion of the stream
              setMessages((prevMessages) => {
                const newMessages = prevMessages.map((message, index) => {
                  if (
                    index === prevMessages.length - 1 &&
                    message.role === 'agent'
                  ) {
                    let updatedContent: string
                    if (typeof chunk.content === 'string') {
                      updatedContent = chunk.content
                    } else {
                      try {
                        updatedContent = JSON.stringify(chunk.content)
                      } catch {
                        updatedContent = 'Error parsing response'
                      }
                    }
                    return {
                      ...message,
                      content: updatedContent
                    }
                  }
                  return message
                })
                return newMessages
              })
            }
            // Session update logic commented out for now:
            // if (chunk.session_id && chunk.session_id !== newSessionId) {
            //   newSessionId = chunk.session_id
            //   setSessionId(chunk.session_id)
            // }
          },
          onError: (error) => {
            setMessages((prevMessages) => {
              const newMessages = [...prevMessages]
              const lastMessage = newMessages[newMessages.length - 1]
              if (lastMessage && lastMessage.role === 'agent') {
                lastMessage.streamingError = true
              }
              return newMessages
            })
            // Update global state to indicate a streaming error occurred
            setStreamingError(true)
            // Use console.error instead of toast until notification handling is added
            console.error(
              `Error in streamResponse: ${
                error instanceof Error ? error.message : String(error)
              }`
            )
          },
          onComplete: () => {
            // Reset the global streaming error flag on successful completion
            setStreamingError(false)
            // if (newSessionId && newSessionId !== sessionId) {
            //   const placeHolderSessionData = {
            //     session_id: newSessionId,
            //     title: formData.get('message') as string,
            //     created_at: Math.floor(Date.now() / 1000)
            //   }
            //   setHistoryData((prevHistoryData) => [
            //     placeHolderSessionData,
            //     ...prevHistoryData
            //   ])
            // }
          }
        })
      } catch (error) {
        console.error(
          `Error in handleStreamResponse: ${
            error instanceof Error ? error.message : String(error)
          }`
        )
      } finally {
        // Uncomment when adding streaming state updates
        // setIsStreaming(false)
      }
    },
    [
      // setIsStreaming, // not used for now
      setMessages,
      addMessage,
      // sessionId, // removed until needed
      selectedEndpoint,
      streamResponse,
      selectedAgent,
      setStreamingError
      // userId, isMonitoring, setSessionId, setStreamingError, setHistoryData are removed/commented
    ]
  )

  return { handleStreamResponse }
}

export default useAIChatStreamHandler
