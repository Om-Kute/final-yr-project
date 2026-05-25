"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const steps = [
    "Extracting requirements...",
    "Selecting optimal tech stack...",
    "Drafting database schema...",
    "Designing system architecture...",
    "Generating complete blueprint..."
];

export const ProcessingOverlay = ({
    isProcessing
}: {
    isProcessing: boolean;
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isProcessing) {
            // eslint-disable-next-line
            setCurrentStep(0);
            // eslint-disable-next-line
            setProgress(0);
            return;
        }

        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, 40); // 40ms * 100 = 4000ms total

        // Steps animation
        const stepInterval = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev >= steps.length - 1) {
                    clearInterval(stepInterval);
                    return prev;
                }
                return prev + 1;
            });
        }, 800);

        return () => {
            clearInterval(progressInterval);
            clearInterval(stepInterval);
        };
    }, [isProcessing]);

    return (
        <AnimatePresence>
            {isProcessing && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
                >
                    <div className="w-full max-w-lg bg-black/40 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        {/* Background Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-primary/20 blur-[100px] -z-10 rounded-full" />

                        <div className="text-center mb-8">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 rounded-full border-b-2 border-r-2 border-primary mx-auto mb-6 flex items-center justify-center relative"
                            >
                                <div className="w-12 h-12 rounded-full border-t-2 border-l-2 border-accent absolute" />
                                <Loader2 className="w-6 h-6 text-white animate-pulse" />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-white mb-2">Analyzing your idea...</h2>
                            <p className="text-text-secondary text-sm">Please do not close this window</p>
                        </div>

                        {/* Steps List */}
                        <div className="space-y-4 mb-8">
                            {steps.map((step, index) => {
                                const isCompleted = index < currentStep;
                                const isActive = index === currentStep;
                                const isPending = index > currentStep;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: isPending ? 0.4 : 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="relative flex-shrink-0">
                                            {isCompleted ? (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring" }}
                                                >
                                                    <CheckCircle2 className="w-6 h-6 text-primary" />
                                                </motion.div>
                                            ) : isActive ? (
                                                <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                            ) : (
                                                <Circle className="w-6 h-6 text-white/20" />
                                            )}
                                        </div>
                                        <span
                                            className={cn(
                                                "text-sm font-medium transition-colors duration-300",
                                                isCompleted ? "text-text-secondary" : isActive ? "text-white" : "text-white/30"
                                            )}
                                        >
                                            {step}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-accent"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="text-right text-xs font-bold text-white/50">{progress}%</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
