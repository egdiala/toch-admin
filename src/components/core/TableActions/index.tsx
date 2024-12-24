import React, { forwardRef, type ReactNode } from "react";
import { cn } from "@/libs/cn";
import "./tableAction.css"
import "./../Button/button.css";

interface TableActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Should the button fill it's parent container?
   */
  block?: boolean;
  /**
   * What variant to render
   */
  theme?: "primary" | "secondary" | "tertiary" | "grey" | "ghost";
  /**
   * Renders child nodes passed into Button component
   */
  children?: string | ReactNode;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: any;
}

/**
 * Table Action component for user interaction
 */
export const TableAction: React.FC<TableActionProps> = forwardRef(({
  className,
  block,
  theme,
  children,
  ...props
}, ref: React.LegacyRef<HTMLButtonElement>) => {
  const btn = {
    themes: {
      primary: "z-touch-table-action--primary",
      secondary: "z-touch-table-action--secondary",
      tertiary: "z-touch-table-action--tertiary",
      grey: "z-touch-table-action--grey",
      ghost: "z-touch-table-action--ghost",
    },
  };

  const width = block && "z-touch-button--block";
  
  return (
    <button className={cn("w-fit", "z-touch-button", btn.themes[theme as keyof typeof btn.themes], width, className)} ref={ref} {...props}>
{       children}
    </button>
  );
});