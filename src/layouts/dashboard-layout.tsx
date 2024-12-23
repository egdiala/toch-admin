import { Header } from "@/components/shared";
import { Sidebar } from "@/components/shared/Sidebar";
import { isAuthenticated } from "@/utils/authUtil";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type PropsWithChildren } from "react";
import { Navigate } from "react-router";

const DashboardLayout = ({ children }: PropsWithChildren) => {
    const isLoggedIn = isAuthenticated();
    const [showSidebar, setShowSidebar] = useState(false)
    
    useEffect(() => {
        if (showSidebar) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "scroll"
        }
    }, [showSidebar])
    
    if (!isLoggedIn) {
        localStorage.clear();
        return <Navigate to="/auth/login" replace />;
    }


  
    return (
        <motion.div className="relative bg-white isolate flex min-h-dvh w-full overflow-hidden">
            <Sidebar showSidebar={showSidebar} close={() => setShowSidebar(false)} />
                <div className="relative h-full flex-1 flex flex-col xl:pl-60">
                    <Header close={() => setShowSidebar(!showSidebar)} />
                    <main className="flex-1 overflow-hidden">
                        {children}
                        <AnimatePresence mode="wait">
                            {
                                showSidebar && (
                                    <motion.div initial={{ display: "none", opacity: 0 }} animate={{ display: "grid", position: "fixed", opacity: 1 }} exit={{ display: "none", opacity: 0 }} transition={{ ease: "easeOut", duration: 0.5 }} className="overflow-hidden bg-gray-100/25 top-0 left-0 right-0 bottom-0 inset-0 z-10" onClick={() => setShowSidebar(false)} />
                                )
                            }
                        </AnimatePresence>
                    </main>
                </div>
        </motion.div>
    );
};

export default DashboardLayout;