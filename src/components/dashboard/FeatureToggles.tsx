"use client";

import React from "react";
import { useProject } from "@/hooks/useProject";
import { Lock, Cpu, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const features = [
    {
        id: "authentication" as const,
        title: "Include Authentication",
        description: "JWT-based login and user management system.",
        icon: Lock,
        color: "from-blue-400 to-cyan-400"
    },
    {
        id: "aiFeatures" as const,
        title: "Include AI Features",
        description: "LLM integration, embeddings, and vector database.",
        icon: Cpu,
        color: "from-purple-400 to-pink-400"
    },
    {
        id: "payment" as const,
        title: "Include Payment System",
        description: "Stripe integration for subscriptions or one-time payments.",
        icon: CreditCard,
        color: "from-emerald-400 to-teal-400"
    },
];

export const FeatureToggles = () => {
    const { selectedFeatures, toggleFeature } = useProject();

    return (
        <div className="space-y-4">
            {features.map((feature) => {
                const isEnabled = selectedFeatures[feature.id];

                return (
                    <div
                        key={feature.id}
                        onClick={() => toggleFeature(feature.id)}
                        className="group flex items-center justify-between p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                                isEnabled
                                    ? `bg-gradient-to-br ${feature.color} text-white shadow-lg`
                                    : "bg-white/5 text-text-muted"
                            )}>
                                <feature.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-sm">{feature.title}</h4>
                                <p className="text-xs text-text-muted mt-0.5">{feature.description}</p>
                            </div>
                        </div>

                        {/* Modern Toggle Switch */}
                        <div className={cn(
                            "w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out shrink-0",
                            isEnabled ? "bg-primary" : "bg-white/10"
                        )}>
                            <motion.div
                                className="w-4 h-4 bg-white rounded-full shadow-md"
                                animate={{ x: isEnabled ? 24 : 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
