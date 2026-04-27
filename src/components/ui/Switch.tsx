import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/cn'

type SwitchRoot = typeof SwitchPrimitive.Root
type SwitchRef = React.ComponentRef<SwitchRoot>
type SwitchProps = React.ComponentPropsWithoutRef<SwitchRoot>

export const Switch = React.forwardRef<SwitchRef, SwitchProps>(function Switch(
  { className, ...props },
  ref,
) {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(
        'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
        'bg-neutral-300 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-neutral-900',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0',
          'transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        )}
      />
    </SwitchPrimitive.Root>
  )
})
