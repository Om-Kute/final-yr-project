"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProject } from "@/hooks/useProject";
import { GlassCard, TextGradient, MagneticButton } from "@/components/ui/DesignSystem";
import { Button } from "@/components/ui/Button";
import {
    Files,
    Search,
    Calendar,
    ArrowRight,
    Trash2,
    ExternalLink,
    AlertCircle,
    Layout,
    Clock,
    SearchX,
    FolderOpen,
    Database,
    Cpu
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function ProjectsPage() {
    const { savedProjects, deleteProject, setSavedProjects, setGeneratedResult } = useProject();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
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

    // Filter by Search AND User Registration ID to ensure isolation
    const filteredProjects = savedProjects.filter(p =>
        (p.userId === userId || !p.userId) && // Ensure it's the current user's project
        (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this blueprint?")) return;

        // Optimistic delete
        deleteProject(id);
        toast.success("Project deleted");

        try {
            await fetch(`/api/projects/delete?id=${id}&userId=${userId}`, { method: "DELETE" });
        } catch (error) {
            console.warn("API delete failed, kept in local list if refresh occurs:", error);
        }
    };

    // Ensure unique IDs for rendering
    const uniqueProjects = filteredProjects.filter((p, index, self) =>
        index === self.findIndex((t) => t.id === p.id)
    );

    return (
        <div className="max-w-7xl mx-auto pb-20">
            {/* Header section with floating glass search */}
            <header className="mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,1)]" />
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Vault / Blueprints</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-4">
                            Your <TextGradient>Neural</TextGradient> Library.
                        </h1>
                        <p className="text-white/30 text-lg font-medium tracking-tight">Explore and manage high-fidelity system architectures.</p>
                    </div>

                    <div className="relative group w-full md:w-96">
                        <div className="absolute inset-0 bg-primary/5 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter by architecture name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/10 outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                        />
                    </div>
                </motion.div>
            </header>

            {isLoading ? (
                <div className="h-[400px] flex flex-col items-center justify-center gap-6">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Cpu className="w-6 h-6 text-primary animate-pulse" />
                        </div>
                    </div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] animate-pulse">Syncing with neural vault...</p>
                </div>
            ) : uniqueProjects.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <GlassCard className="p-24 flex flex-col items-center justify-center text-center bg-black/40 border-dashed border-white/10">
                        <div className="relative mb-8">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                            <div className="relative w-24 h-24 bg-white/[0.03] border border-white/10 rounded-[2rem] flex items-center justify-center">
                                <FolderOpen className="w-10 h-10 text-white/20" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-3 tracking-tight">
                            {searchTerm ? "No Match Found" : "Vault Empty"}
                        </h3>
                        <p className="text-white/30 mb-10 max-w-sm font-medium leading-relaxed">
                            {searchTerm ? "The neural engine couldn't find any blueprint matching your query. Verify spelling or clear tokens." : "Initialize your first project to start building your architectural empire."}
                        </p>
                        <MagneticButton
                            onClick={() => router.push("/dashboard/create-project")}
                            className="h-14 px-8 rounded-2xl font-bold"
                        >
                            Initialize System Architecture
                        </MagneticButton>
                    </GlassCard>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {uniqueProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <GlassCard
                                    className="h-full flex flex-col group p-8 hover:border-primary/20 transition-all duration-500"
                                    glowColor="rgba(59, 130, 246, 0.05)"
                                >
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center text-white/40 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-500 group-hover:scale-110">
                                            <Database className="w-6 h-6" />
                                        </div>
                                        <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest">
                                            <Clock className="w-3 h-3" />
                                            {new Date(project.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-black text-white mb-4 group-hover:text-primary transition-colors tracking-tighter italic">
                                            {project.title}
                                        </h3>
                                        <p className="text-white/30 font-medium line-clamp-3 leading-relaxed mb-10">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 pt-8 border-t border-white/[0.05]">
                                        <MagneticButton
                                            variant="secondary"
                                            className="flex-1 h-12 rounded-xl bg-white/[0.03] border-white/5 hover:bg-white/[0.08] hover:border-primary/20 text-xs font-bold uppercase tracking-widest"
                                            onClick={() => {
                                                const { userId: _u, id: _i, createdAt: _c, ...projectData } = project as any;
                                                setGeneratedResult(projectData);
                                                router.push("/dashboard/result");
                                            }}
                                        >
                                            <ExternalLink className="w-3.5 h-3.5 mr-2" /> View Details
                                        </MagneticButton>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="w-12 h-12 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-center text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300"
                                            onClick={() => handleDelete(project.id)}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
