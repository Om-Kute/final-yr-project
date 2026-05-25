"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TabsProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
    return (
        <div className="flex flex-wrap gap-2 mb-8 bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-white/5 inline-flex">
            {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={cn(
                            "relative px-6 py-2.5 text-sm font-medium rounded-xl transition-colors outline-none",
                            isActive ? "text-white" : "text-text-secondary hover:text-white hover:bg-white/5"
                        )}
                        style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="active-tab"
                                className="absolute inset-0 bg-primary/20 rounded-xl border border-primary/30"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{tab}</span>
                    </button>
                );
            })}
        </div>
    );
};
