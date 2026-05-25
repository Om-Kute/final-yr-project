"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        const variants = {
            primary: "bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-lg glow-primary",
            secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10",
            outline: "bg-transparent border border-primary text-primary hover:bg-primary/10",
            ghost: "bg-transparent hover:bg-white/5 text-white",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-sm",
            md: "px-6 py-2.5 text-base",
            lg: "px-8 py-3.5 text-lg font-semibold",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "relative inline-flex items-center justify-center rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden",
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading ? (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : null}
                <span className="relative z-10">{children as React.ReactNode}</span>

                {/* Ripple effect overlay */}
                <motion.div
                    className="absolute inset-0 bg-white/20 opacity-0"
                    initial={false}
                    whileTap={{ opacity: 1, scale: 2 }}
                    transition={{ duration: 0.4 }}
                />
            </motion.button>
        );
    }
);

Button.displayName = "Button";
