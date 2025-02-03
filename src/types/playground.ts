
interface ModelMessage {
    content: string | null
    context?: MessageContext[]
    created_at: number
    metrics?: {
      time: number
      prompt_tokens: number
      input_tokens: number
      completion_tokens: number
      output_tokens: number
    }
    name: string | null
    role: string
    tool_args?: unknown
    tool_call_id: string | null
    tool_calls: Array<{
      function: {
        arguments: string
        name: string
      }
      id: string
      type: string
    }> | null
  }
  
  interface MessageContext {
    query: string
    docs?: Array<Record<string, object>>
    time?: number
  }

  export enum RunEvent {
    RunStarted = 'RunStarted',
    RunResponse = 'RunResponse',
    RunCompleted = 'RunCompleted',
    ToolCallStarted = 'ToolCallStarted',
    ToolCallCompleted = 'ToolCallCompleted',
    UpdatingMemory = 'UpdatingMemory',
    ReasoningStarted = 'ReasoningStarted',
    ReasoningStep = 'ReasoningStep',
    ReasoningCompleted = 'ReasoningCompleted'
  }

  export interface RunResponse {
    content?: string | object
    content_type: string
    context?: MessageContext[]
    event: RunEvent
    event_data?: object
    messages?: ModelMessage[]
    metrics?: object
    model?: string
    run_id?: string
    agent_id?: string
    session_id?: string
    created_at: number
  }
  
  export interface PlaygroundChatMessage {
    role: 'user' | 'agent' | 'system'
    content: string
    streamingError?: boolean
    created_at: number
  }

  export interface HistoryEntry {
    session_id: string
    title: string
    created_at: number
  }
  