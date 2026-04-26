import * as React from 'react'
import { cn } from '@/lib/cn'

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default:     'bg-neutral-900 text-white border-transparent',
  secondary:   'bg-neutral-100 text-neutral-800 border-transparent',
  destructive: 'bg-red-500 text-white border-transparent',
  outline:     'bg-transparent text-neutral-900 border-neutral-300',
  success:     'bg-emerald-100 text-emerald-800 border-transparent',
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5',
        'text-xs font-semibold transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  )
}
