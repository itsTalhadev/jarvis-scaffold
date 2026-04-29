/**
 * react-hook-form + Radix Label integration.
 *
 * Usage:
 * ```tsx
 * import { useForm } from 'react-hook-form'
 * import { zodResolver } from '@hookform/resolvers/zod'
 * import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/Form'
 *
 * const form = useForm({ resolver: zodResolver(schema) })
 *
 * <Form {...form}>
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     <FormField
 *       control={form.control}
 *       name="email"
 *       render={({ field }) => (
 *         <FormItem>
 *           <FormLabel>Email</FormLabel>
 *           <FormControl><Input {...field} /></FormControl>
 *           <FormMessage />
 *         </FormItem>
 *       )}
 *     />
 *   </form>
 * </Form>
 * ```
 */
import * as React from 'react'
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'
import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/cn'

type FormLabelRoot = typeof LabelPrimitive.Root
type FormLabelRef = React.ComponentRef<FormLabelRoot>
type FormLabelProps = React.ComponentPropsWithoutRef<FormLabelRoot>

type SlotRoot = typeof Slot
type FormControlSlotRef = React.ComponentRef<SlotRoot>
type FormControlSlotProps = React.ComponentPropsWithoutRef<SlotRoot>

// ── Form root ─────────────────────────────────────────────────────
const Form = FormProvider

// ── FormField context ─────────────────────────────────────────────
type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = { name: TName }

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
)

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext  = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext.name) {
    throw new Error('useFormField must be used within <FormField>')
  }

  const { id } = itemContext
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

// ── FormItem ──────────────────────────────────────────────────────
type FormItemContextValue = { id: string }
const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
)

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function FormItem({ className, ...props }, ref) {
    const id = React.useId()
    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props} />
      </FormItemContext.Provider>
    )
  },
)

// ── FormLabel ─────────────────────────────────────────────────────
const FormLabel = React.forwardRef<FormLabelRef, FormLabelProps>(function FormLabel(
  { className, ...props },
  ref,
) {
  const { error, formItemId } = useFormField()
  return (
    <LabelPrimitive.Root
      ref={ref}
      htmlFor={formItemId}
      className={cn(
        'text-sm font-medium leading-none text-neutral-700',
        error && 'text-red-600',
        className,
      )}
      {...props}
    />
  )
})

// ── FormControl ───────────────────────────────────────────────────
const FormControl = React.forwardRef<FormControlSlotRef, FormControlSlotProps>(
  function FormControl({ ...props }, ref) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={
          error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
        }
        aria-invalid={error ? true : undefined}
        {...props}
      />
    )
  },
)

// A thin wrapper that passes aria attrs to its child.
function FormControlSlot({
  children,
}: {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>
}) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  const attrs: React.HTMLAttributes<HTMLElement> = {
    id: formItemId,
    'aria-describedby': error
      ? `${formDescriptionId} ${formMessageId}`
      : formDescriptionId,
    'aria-invalid': !!error,
  }
  return React.cloneElement(children, attrs)
}

// ── FormDescription ───────────────────────────────────────────────
const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function FormDescription({ className, ...props }, ref) {
  const { formDescriptionId } = useFormField()
  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-xs text-neutral-500', className)}
      {...props}
    />
  )
})

// ── FormMessage ───────────────────────────────────────────────────
const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function FormMessage({ className, children, ...props }, ref) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message ?? error) : children
  if (!body) return null
  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-xs font-medium text-red-600', className)}
      {...props}
    >
      {body}
    </p>
  )
})

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormControlSlot,
  FormDescription,
  FormMessage,
  useFormField,
}
