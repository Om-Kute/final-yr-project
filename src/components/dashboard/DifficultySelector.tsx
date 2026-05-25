"use client";

import React from "react";
import { useProject } from "@/hooks/useProject";
import { motion } from "framer-motion";
import { Layers, Zap, Server } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DifficultyLevel } from "@/lib/store";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const difficulties = [
    {
        id: "beginner" as DifficultyLevel,
        title: "Beginner",
        description: "Basic CRUD system with minimal complexity.",
        icon: Layers,
        color: "from-blue-500/20 to-blue-600/20",
        glow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
        border: "border-blue-500/50",
    },
    {
        id: "intermediate" as DifficultyLevel,
        title: "Intermediate",
        description: "Auth + APIs + Database. Production ready.",
        icon: Zap,
        color: "from-purple-500/20 to-fuchsia-600/20",
        glow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
        border: "border-purple-500/50",
    },
    {
        id: "advanced" as DifficultyLevel,
        title: "Advanced",
        description: "Scalable + AI + microservices + queues.",
        icon: Server,
        color: "from-rose-500/20 to-orange-600/20",
        glow: "group-hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]",
        border: "border-rose-500/50",
    },
];

export const DifficultySelector = () => {
    const { difficultyLevel, setDifficultyLevel } = useProject();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {difficulties.map((level) => {
                const isSelected = difficultyLevel === level.id;

                return (
                    <motion.div
                        key={level.id}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setDifficultyLevel(level.id)}
                        className={cn(
                            "relative cursor-pointer rounded-2xl p-5 border transition-all duration-300 group overflow-hidden bg-black/40 backdrop-blur-md",
                            isSelected
                                ? cn("border-white/40 shadow-xl", level.glow)
                                : "border-white/10 hover:border-white/20"
                        )}
                    >
                        {/* Background Gradient */}
                        <div
                            className={cn(
                                "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500",
                                level.color,
                                (isSelected || "group-hover:opacity-100") && "opacity-100"
                            )}
                        />

                        <div className="relative z-10">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors",
                                isSelected ? "bg-white/20 text-white" : "bg-white/5 text-text-secondary group-hover:text-white"
                            )}>
                                <level.icon className="w-5 h-5" />
                            </div>
                            <h4 className={cn(
                                "font-bold text-lg mb-1 transition-colors",
                                isSelected ? "text-white" : "text-text-secondary group-hover:text-white"
                            )}>
                                {level.title}
                            </h4>
                            <p className="text-xs text-text-muted leading-relaxed">
                                {level.description}
                            </p>
                        </div>

                        {/* Selected Indicator Ring */}
                        {isSelected && (
                            <motion.div
                                layoutId="selected-ring"
                                className={cn("absolute inset-0 rounded-2xl border-2 pointer-events-none", level.border)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
};
