"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps extends HTMLMotionProps<"div"> {
    hover?: boolean;
}

export const Card = ({ className, children, hover = true, ...props }: CardProps) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" } : {}}
            className={cn(
                "glass-card rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group",
                hover && "hover:border-primary/50",
                className
            )}
            {...props}
        >
            {/* Background glow effect on group hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {children as React.ReactNode}
        </motion.div>
    );
};
