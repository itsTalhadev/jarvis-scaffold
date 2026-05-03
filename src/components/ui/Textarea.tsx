import * as React from 'react'
import { cn } from '@/lib/cn'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-neutral-300 bg-white px-3 py-2',
          'text-sm text-neutral-900 placeholder:text-neutral-400',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'resize-vertical',
          className,
        )}
        {...props}
      />
    )
  },
)
