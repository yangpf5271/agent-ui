export interface ToolCall {
    role: 'user' | 'tool' | 'system' | 'assistant'
    content: string | null
    tool_call_id: string
    tool_name: string
    tool_args: Record<string, string>
    tool_call_error: boolean
    metrics: {
      time: number
    }
    created_at: number
  }
  
  export type ToolCallProps = {
    tools: ToolCall
  }
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
    tools?: ToolCall[]
  }
  
  export interface PlaygroundChatMessage {
    role: 'user' | 'agent' | 'system' | 'tool'
    content: string
    streamingError?: boolean
    created_at: number
    tool_calls?: ToolCall[]
  }

  export interface HistoryEntry {
    session_id: string
    title: string
    created_at: number
  }

  export interface Model {
    name: string
    model: string
    provider: string
  }
  
  export interface Agent {
    agent_id: string
    name: string
    description: string
    created_at: string
    updated_at: string
    model: Model
    enable_rag: boolean
    // tools: Tool[]
    storage: Storage
    // knowledge: Knowledge
    memory: string | null
    instructions: string[] | null
  }