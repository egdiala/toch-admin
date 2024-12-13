import { type FC, forwardRef, Fragment, type ReactNode } from "react"
import { cn } from "@/libs/cn"
import { RenderIf } from "@/components/core"
import { AnimatePresence, motion } from "motion/react"
import { Icon, type IconifyIcon } from "@iconify/react"
import { Description, Field, Input, Label } from "@headlessui/react"
import "./input.css"

interface InputProps extends React.AllHTMLAttributes<HTMLInputElement> {
  /**
   * Label for input element
   */
  label?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Helper text
   */
  help?: string | ReactNode;
  /**
   * Element to render
   */
  actionLabel?: ReactNode;
  /**
   * Optional input
   */
  optional?: boolean;
  /**
   * Whether or not the field is disabled.
   */
  disabled?: boolean;
  /**
   * When true, clicking the label won't focus the associated form control.
   */
  passive?: boolean;
  /**
   * Right icon to render
   */
  iconRight?: string;
  /**
   * Left icon to render
   */
  iconLeft?: string;
  /**
   * Other unknown attributes
   */
  [x: string]: unknown;
}


export const InputField: FC<InputProps> = forwardRef(({ label, error, optional, actionLabel, iconLeft, iconRight, className, help, disabled, passive, ...props }: InputProps, ref: React.Ref<HTMLInputElement>) => {
  return (
    <Field disabled={disabled} className="z-touch-input--outer">
      <RenderIf condition={!!label}>
        <div className={cn(actionLabel ? "justify-between" : "justify-start", "flex items-center")}>
          <div className="text-sm tracking-custom flex gap-px items-center">
            <Label passive={passive} className="z-touch-input--label">
              {label}
            </Label>
            {!!optional && (
              <span className="font-normal text-gray-500 text-sm">(Optional)</span>
            )}
          </div>
          {actionLabel}
        </div>
      </RenderIf>
      <div className="z-touch-input--inner">
        <RenderIf condition={!!iconLeft}>
          <Icon
            icon={iconLeft as string | IconifyIcon}
            className="size-5 left-3 text-grey-dark-2 peer-focus:text-green-0 mt-3.5 inset-x-0 absolute"
          />
        </RenderIf>
        <Input as={Fragment}>
          {() => <input ref={ref} className={cn("z-touch-input peer", iconLeft && `z-touch-input--left`, iconRight && `z-touch-input--right`, error ? "z-touch-input--border-error" : "z-touch-input--border", className)} {...props} /> }
        </Input>
        <RenderIf condition={!!iconRight}>
          <Icon
            icon={iconRight as string | IconifyIcon}
            className="size-5 right-3 text-grey-dark-2 peer-focus:text-green-0 -mt-[2.1rem] absolute"
          />
        </RenderIf>
      </div>
      <RenderIf condition={!!help}>
        <Description className="text-sm/6 text-neutral-90">{help}</Description>
      </RenderIf>
      <AnimatePresence>
        {
          error ? (
            <motion.span initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="z-touch-input--error">{error}</motion.span>
          ) : null
        }
      </AnimatePresence>
    </Field>
  )
})