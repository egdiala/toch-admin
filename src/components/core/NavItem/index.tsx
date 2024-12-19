import React from "react";
import { cn } from "@/libs/cn";
import { RenderIf } from "../RenderIf";
import { Icon, type IconifyIcon } from "@iconify/react";
import { NavLink } from "react-router";
import "./navItem.css"

interface NavItemProps {
  /**
   * URL to route to
   */
  to: string;
  /**
   * Name of the page to route to
   */
  name: string;
  /**
   * Icon for route
   */
  icon: string | IconifyIcon;
  /**
   * Number count
   */
  count?: string | number;
  /**
   * Number count
   */
  close?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ count, icon, name, to }) => {
    return (
        <NavLink to={to}>
            {({ isActive }) => (
                <div className={cn("z-toch-module-list-item group", isActive ? "z-toch-module-list-item--active" : "z-toch-module-list-item--inactive")}>
                    <Icon icon={icon} className={cn("size-5 transition-all duration-300 ease-out", isActive ? "text-accent-tertiary group-hover:text-accent-tertiary" : "text-white group-hover:text-white")} />
                    <span className={cn("flex-1 line-clamp-1", !icon ? "pl-5" : "")}>{name}</span>
                    <RenderIf condition={!!count}>
                        <div className='bg-semantics-error py-0.5 px-1.5 rounded-3xl text-white font-medium text-[0.625rem]/3'>{count}</div>
                    </RenderIf>
                </div>
            )}
        </NavLink>
    )
}