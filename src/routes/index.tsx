import { ReactNode } from "react";
import { AuthRoutes } from "./modules";
import { DashboardPage } from "@/pages";
import AuthLayout from "@/layouts/auth-layout";
import { AnimatePresence } from "motion/react";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Routes, Route, BrowserRouter } from "react-router";


function LocationProvider({ children }: { children: ReactNode }) {
    return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardLayout><LocationProvider><DashboardPage /></LocationProvider></DashboardLayout>} />
                <Route path="auth/*" element={<AuthLayout><LocationProvider><AuthRoutes /></LocationProvider></AuthLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;