import React, { Fragment } from "react"
import { cn } from "@/libs/cn"
import { NavItem } from "@/components/core"
import { appRoutes } from "@/constants/routes"

interface SidebarProps {
    showSidebar: boolean;
    close: () => void;
}

const SidebarContent: React.FC<SidebarProps> = ({ close }) => {
    return (
        <Fragment>
            <div className="grid gap-8">
                <img src="/toch_logo_light.svg" className="w-32 h-7" alt="toch_logo_light" />
                <div className="flex flex-1 flex-col gap-2 overflow-y-auto [&>[data-slot=section]+[data-slot=section]]:mt-6">
                    {
                        appRoutes.map((route) => 
                            <NavItem key={route.name} close={close} {...route} />
                        )
                    }
                </div>
            </div>
        </Fragment>
    )
}

export const Sidebar: React.FC<SidebarProps> = ({ close, showSidebar }) => {
    return (
        <Fragment>
            <nav className={cn("bg-accent-2 hidden xl:flex flex-col gap-8 px-5 py-6 h-screen max-h-screen w-full max-w-60 xl:fixed inset-y-0 z-20 overflow-y-scroll scrollbar-hide justify-between left-0 border-r border-r-grey-dark-3 transition transform ease-out duration-500")}>
                <SidebarContent showSidebar={showSidebar} close={close} />
            </nav>
            <nav className={cn("bg-accent-2 flex xl:hidden flex-col gap-8 px-5 py-6 h-screen max-h-screen w-full max-w-60 absolute xl:relative inset-y-0 z-20 overflow-y-scroll scrollbar-hide justify-between left-0 border-r border-r-grey-dark-3 transition transform ease-out duration-500", showSidebar ? "translate-x-0" : "-translate-x-full")}>
                <SidebarContent showSidebar={showSidebar} close={close} />
            </nav>
        </Fragment>
    );
};