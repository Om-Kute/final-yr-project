"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

// --- GlassCard ---
export const GlassCard = ({ children, className = "", glowColor = "rgba(59, 130, 246, 0.1)" }: { children: React.ReactNode, className?: string, glowColor?: string }) => {
    return (
        <div className={`group relative overflow-hidden rounded-3xl bg-white/[0.01] border border-white/[0.05] backdrop-blur-3xl p-8 transition-all duration-700 hover:border-white/[0.1] hover:bg-white/[0.02] ${className}`}>
            <div
                className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), ${glowColor}, transparent 40%)`
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
};

// --- MagneticButton ---
export const MagneticButton = ({ children, className = "", variant = "primary", onClick, disabled }: { children: React.ReactNode, className?: string, variant?: "primary" | "secondary", onClick?: () => void, disabled?: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);
    const position = { x: useMotionValue(0), y: useMotionValue(0) };
    const springX = useSpring(position.x, { stiffness: 150, damping: 15 });
    const springY = useSpring(position.y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        position.x.set(x * 0.3);
        position.y.set(y * 0.3);
    };

    const handleMouseLeave = () => {
        position.x.set(0);
        position.y.set(0);
    };

    const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-white text-black hover:bg-white/90 shadow-[0_0_30px_rgba(255,255,255,0.1)]",
        secondary: "bg-white/[0.03] border border-white/[0.05] text-white backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/[0.1]"
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
        >
            <button
                onClick={onClick}
                disabled={disabled}
                className={`${baseStyles} ${variants[variant]} ${className}`}
            >
                {children}
            </button>
        </motion.div>
    );
};

// --- TextGradient ---
export const TextGradient = ({ children, className = "", variant = "primary" }: { children: React.ReactNode, className?: string, variant?: "primary" | "secondary" }) => {
    const gradients = {
        primary: "from-primary via-secondary to-accent",
        secondary: "from-emerald-400 via-cyan-400 to-blue-500"
    };
    return (
        <span className={`bg-clip-text text-transparent bg-gradient-to-r ${gradients[variant]} animate-gradient-x ${className}`}>
            {children}
        </span>
    );
};

// --- Background Mesh ---
export const BackgroundMesh = () => {
    return (
        <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden bg-[#050816]">
            <div className="absolute top-0 left-0 w-full h-full bg-mesh-gradient opacity-30" />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary blur-[160px] rounded-full"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-secondary blur-[160px] rounded-full"
            />
        </div>
    );
};
