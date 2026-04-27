import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

type SPTrigger = typeof SelectPrimitive.Trigger
type SPContent = typeof SelectPrimitive.Content
type SPItem = typeof SelectPrimitive.Item
type SPLabel = typeof SelectPrimitive.Label
type SPSeparator = typeof SelectPrimitive.Separator

const Select = SelectPrimitive.Root
const SelectGroup = SelectPrimitive.Group
const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ComponentRef<SPTrigger>,
  React.ComponentPropsWithoutRef<SPTrigger>
>(function SelectTrigger({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-neutral-300 bg-white px-3 py-2',
        'text-sm text-neutral-900 placeholder:text-neutral-400',
        'focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-1',
        'disabled:cursor-not-allowed disabled:opacity-50',
        '[&>span]:line-clamp-1',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 text-neutral-500" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})

const SelectContent = React.forwardRef<
  React.ComponentRef<SPContent>,
  React.ComponentPropsWithoutRef<SPContent>
>(function SelectContent({ className, children, position = 'popper', ...props }, ref) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          'relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white shadow-lg',
          'data-[state=open]:animate-scale-in data-[state=closed]:animate-scale-out',
          position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})

const SelectItem = React.forwardRef<
  React.ComponentRef<SPItem>,
  React.ComponentPropsWithoutRef<SPItem>
>(function SelectItem({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2',
        'text-sm text-neutral-900 outline-none',
        'focus:bg-neutral-100 focus:text-neutral-900',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})

const SelectLabel = React.forwardRef<
  React.ComponentRef<SPLabel>,
  React.ComponentPropsWithoutRef<SPLabel>
>(function SelectLabel({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn('py-1.5 pl-8 pr-2 text-xs font-semibold text-neutral-500', className)}
      {...props}
    />
  )
})

const SelectSeparator = React.forwardRef<
  React.ComponentRef<SPSeparator>,
  React.ComponentPropsWithoutRef<SPSeparator>
>(function SelectSeparator({ className, ...props }, ref) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-neutral-100', className)}
      {...props}
    />
  )
})

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}
