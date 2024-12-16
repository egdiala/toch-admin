import { Link } from "react-router"
import { motion } from "motion/react"
import { Button } from "@/components/core"
import { routeVariants } from "@/constants/animateVariants"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useEffect, useState } from "react"

export const VerifyEmailPage = () => {
    const [otp, setOtp] = useState<string>("");
    const [countdown, setCountdown] = useState<number>(120);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    useEffect(() => {
        let interval: any;
        if (isButtonDisabled) {
          interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
          }, 1000);
        }
    
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [isButtonDisabled]);
    
    useEffect(() => {
        if (countdown <= 0) {
          clearInterval(countdown);
          setIsButtonDisabled(false);
          setCountdown(60); // Reset countdown (optional if button is not disabled again)
        }
    }, [countdown]);

    const handleResendClick = () => {
        // sendOTP({ otp_request_id });
        setIsButtonDisabled(true);
        setCountdown(60); // Reset the timer
    };

    const formatCountdown = (countdown: number) => {
        const minutes = Math.floor(countdown / 60).toString().padStart(2, "0");
        const seconds = (countdown % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };
    
    return (
        <motion.form initial={routeVariants.initial} animate={routeVariants.final} exit={routeVariants.initial} className="grid gap-7 justify-items-center py-6 md:py-8 px-5 md:px-12 bg-white w-full rounded-xl max-w-[28.8125rem]">
            <img src="/toch_logo_dark.svg" alt="toch_logo_dark" width="auto" />
            <div className="grid gap-2 text-center">
                <h1 className="text-green-0 text-3xl font-extrabold">Verify Your Email</h1>
                <p className="text-sm text-grey-dark-2">Enter the 4 - digit code sent to John@gmail.com <br />
                    <Link to="/auth/forgot-password" className="text-green-brand font-medium underline underline-offset-1">Edit email address</Link>
                </p>
            </div>
            <div className="flex flex-col w-full gap-6 pb-6">
                <InputOTP maxLength={4} value={otp} onChange={setOtp} containerClassName="grid grid-cols-4 justify-items-center gap-2 md:gap-4">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="z-touch-otp-input" />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} className="z-touch-otp-input" />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} className="z-touch-otp-input" />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} className="z-touch-otp-input" />
                  </InputOTPGroup>
                </InputOTP>
                <div className="flex items-center justify-center text-grey-0 text-base">
                    Didn’t receive a code? { isButtonDisabled ? <>Resend in <span className="font-bold text-green-0">&nbsp;{formatCountdown(countdown)}</span></> : <button type="button" className="font-bold text-green-0 disabled:cursor-not-allowed" disabled={isButtonDisabled} onClick={handleResendClick}>&nbsp;Resend Now</button> }
                </div>
            </div>
            <Button type="button" block>Reset Password</Button>
            <Link to="/auth/login" className="text-green-brand font-medium text-lg underline underline-offset-1">Sign in instead</Link>
        </motion.form>
    )
}