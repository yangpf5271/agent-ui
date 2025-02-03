import { type FC } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

import { cn } from '@/utils/cn'

import { inlineComponents } from './inlineStyles'
import { components } from './styles'
import { type MarkdownRendererProps } from './types'

const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  classname,
  inline = false
}) => (
  <ReactMarkdown
    className={cn(
      'prose prose-h1:text-xl dark:prose-invert flex w-full flex-col gap-y-5 rounded-lg',
      classname
    )}
    components={inline ? inlineComponents : components}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw, rehypeSanitize]}
  >
    {children}
  </ReactMarkdown>
)

export default MarkdownRenderer
