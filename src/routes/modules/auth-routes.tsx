import { Routes, Route } from "react-router";
import { ForgotPasswordPage, LoginPage, ResetPasswordPage, VerifyEmailPage } from "@/pages/auth"

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="verify-email" element={<VerifyEmailPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
};

export default AuthRoutes;