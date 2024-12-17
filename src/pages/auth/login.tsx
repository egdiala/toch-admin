import { Fragment, useState } from "react"
import { Link } from "react-router"
import { Button } from "@/components/core"
import { loginSchema } from "@/validations/auth"
import { useLogin } from "@/services/hooks/mutations"
import { AnimatePresence, motion } from "motion/react"
import verifiedMark from "@/assets/verified_mark_3d.gif"
import { routeVariants } from "@/constants/animateVariants"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { InputField, PasswordInput } from "@/components/core/Input"

export const LoginPage = () => {
    const [step, setStep] = useState("login")
    const { mutate: login, isPending } = useLogin()

    const loginForm = useFormikWrapper({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: () => {
            login(loginForm.values)
        }
    })
    
    return (
        <Fragment>
            <AnimatePresence mode="popLayout">
                {
                    step === "login" ? (
                        <motion.form onSubmit={loginForm.handleSubmit} initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 justify-items-center py-6 md:py-8 px-5 md:px-12 bg-white w-full rounded-xl max-w-[28.8125rem]">
                            <img src="/toch_logo_dark.svg" alt="toch_logo_dark" width="auto" />
                            <h1 className="text-green-0 text-3xl font-extrabold">Sign in</h1>
                            <div className="flex flex-col w-full gap-6 pb-6">
                                <InputField id="email" label="Email" type="text" placeholder="Enter your email" iconLeft="lucide:mail" {...loginForm.register("email")} />
                                <PasswordInput id="password" label="Password" placeholder="Enter your password" iconLeft="lucide:lock" showPassword {...loginForm.register("password")} />
                            </div>
                            <Button type="submit" loading={isPending} disabled={!loginForm.isValid || isPending} block>Sign in</Button>
                            <Link to="/auth/forgot-password" className="text-green-brand font-medium text-lg underline underline-offset-1">Reset Password</Link>
                        </motion.form>
                    ) : null
                }
            </AnimatePresence>
            <AnimatePresence mode="popLayout">
                {
                    step === "change-password" ? (
                        <motion.form initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-6 justify-items-center py-6 md:py-8 px-5 md:px-12 bg-white w-full rounded-xl max-w-[28.8125rem]">
                            <img src="/toch_logo_dark.svg" alt="toch_logo_dark" width="auto" />
                            <div className="grid gap-2 text-center">
                                <h1 className="text-green-0 text-3xl font-extrabold">Change your password</h1>
                                <p className="text-sm text-grey-dark-2">Please change your default password to a new one.</p>
                            </div>
                            <div className="flex flex-col w-full gap-6 pb-6">
                                <PasswordInput label="Password" placeholder="Enter your password" iconLeft="lucide:lock" showPassword />
                                <PasswordInput label="Confirm New Password" placeholder="Re-enter your password" iconLeft="lucide:lock" showPassword />
                            </div>
                            <Button type="button" onClick={() => setStep("success")} block>Change Password</Button>
                        </motion.form>
                    ) : null
                }
            </AnimatePresence>
            <AnimatePresence mode="popLayout">
                {
                    step === "success" ? (
                        <motion.form initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-8 justify-items-center py-6 md:py-8 px-5 md:px-12 bg-white w-full rounded-xl max-w-[28.8125rem]">
                            <img src={verifiedMark} alt="verified" width={92} height={92} />
                            <div className="grid gap-2 text-center">
                                <h1 className="text-green-0 text-3xl font-extrabold">Good Job</h1>
                                <p className="text-sm text-grey-dark-2">You have successfully changed your password. Kindly sign in to your account.</p>
                            </div>
                            <Button type="button" onClick={() => setStep("login")} block>Sign in with New Password</Button>
                        </motion.form>
                    ) : null
                }
            </AnimatePresence>
        </Fragment>
    )
}