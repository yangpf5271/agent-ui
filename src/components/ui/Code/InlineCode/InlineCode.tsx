import { type FC } from 'react'

import { cn } from '@/utils/cn'

import { type InlineCodeProps } from './types'

const InlineCode: FC<InlineCodeProps> = ({ children, size = 'md' }) => (
  <code
    className={cn(
      'inline-block w-fit rounded-sm bg-secondary px-2 py-1 font-dmmono uppercase',
      size === 'xs' && 'text-xs',
      size === 'sm' && 'text-sm',
      size === 'md' && 'text-base'
    )}
  >
    {children}
  </code>
)

export default InlineCode
