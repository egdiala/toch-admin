import React, { useMemo, type ReactNode } from "react";
import { cn } from "@/libs/cn";
import { Loader } from "./Loader";
import { AnimatePresence, motion } from "motion/react";
import "./button.css";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Shows a loading state on Button component
   */
  loading?: boolean;
  /**
   * Should the button fill it's parent container?
   */
  block?: boolean;
  /**
   * What variant to render
   */
  theme?: "primary" | "secondary" | "tertiary" | "outline" | "ghost";
  /**
   * Renders child nodes passed into Button component
   */
  children?: string | ReactNode;
  /**
   * Other unknown attributes
   */
  [key: PropertyKey]: unknown;
}

/**
 * Button component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({ className, loading, block, theme = "primary", children, ...props }) => {

    const buttonState = useMemo(() => {
        return loading ? "loading" : "idle"
    }, [loading]);

    const btn = {
        themes: {
            primary: "z-touch-button--primary",
            secondary: "z-touch-button--secondary",
            tertiary: "z-touch-button--tertiary",
            outline: "z-touch-button--outline",
            ghost: "z-touch-button--ghost",
        },
    };

    const width = block && "z-touch-button--block";

    const buttonCopy = {
        idle: children,
        loading: <Loader className="spinner" />
    };
  
    return (
        <button className={cn("w-fit", "z-touch-button", btn.themes[theme as keyof typeof btn.themes], width, className)} {...props}>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 25 }}
                    key={buttonState}
                    className={cn(loading ? "py-1" : "")}
                >
                    {buttonCopy[buttonState]}
                </motion.span>
            </AnimatePresence>
        </button>
    );
};