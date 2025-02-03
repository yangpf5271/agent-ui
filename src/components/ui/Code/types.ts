import { type ReactNode } from 'react'

import { type Metrics } from '@/types/Agent'

export type Code = string | object | ReactNode | Metrics

export interface CodeProps {
  children: Code
  useBackground?: boolean
  className?: string
  fontSize?: 'default' | 'lg'
  copyButton?: boolean
  textFont?: string
  formatAsNestedObject?: boolean
  classNameCodeBlock?: string
}
