'use client'

import { type FC, useMemo, useRef, useEffect, useState } from 'react'

import { PARAGRAPH_SIZES } from '@/components/ui/typography/Paragraph/constants'
import { cn } from '@/utils/cn'

import { BORDER_RADIUS } from './constants'
import { type CodeProps } from './types'
import { formatCode, formatNestedObject, parseCode } from './utils'

import CopyButton from '../CopyButton'

const Code: FC<CodeProps> = ({
  children,
  useBackground = true,
  className: classNameProp,
  fontSize = 'default',
  copyButton = false,
  textFont,
  classNameCodeBlock,
  formatAsNestedObject = false
}) => {
  const [HTML, setHTML] = useState('')

  const codeRef = useRef<HTMLElement>(null)

  const parsedCode = useMemo(() => parseCode(children), [children])
  let renderedCode

  if (typeof parsedCode === 'object' && parsedCode != null) {
    if (formatAsNestedObject) {
      renderedCode = formatNestedObject(parsedCode)
    } else {
      renderedCode = formatCode(parsedCode)
    }
  } else {
    renderedCode = String(parsedCode)
  }

  const className = cn(
    'w-full whitespace-pre-wrap leading-relaxed break-words overflow-x-auto rounded-none',
    useBackground && BORDER_RADIUS,
    useBackground && 'bg-secondary/50 p-2.5',
    fontSize === 'default' ? 'text-xs' : fontSize,

    classNameProp
  )

  useEffect(() => {
    const currentHTML = codeRef?.current?.textContent
    setHTML(currentHTML ?? '')
  }, [children])

  return (
    <div className={cn('group relative overflow-hidden', BORDER_RADIUS)}>
      <pre
        className={cn(
          className,
          'relative rounded-md p-4',
          copyButton && 'w-full'
        )}
      >
        <code
          ref={codeRef}
          className={cn(
            'w-[90%] pr-8',
            PARAGRAPH_SIZES.body,
            textFont && textFont,
            classNameCodeBlock && classNameCodeBlock
          )}
        >
          {renderedCode}
        </code>
        {HTML && copyButton && (
          <CopyButton text={HTML} className="absolute right-2 top-2" />
        )}
      </pre>
    </div>
  )
}

export default Code
