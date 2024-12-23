import { Link } from "react-router"
import { motion } from "motion/react"
import { Button } from "@/components/core"
import { InputField } from "@/components/core/Input"
import { forgotPasswordSchema } from "@/validations/auth"
import { routeVariants } from "@/constants/animateVariants"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { useSendResetPasswordEmail } from "@/services/hooks/mutations"

export const ForgotPasswordPage = () => {
    const { mutate: sendEmail, isPending } = useSendResetPasswordEmail()

    const sendEmailForm = useFormikWrapper({
        initialValues: {
            email: ""
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: () => {
            sendEmail(sendEmailForm.values)
        }
    })
    
    return (
        <motion.form onSubmit={sendEmailForm.handleSubmit} initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-7 justify-items-center py-6 md:py-8 px-5 md:px-12 bg-white w-full rounded-xl max-w-[28.8125rem]">
            <img src="/toch_logo_dark.svg" alt="toch_logo_dark" width="auto" />
            <div className="grid gap-2 text-center">
                <h1 className="text-green-0 text-3xl font-extrabold">Forgot Password</h1>
                <p className="text-sm text-grey-dark-2">Enter the email address associated with your account.</p>
            </div>
            <div className="flex flex-col w-full gap-6 pb-6">
                <InputField label="Email" type="text" placeholder="Enter your email" iconLeft="lucide:mail" {...sendEmailForm.register("email")} />
            </div>
            <Button type="submit" disabled={!sendEmailForm.isValid || isPending} loading={isPending} block>Verify Email</Button>
            <Link to="/auth/login" className="text-green-brand font-medium text-lg underline underline-offset-1">Sign in instead</Link>
        </motion.form>
    )
}