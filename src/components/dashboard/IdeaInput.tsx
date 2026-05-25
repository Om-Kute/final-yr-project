"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Sparkles } from "lucide-react";
import { useProject } from "@/hooks/useProject";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const SUGGESTIONS = [
    "E-commerce website",
    "Food delivery app",
    "Chat application",
    "Weather forecasting system",
];

export const IdeaInput = () => {
    const { projectIdea, setProjectIdea } = useProject();
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isListening, setIsListening] = useState(false);

    // Auto-expand textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${Math.max(
                textareaRef.current.scrollHeight,
                120
            )}px`;
        }
    }, [projectIdea]);

    const handleVoiceInput = () => {
        setIsListening(true);
        // Simulate voice to text delay
        setTimeout(() => {
            setProjectIdea(
                projectIdea + (projectIdea ? " " : "") + "A scalable microservices architecture for a fintech application."
            );
            setIsListening(false);
        }, 2000);
    };

    return (
        <div className="space-y-4">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 transition-colors group-focus-within:border-primary/50 flex flex-col">
                    <textarea
                        ref={textareaRef}
                        value={projectIdea}
                        onChange={(e) => setProjectIdea(e.target.value)}
                        placeholder="e.g. Library Management System with user login and book tracking..."
                        className="w-full bg-transparent text-white placeholder:text-text-muted outline-none resize-none min-h-[120px] text-lg leading-relaxed"
                    />

                    <div className="flex justify-between items-end mt-4 pt-4 border-t border-white/5">
                        <span className="text-xs text-text-muted font-medium">
                            {projectIdea.length} characters
                        </span>

                        <button
                            onClick={handleVoiceInput}
                            disabled={isListening}
                            className={cn(
                                "p-3 rounded-xl transition-all flex items-center justify-center relative overflow-hidden group/mic",
                                isListening
                                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                    : "bg-white/5 text-text-muted hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"
                            )}
                        >
                            {isListening && (
                                <motion.div
                                    className="absolute inset-0 bg-red-500/10"
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                />
                            )}
                            <Mic className={cn("w-5 h-5 relative z-10", isListening && "animate-pulse")} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs text-text-muted flex items-center mr-2">
                    <Sparkles className="w-3 h-3 mr-1" /> Try:
                </span>
                {SUGGESTIONS.map((suggestion) => (
                    <button
                        key={suggestion}
                        onClick={() => setProjectIdea(suggestion)}
                        className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 hover:border-primary/30 transition-all active:scale-95"
                    >
                        {suggestion}
                    </button>
                ))}
            </div>
        </div>
    );
};
