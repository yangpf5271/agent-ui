import type { ChatMessage } from '@/types/os'

import { AgentMessage, UserMessage } from './MessageItem'
import Tooltip from '@/components/ui/tooltip'
import { memo, useState } from 'react'
import {
  ToolCallProps,
  ReasoningStepProps,
  ReasoningProps,
  ReferenceData,
  Reference,
  ToolCall
} from '@/types/os'
import React, { type FC } from 'react'

import Icon from '@/components/ui/icon'
import ChatBlankState from './ChatBlankState'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'

interface MessageListProps {
  messages: ChatMessage[]
}

interface MessageWrapperProps {
  message: ChatMessage
  isLastMessage: boolean
}

interface ReferenceProps {
  references: ReferenceData[]
}

interface ReferenceItemProps {
  reference: Reference
}

const ReferenceItem: FC<ReferenceItemProps> = ({ reference }) => (
  <div className="relative flex h-[63px] w-[190px] cursor-default flex-col justify-between overflow-hidden rounded-md bg-background-secondary p-3 transition-colors hover:bg-background-secondary/80">
    <p className="text-sm font-medium text-primary">{reference.name}</p>
    <p className="truncate text-xs text-primary/40">{reference.content}</p>
  </div>
)

const References: FC<ReferenceProps> = ({ references }) => (
  <div className="flex flex-col gap-4">
    {references.map((referenceData, index) => (
      <div
        key={`${referenceData.query}-${index}`}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-wrap gap-3">
          {referenceData.references.map((reference, refIndex) => (
            <ReferenceItem
              key={`${reference.name}-${reference.meta_data.chunk}-${refIndex}`}
              reference={reference}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
)

const AgentMessageWrapper = ({ message, onShowToolDialog }: MessageWrapperProps & { onShowToolDialog: (toolCall: ToolCall) => void }) => {
  return (
    <div className="flex flex-col gap-y-9">
      {message.extra_data?.reasoning_steps &&
        message.extra_data.reasoning_steps.length > 0 && (
          <div className="flex items-start gap-4">
            <Tooltip
              delayDuration={0}
              content={<p className="text-accent">Reasoning</p>}
              side="top"
            >
              <Icon type="reasoning" size="sm" />
            </Tooltip>
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase">Reasoning</p>
              <Reasonings reasoning={message.extra_data.reasoning_steps} />
            </div>
          </div>
        )}
      {message.extra_data?.references &&
        message.extra_data.references.length > 0 && (
          <div className="flex items-start gap-4">
            <Tooltip
              delayDuration={0}
              content={<p className="text-accent">References</p>}
              side="top"
            >
              <Icon type="references" size="sm" />
            </Tooltip>
            <div className="flex flex-col gap-3">
              <References references={message.extra_data.references} />
            </div>
          </div>
        )}
      {message.tool_calls && message.tool_calls.length > 0 && (
        <div className="flex items-start gap-3">
          <Tooltip
            delayDuration={0}
            content={<p className="text-accent">Tool Calls</p>}
            side="top"
          >
            <Icon
              type="hammer"
              className="rounded-lg bg-background-secondary p-1"
              size="sm"
              color="secondary"
            />
          </Tooltip>

          <div className="flex flex-wrap gap-2">
            {message.tool_calls.map((toolCall, index) => (
              <ToolComponent
                key={
                  toolCall.tool_call_id ||
                  `${toolCall.tool_name}-${toolCall.created_at}-${index}`
                }
                tools={toolCall}
                onShowDialog={onShowToolDialog}
              />
            ))}
          </div>
        </div>
      )}
      <AgentMessage message={message} />
    </div>
  )
}
const Reasoning: FC<ReasoningStepProps> = ({ index, stepTitle }) => (
  <div className="flex items-center gap-2 text-secondary">
    <div className="flex h-[20px] items-center rounded-md bg-background-secondary p-2">
      <p className="text-xs">STEP {index + 1}</p>
    </div>
    <p className="text-xs">{stepTitle}</p>
  </div>
)
const Reasonings: FC<ReasoningProps> = ({ reasoning }) => (
  <div className="flex flex-col items-start justify-center gap-2">
    {reasoning.map((title, index) => (
      <Reasoning
        key={`${title.title}-${title.action}-${index}`}
        stepTitle={title.title}
        index={index}
      />
    ))}
  </div>
)
// 工具调用详情弹框组件
interface ToolDialogProps {
  isOpen: boolean
  onClose: () => void
  toolCall: ToolCall
}

const ToolDialog: FC<ToolDialogProps> = ({ isOpen, onClose, toolCall }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="font-geist max-w-[600px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Icon type="hammer" size="sm" />
          工具调用详情
        </DialogTitle>
        <DialogDescription>
          查看工具调用的详细信息
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {/* 工具名称 */}
        <div>
          <h4 className="text-sm font-medium text-primary mb-2">工具名称</h4>
          <div className="rounded-md bg-background-secondary p-3">
            <code className="text-sm font-mono text-accent">{toolCall.tool_name}</code>
          </div>
        </div>

        {/* 工具参数 */}
        <div>
          <h4 className="text-sm font-medium text-primary mb-2">工具参数</h4>
          <div className="rounded-md bg-background-secondary p-3 max-h-[200px] overflow-auto">
            <pre className="text-sm font-mono text-primary whitespace-pre-wrap">
              {JSON.stringify(toolCall.tool_args, null, 2)}
            </pre>
          </div>
        </div>

        {/* 执行结果 */}
        {toolCall.content && (
          <div>
            <h4 className="text-sm font-medium text-primary mb-2">执行结果</h4>
            <div className="rounded-md bg-background-secondary p-3 max-h-[300px] overflow-auto">
              <p className="text-sm text-primary whitespace-pre-wrap">
                {toolCall.content}
              </p>
            </div>
          </div>
        )}

        {/* 执行状态和指标 */}
        <div className="flex justify-between items-center text-sm text-secondary">
          <div className="flex items-center gap-2">
            <span>状态:</span>
            <span className={`px-2 py-1 rounded text-xs ${
              toolCall.tool_call_error
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {toolCall.tool_call_error ? '执行失败' : '执行成功'}
            </span>
          </div>
          {toolCall.metrics?.time && (
            <div>
              执行时间: {toolCall.metrics.time}ms
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  </Dialog>
)

const ToolComponent = memo(({ tools, onShowDialog }: ToolCallProps & { onShowDialog: (toolCall: ToolCall) => void }) => (
  <div
    className="cursor-pointer rounded-full bg-accent px-2 py-1.5 text-xs hover:bg-accent/80 transition-colors"
    onClick={() => onShowDialog(tools)}
  >
    <p className="font-dmmono uppercase text-primary/80">{tools.tool_name}</p>
  </div>
))
ToolComponent.displayName = 'ToolComponent'
const Messages = ({ messages }: MessageListProps) => {
  const [selectedToolCall, setSelectedToolCall] = useState<ToolCall | null>(null)
  const [isToolDialogOpen, setIsToolDialogOpen] = useState(false)

  const handleShowToolDialog = (toolCall: ToolCall) => {
    setSelectedToolCall(toolCall)
    setIsToolDialogOpen(true)
  }

  const handleCloseToolDialog = () => {
    setIsToolDialogOpen(false)
    setSelectedToolCall(null)
  }

  if (messages.length === 0) {
    return <ChatBlankState />
  }

  return (
    <>
      {messages.map((message, index) => {
        const key = `${message.role}-${message.created_at}-${index}`
        const isLastMessage = index === messages.length - 1

        if (message.role === 'agent') {
          return (
            <AgentMessageWrapper
              key={key}
              message={message}
              isLastMessage={isLastMessage}
              onShowToolDialog={handleShowToolDialog}
            />
          )
        }
        return <UserMessage key={key} message={message} />
      })}

      {/* 工具调用详情弹框 */}
      {selectedToolCall && (
        <ToolDialog
          isOpen={isToolDialogOpen}
          onClose={handleCloseToolDialog}
          toolCall={selectedToolCall}
        />
      )}
    </>
  )
}

export default Messages
