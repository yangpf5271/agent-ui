import { useCallback, useRef, useState, type FC } from 'react'

import Icon from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/utils/cn'

import { type CopyButtonProps } from './types'

const CopyButton: FC<CopyButtonProps> = ({
  text,
  className,
  colorIcon,
  variant = 'link'
}) => {
  const [hasRecentlyCopied, setHasRecentlyCopied] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      navigator.clipboard.writeText(text)
      setHasRecentlyCopied(true)
      setTimeout(() => {
        setHasRecentlyCopied(false)
        buttonRef.current?.blur()
      }, 1000)
    },
    [text]
  )

  return (
    <TooltipProvider>
      <Tooltip open={hasRecentlyCopied}>
        <TooltipTrigger asChild>
          <Button
            type="button"
            className={cn(
              'group/button relative z-[99] bg-transparent text-xs font-medium transition',
              className
            )}
            variant={variant}
            onClick={onClick}
            size="xs"
            ref={buttonRef}
          >
            <Icon type="copy" size="xs" color={colorIcon ?? 'primary/50'} />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          type="copy"
          sideOffset={variant === 'link' ? -15 : 2}
          alignOffset={variant === 'link' ? 15 : 0}
          align={variant === 'link' ? 'end' : 'center'}
          className="z-0"
        >
          Copied!
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CopyButton
