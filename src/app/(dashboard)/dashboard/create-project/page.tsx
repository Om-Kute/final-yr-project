"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { IdeaInput } from "@/components/dashboard/IdeaInput";
import { DifficultySelector } from "@/components/dashboard/DifficultySelector";
import { FeatureToggles } from "@/components/dashboard/FeatureToggles";
import { ProcessingOverlay } from "@/components/dashboard/ProcessingOverlay";
import { GlassCard, TextGradient, MagneticButton } from "@/components/ui/DesignSystem";
import { Rocket, AlertCircle, Sparkles, Cpu, Layers, Zap } from "lucide-react";
import { useProject } from "@/hooks/useProject";
import { generateArchitecture } from "@/lib/aiEngine";

export default function CreateProjectPage() {
    const {
        isFormValid,
        setGenerationStatus,
        projectIdea,
        difficultyLevel,
        selectedFeatures,
        setGeneratedResult
    } = useProject();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showError, setShowError] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!isFormValid) {
            setShowError(true);
            return;
        }

        setShowError(false);
        setIsProcessing(true);
        setGenerationStatus("processing");

        try {
            const result = await generateArchitecture({
                idea: projectIdea,
                difficulty: difficultyLevel,
                features: selectedFeatures
            });
            setGeneratedResult(result);
            setGenerationStatus("completed");
            setIsProcessing(false);
            router.push("/dashboard/result");
        } catch (error) {
            console.error("Error generating architecture:", error);
            const errorMessage = error instanceof Error ? error.message : "AI generation failed. Please try again.";
            import("react-hot-toast").then(mod => mod.default.error(errorMessage));
            setIsProcessing(false);
            setGenerationStatus("idle");
        }
    };

    return (
        <>
            <ProcessingOverlay isProcessing={isProcessing} />

            <div className="max-w-5xl mx-auto pb-32">
                {/* Cinematic Header */}
                <header className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-start gap-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Rocket className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Module / Initialization</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none italic">
                            Architect Your <TextGradient>Vision.</TextGradient>
                        </h1>
                        <p className="text-white/30 text-lg font-medium tracking-tight max-w-2xl">
                            Deploy the neural engine to conceptualize, design, and blueprint your next high-scale system.
                        </p>
                    </motion.div>
                </header>

                <div className="space-y-12">
                    {/* Section 1: Idea Input */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <GlassCard className="p-8 md:p-12 border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all duration-500">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-primary">
                                        <Sparkles className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-black text-white italic tracking-tight">01. Conceptual Idea</h2>
                                </div>
                                {showError && !isFormValid && (
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                                        <AlertCircle className="w-3.5 h-3.5" /> Required Field
                                    </div>
                                )}
                            </div>
                            <IdeaInput />
                        </GlassCard>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Section 2: Complexity */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <GlassCard className="h-full p-8 md:p-12 border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-primary">
                                        <Cpu className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-black text-white italic tracking-tight">02. Logic Depth</h2>
                                </div>
                                <DifficultySelector />
                            </GlassCard>
                        </motion.div>

                        {/* Section 3: Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <GlassCard className="h-full p-8 md:p-12 border-white/5 bg-white/[0.02]">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-primary">
                                        <Layers className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-black text-white italic tracking-tight">03. Neural Bridges</h2>
                                </div>
                                <FeatureToggles />
                            </GlassCard>
                        </motion.div>
                    </div>

                    {/* Final Submission */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="pt-12 flex flex-col items-center"
                    >
                        <div className="w-full max-w-md relative group">
                            <div className={`absolute -inset-4 bg-primary/20 blur-3xl rounded-[3rem] transition-all duration-1000 opacity-0 group-hover:opacity-100 ${isFormValid ? 'group-hover:bg-primary/30' : 'group-hover:bg-red-500/20'}`} />

                            <MagneticButton
                                onClick={handleSubmit}
                                disabled={!isFormValid || isProcessing}
                                className="w-full h-20 rounded-[2rem] text-xl font-black uppercase tracking-[0.2em] relative overflow-hidden"
                            >
                                {isProcessing ? (
                                    <div className="flex items-center gap-4">
                                        <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                                        <span>Architecting...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <Zap className="w-6 h-6 fill-current" />
                                        <span>Initialize Engine</span>
                                    </div>
                                )}
                            </MagneticButton>
                        </div>

                        {!isFormValid && showError && (
                            <p className="mt-8 text-[10px] font-black text-red-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                <AlertCircle className="w-3.5 h-3.5" /> Neural protocols incomplete. Verify input idea.
                            </p>
                        )}

                        <p className="mt-8 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Powered by Neural Bridge v4.0.2</p>
                    </motion.div>
                </div>
            </div>
        </>
    );
}