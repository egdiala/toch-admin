import { Link } from "react-router"
import { motion } from "motion/react"
import { Button } from "@/components/core"
import { PasswordInput } from "@/components/core/Input"
import { routeVariants } from "@/constants/animateVariants"

export const ResetPasswordPage = () => {

    return (
        <motion.form initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 justify-items-center py-6 md:py-8 px-5 md:px-12 bg-white w-full rounded-xl max-w-[28.8125rem]">
            <img src="/toch_logo_dark.svg" alt="toch_logo_dark" width="auto" />
            <div className="grid gap-2 text-center">
                <h1 className="text-green-0 text-3xl font-extrabold">Enter New Password</h1>
                <p className="text-sm text-grey-dark-2">Please enter your new password for your account.</p>
            </div>
            <div className="flex flex-col w-full gap-6 pb-6">
                <PasswordInput label="New Password" placeholder="Enter your new password" iconLeft="lucide:lock" showPassword />
                <PasswordInput label="Confirm New Password" placeholder="Re-enter your new password" iconLeft="lucide:lock" showPassword />
            </div>
            <Button type="button" block>Update Password</Button>
            <Link to="/auth/login" className="text-green-brand font-medium text-lg underline underline-offset-1">Sign in instead</Link>
        </motion.form>
    )
}