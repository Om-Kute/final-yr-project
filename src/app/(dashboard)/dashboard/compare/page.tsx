"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProject } from "@/hooks/useProject";
import { GlassCard, TextGradient, MagneticButton } from "@/components/ui/DesignSystem";
import { Button } from "@/components/ui/Button";
import { ComparisonView } from "@/components/compare/ComparisonView";
import { GitBranch, AlertCircle, ArrowLeft, GitCompare, Layout, Cpu, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ComparePage() {
    const { savedProjects, setSavedProjects } = useProject();
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const userId = user?._id || "Guest_User";
            try {
                const res = await fetch(`/api/projects/list?userId=${userId}`);
                const data = await res.json();
                if (data.success && data.projects) {
                    setSavedProjects(data.projects);
                }
            } catch (error) {
                console.error("Fetch projects error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user") || "{}") : {};
    const userId = user?._id || "Guest_User";

    // Enforce user isolation
    const userProjects = savedProjects.filter(p => p.userId === userId || !p.userId);

    const toggleSelection = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(sid => sid !== id));
        } else if (selectedIds.length < 3) {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const projectA = userProjects.find(p => p.id === selectedIds[0]);
    const projectB = userProjects.find(p => p.id === selectedIds[1]);
    const projectC = userProjects.find(p => p.id === selectedIds[2]);

    return (
        <div className="max-w-7xl mx-auto pb-20">
            <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]" />
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Analysis / Comparator</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-4">
                        Neural <TextGradient variant="secondary">Differencing.</TextGradient>
                    </h1>
                    <p className="text-white/30 text-lg font-medium tracking-tight">Select up to 3 architectures for holographic side-by-side analysis.</p>
                </motion.div>

                <MagneticButton
                    variant="secondary"
                    onClick={() => router.back()}
                    className="h-12 px-6 rounded-xl text-xs font-bold uppercase tracking-widest bg-white/[0.03] border-white/5"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Workspace
                </MagneticButton>
            </header>

            {isLoading ? (
                <div className="h-[400px] flex flex-col items-center justify-center gap-6">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <GitCompare className="w-6 h-6 text-emerald-500 animate-pulse" />
                        </div>
                    </div>
                </div>
            ) : userProjects.length < 2 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <GlassCard className="p-24 flex flex-col items-center justify-center text-center bg-black/40 border-dashed border-white/10">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
                            <div className="relative w-24 h-24 bg-white/[0.03] border border-white/10 rounded-[2rem] flex items-center justify-center">
                                <AlertCircle className="w-10 h-10 text-white/20" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-3 tracking-tight">Insufficient Modules</h3>
                        <p className="text-white/30 mb-10 max-w-sm font-medium leading-relaxed">
                            You need at least two neural blueprints in your library to unlock the comparison matrix.
                        </p>
                        <MagneticButton onClick={() => router.push("/dashboard/create-project")} className="h-14 px-8 rounded-2xl font-bold">
                            Initialize New Blueprint
                        </MagneticButton>
                    </GlassCard>
                </motion.div>
            ) : (
                <div className="space-y-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userProjects.filter((p, index, self) =>
                            index === self.findIndex((t) => t.id === p.id)
                        ).map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => toggleSelection(project.id)}
                                className="cursor-pointer group h-full"
                            >
                                <GlassCard
                                    className={`h-full border-2 transition-all duration-700 p-8 ${selectedIds.includes(project.id)
                                        ? "border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                                        : "border-white/5 bg-white/[0.02] hover:border-white/20 group-hover:bg-white/[0.04]"
                                        }`}
                                    glowColor={selectedIds.includes(project.id) ? "rgba(16, 185, 129, 0.2)" : "transparent"}
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${selectedIds.includes(project.id) ? "bg-emerald-500 text-white" : "bg-white/[0.03] text-white/20"
                                            }`}>
                                            <Layout className="w-6 h-6" />
                                        </div>

                                        <AnimatePresence>
                                            {selectedIds.includes(project.id) && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-2xl ring-4 ring-emerald-500/20"
                                                >
                                                    <span className="text-[12px] font-black">{selectedIds.indexOf(project.id) + 1}</span>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <h4 className="text-xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors italic tracking-tight">{project.title}</h4>

                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            project.techStack?.frontend?.[0] || 'Web',
                                            project.database?.[0] || 'NoSQL'
                                        ].map((tag) => (
                                            <span key={tag} className="text-[10px] font-black text-white/20 bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-lg uppercase tracking-widest">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {selectedIds.length >= 2 && projectA && projectB ? (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                transition={{ type: "spring", damping: 20 }}
                                className="pt-20 border-t border-white/[0.05]"
                            >
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <h2 className="text-3xl font-black text-white italic tracking-tight">Active Matrix Comparison</h2>
                                </div>
                                <ComparisonView
                                    projectA={projectA}
                                    projectB={projectB}
                                    projectC={projectC}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-white/[0.03] rounded-[3rem] bg-white/[0.01]"
                            >
                                <GitCompare className="w-12 h-12 text-white/5 mb-6" />
                                <p className="text-white/20 text-lg font-bold tracking-tight">Select multiple protocols to bridge analysis</p>
                                <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em] mt-2">Awaiting neural selection...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
