import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/cn'

type LabelRoot = typeof LabelPrimitive.Root
type LabelRef = React.ComponentRef<LabelRoot>
type LabelProps = React.ComponentPropsWithoutRef<LabelRoot>

export const Label = React.forwardRef<LabelRef, LabelProps>(function Label(
  { className, ...props },
  ref,
) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        'text-sm font-medium text-neutral-700 leading-none',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  )
})
