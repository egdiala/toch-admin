// import { isAuthenticated } from "@/utils/authUtil";
import type { PropsWithChildren } from "react";
// import { Navigate } from "react-router";

const AuthLayout = ({ children }: PropsWithChildren) => {
    // const isLoggedIn = isAuthenticated();

    // if (isLoggedIn) {
    //     return <Navigate to='/' replace />;
    // }
  
    return (
        <div className='w-full h-screen overflow-hidden bg-green-brand'>
            <div className="flex items-center justify-center w-full h-full px-4 lg:px-0">
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;