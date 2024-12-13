import { Fragment, useState } from "react"
import { Link } from "react-router"
import { Button } from "@/components/core"
import { AnimatePresence, motion } from "motion/react"
import { routeVariants } from "@/constants/animateVariants"
import { InputField, PasswordInput } from "@/components/core/Input"

export const LoginPage = () => {
    const [step] = useState("login")
    
    return (
        <Fragment>
            <AnimatePresence mode="popLayout">
                {
                    step === "login" ? (
                        <motion.form initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 justify-items-center py-8 px-12 bg-white w-full rounded-xl max-w-[28.8125rem]">
                            <h1 className="text-green-0 text-3xl font-extrabold">Sign in</h1>
                            <div className="flex flex-col w-full gap-6 pb-6">
                                <InputField label="Email" type="text" placeholder="Enter your email" iconLeft="lucide:mail" />
                                <PasswordInput label="Password" placeholder="Enter your password" iconLeft="lucide:lock" showPassword />
                            </div>
                            <Button type="button" block>Sign in</Button>
                            <Link to="/auth/forgot-password" className="text-green-brand font-medium text-lg underline underline-offset-1">Reset Password</Link>
                        </motion.form>
                    ) : null
                }
            </AnimatePresence>
        </Fragment>
    )
}