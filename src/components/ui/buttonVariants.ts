import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-md font-medium select-none',
    'transition-colors transition-transform outline-none',
    'focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-neutral-900 text-white hover:bg-neutral-800',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
        outline: 'border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100',
        ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
