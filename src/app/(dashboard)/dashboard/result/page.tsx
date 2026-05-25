"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProject } from "@/hooks/useProject";
import { GlassCard, TextGradient, MagneticButton } from "@/components/ui/DesignSystem";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { useRouter } from "next/navigation";
import { exportToPDF } from "@/lib/utils/exportPdf";
import toast from "react-hot-toast";
import { parseArchitecture } from "@/lib/parser";
import { ArchitectureFlow } from "@/components/architecture/ArchitectureFlow";
import { ArchitectureCard } from "@/components/architecture/ArchitectureCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { CodeViewer } from "@/components/code/CodeViewer";
import { generateProjectCode } from "@/lib/codeGenerator";
import { exportToMarkdown } from "@/lib/utils/exportMarkdown";
import { downloadProjectZip } from "@/lib/downloadZip";
import { generateDiagrams } from "@/lib/diagramGenerator";
import { DiagramViewer } from "@/components/diagram/DiagramViewer";
import {
    Database,
    Layout,
    Server,
    Download,
    Save,
    Rocket,
    AlertCircle,
    FolderPlus,
    RefreshCw,
    Code,
    FileText,
    GitBranch,
    Layers,
    ArrowRightLeft,
    Share2,
    Activity,
    Users,
    ChevronRight,
    Zap,
    Sparkles,
    ShieldCheck,
    Box
} from "lucide-react";

const TABS = ["Overview", "Architecture", "Database", "Features", "Code", "Diagrams"];

type DiagramTabType = "architecture" | "er" | "flow" | "component" | "sequence" | "usecase";

const DIAGRAM_TABS: { id: DiagramTabType; label: string; icon: React.ReactNode }[] = [
    { id: "architecture", label: "System Arch", icon: <Share2 className="w-4 h-4" /> },
    { id: "er", label: "ER Diagram", icon: <Database className="w-4 h-4" /> },
    { id: "flow", label: "Flowchart", icon: <Activity className="w-4 h-4" /> },
    { id: "component", label: "Components", icon: <Layers className="w-4 h-4" /> },
    { id: "sequence", label: "API Sequence", icon: <ArrowRightLeft className="w-4 h-4" /> },
    { id: "usecase", label: "Use Case", icon: <Users className="w-4 h-4" /> },
];

export default function ResultPage() {
    const {
        generatedResult, generationStatus, saveProject,
        generatedCode, codeGenerationStatus, setGeneratedCode, setCodeGenerationStatus,
        setSelectedFile, selectedFile
    } = useProject();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [activeDiagramTab, setActiveDiagramTab] = useState<DiagramTabType>("architecture");
    const [isDownloadingZip, setIsDownloadingZip] = useState(false);

    // Loading State
    if (generationStatus === "processing") {
        return (
            <div className="max-w-7xl mx-auto pb-32 space-y-8">
                <div className="flex flex-col gap-4">
                    <Skeleton className="h-16 w-3/4 rounded-2xl bg-white/5" />
                    <Skeleton className="h-6 w-1/2 rounded-xl bg-white/5" />
                </div>
                <Skeleton className="h-[400px] w-full rounded-[2rem] bg-white/5" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Skeleton className="h-64 rounded-[2rem] bg-white/5" />
                    <Skeleton className="h-64 rounded-[2rem] bg-white/5" />
                    <Skeleton className="h-64 rounded-[2rem] bg-white/5" />
                </div>
            </div>
        );
    }

    // Error State
    if ((generationStatus as string) === "error") {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6">
                <div className="relative mb-10">
                    <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
                    <div className="relative w-24 h-24 bg-white/[0.03] border border-red-500/20 rounded-[2rem] flex items-center justify-center">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>
                </div>
                <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Neural Bridge Collapse</h2>
                <p className="text-white/30 text-lg mb-10 max-w-sm font-medium leading-relaxed">The architecture synthesis was interrupted by a protocol error. Please re-initialize the engine.</p>
                <MagneticButton
                    onClick={() => router.push("/dashboard/create-project")}
                    variant="secondary"
                    className="h-16 px-10 rounded-2xl font-black"
                >
                    <RefreshCw className="w-5 h-5 mr-3" /> Attempt Restoration
                </MagneticButton>
            </div>
        );
    }

    // Empty State
    if (!generatedResult) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6">
                <div className="relative mb-10">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                    <div className="relative w-24 h-24 bg-white/[0.03] border border-white/10 rounded-[2rem] flex items-center justify-center">
                        <Box className="w-10 h-10 text-white/20" />
                    </div>
                </div>
                <h2 className="text-4xl font-black text-white mb-4 tracking-tighter italic">Vault Empty</h2>
                <p className="text-white/30 text-lg mb-10 max-w-sm font-medium leading-relaxed">The spectral analysis of your system has not been initiated. Start a new deployment.</p>
                <MagneticButton
                    onClick={() => router.push("/dashboard/create-project")}
                    className="h-16 px-10 rounded-2xl font-black italic"
                >
                    <Rocket className="w-5 h-5 mr-3" /> Initialize Project
                </MagneticButton>
            </div>
        );
    }

    // Success State
    const parsed = parseArchitecture(generatedResult);
    const diagrams = generateDiagrams(generatedResult);

    const handleSave = async () => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const projectToSave = {
            id: Date.now(),
            userId: user?._id || "Guest_User",
            createdAt: new Date().toISOString(),
            ...generatedResult
        };

        saveProject(projectToSave);

        try {
            const res = await fetch("/api/projects/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectToSave)
            });
            const data = await res.json();

            if (data.success) {
                saveProject(data.project);
                toast.success("Project synchronized with neural cloud!");
            } else {
                throw new Error(data.error || "Failed to save project");
            }
        } catch (error) {
            console.warn("API persistence failed, but data is in local store:", error);
            toast.success("Project saved to local vault (Offline)");
        }
    };

    const handleGenerateProject = async () => {
        if (!generatedResult) return;
        setActiveTab("Code");
        setCodeGenerationStatus("generating");
        try {
            const code = await generateProjectCode(generatedResult);
            setGeneratedCode(code);
            const firstFile = Object.keys(code.files)[0];
            setSelectedFile(firstFile);
            setCodeGenerationStatus("completed");
            toast.success("Neural codebase drafted successfully!");
        } catch (error) {
            console.error("Code generation error:", error);
            setCodeGenerationStatus("error");
            toast.error("Bridge failure: Could not draft codebase.");
        }
    };

    const handleDownloadZip = async () => {
        if (!generatedCode || !generatedCode.files) {
            toast.error("Codebase not initialized.");
            return;
        }
        setIsDownloadingZip(true);
        try {
            await downloadProjectZip(generatedCode.files, parsed.title);
        } finally {
            setIsDownloadingZip(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-32">
            {/* Cinematic Header & Actions */}
            <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between mb-16 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black italic rounded-lg flex items-center w-max uppercase tracking-[0.2em]">
                            <ShieldCheck className="w-3.5 h-3.5 mr-2" /> Neural Certified Blueprint
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-6 italic">
                        {parsed.title}
                    </h1>
                    <p className="text-xl text-white/30 font-medium leading-relaxed tracking-tight group">
                        {parsed.description}
                    </p>
                </motion.div>

                <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
                    <MagneticButton
                        variant="secondary"
                        className="h-12 px-6 rounded-xl text-xs font-black uppercase tracking-widest bg-white/[0.03] border-white/5"
                        onClick={handleSave}
                    >
                        <Save className="w-4 h-4 mr-2" /> Save to Vault
                    </MagneticButton>

                    <div className="h-8 w-px bg-white/5 mx-2" />

                    {codeGenerationStatus === "completed" ? (
                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ rotate: 180 }}
                                transition={{ duration: 0.5 }}
                                className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 hover:text-primary transition-all overflow-hidden"
                                onClick={handleGenerateProject}
                            >
                                <RefreshCw className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.03 }}
                                onClick={handleDownloadZip}
                                disabled={isDownloadingZip}
                                className="h-12 px-8 rounded-xl text-xs font-black uppercase tracking-widest bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center hover:bg-emerald-400 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isDownloadingZip ? (
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <><Download className="w-4 h-4 mr-2" /> Export .ZIP</>
                                )}
                            </motion.button>
                        </div>
                    ) : (
                        <MagneticButton
                            className="h-14 px-10 rounded-2xl text-sm font-black uppercase tracking-widest group"
                            onClick={handleGenerateProject}
                        >
                            <Rocket className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Draft Source Code
                        </MagneticButton>
                    )}
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mb-12">
                <GlassCard className="p-2 border-white/[0.05] bg-white/[0.02] shadow-2xl rounded-[2rem]">
                    <div className="flex flex-wrap gap-2">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 min-w-[120px] px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === tab
                                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                    : "text-white/20 hover:text-white/40 hover:bg-white/[0.02]"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </GlassCard>
            </div>

            {/* Tab Content */}
            <div id="pdf-content">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -40, filter: 'blur(20px)' }}
                        transition={{ type: "spring", damping: 25, stiffness: 100 }}
                    >
                        {/* OVERVIEW TAB */}
                        {activeTab === "Overview" && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <ArchitectureCard title="Frontend Interface" items={parsed.frontend} icon={Layout} color="purple" isEmptyMessage="Protocol undefined" />
                                <ArchitectureCard title="Logic Engine" items={parsed.backend} icon={Server} color="blue" isEmptyMessage="Protocol undefined" />
                                <ArchitectureCard title="Neural Storage" items={parsed.database} icon={Database} color="cyan" isEmptyMessage="Protocol undefined" />
                            </div>
                        )}

                        {/* ARCHITECTURE TAB */}
                        {activeTab === "Architecture" && (
                            <GlassCard className="p-12 border-white/[0.05] bg-white/[0.01]">
                                <div className="flex items-center gap-4 mb-12">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                        <Activity className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <h2 className="text-3xl font-black text-white tracking-tighter italic">Bridged Flow Analysis</h2>
                                </div>
                                <ArchitectureFlow flow={parsed.flow} />
                            </GlassCard>
                        )}

                        {/* DATABASE TAB */}
                        {activeTab === "Database" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {parsed.database.length > 0 ? parsed.database.map((table, i) => (
                                    <GlassCard key={i} className="flex items-center p-8 gap-6 group hover:border-primary/40 transition-all duration-700">
                                        <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                            <Database className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-white text-xl tracking-tight italic uppercase">{table}</h3>
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1">Schema mapping active</p>
                                        </div>
                                    </GlassCard>
                                )) : (
                                    <div className="col-span-full py-32 border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-center bg-white/[0.01]">
                                        <AlertCircle className="w-12 h-12 text-white/10 mb-6" />
                                        <p className="text-white/20 text-xl font-bold italic">No data protocols identified.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* FEATURES TAB */}
                        {activeTab === "Features" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {parsed.features.length > 0 ? parsed.features.map((feature, i) => (
                                    <GlassCard key={i} className="flex items-start p-8 gap-6 group hover:border-emerald-500/30 transition-all duration-700 h-full">
                                        <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mt-1.5 shrink-0">
                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform" />
                                        </div>
                                        <span className="text-white text-lg font-medium leading-relaxed tracking-tight italic">{feature}</span>
                                    </GlassCard>
                                )) : (
                                    <div className="col-span-full py-32 border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-center bg-white/[0.01]">
                                        <AlertCircle className="w-12 h-12 text-white/10 mb-6" />
                                        <p className="text-white/20 text-xl font-bold italic">No logic gates specified.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* CODE TAB */}
                        {activeTab === "Code" && (
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                            <Code className="w-6 h-6 text-indigo-500" />
                                        </div>
                                        <h2 className="text-3xl font-black text-white tracking-tighter italic">Spectral Codebase</h2>
                                    </div>
                                </div>

                                {codeGenerationStatus === "idle" && (
                                    <GlassCard className="h-[600px] flex flex-col items-center justify-center border-dashed border-white/[0.05] bg-white/[0.01]">
                                        <div className="relative mb-12">
                                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                                            <div className="relative w-24 h-24 bg-white/[0.03] border border-white/10 rounded-[2.5rem] flex items-center justify-center">
                                                <Terminal className="w-10 h-10 text-white/10" />
                                            </div>
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-4 tracking-tighter italic">Awaiting Synthesizer</h3>
                                        <p className="text-white/20 text-lg mb-12 text-center max-w-sm font-medium">Instruction the neural engine to construct a full-scale multi-file repository.</p>
                                        <MagneticButton onClick={handleGenerateProject} className="h-16 px-12 rounded-2xl text-lg group">
                                            Initialize Synthesis <Rocket className="w-5 h-5 ml-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </MagneticButton>
                                    </GlassCard>
                                )}

                                {codeGenerationStatus === "generating" && (
                                    <GlassCard className="h-[600px] flex flex-col items-center justify-center border-primary/20 bg-black/60 relative overflow-hidden">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
                                            className="w-32 h-32 rounded-full border-4 border-primary/10 border-t-primary animate-spin mb-10 shadow-[0_0_100px_rgba(59,130,246,0.2)]"
                                        />
                                        <h3 className="text-3xl font-black text-white mb-3 italic tracking-tighter">Drafting Protocols...</h3>
                                        <p className="text-white/30 text-sm font-black uppercase tracking-[0.3em] animate-pulse">Syncing React Components • Mapping API Nodes</p>
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/[0.03] overflow-hidden">
                                            <motion.div
                                                initial={{ x: "-100%" }}
                                                animate={{ x: "100%" }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                className="w-1/2 h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                                            />
                                        </div>
                                    </GlassCard>
                                )}

                                {codeGenerationStatus === "completed" && generatedCode && (
                                    <CodeViewer
                                        files={generatedCode.files}
                                        selectedFile={selectedFile}
                                        setSelectedFile={setSelectedFile}
                                    />
                                )}
                            </div>
                        )}

                        {/* DIAGRAMS TAB */}
                        {activeTab === "Diagrams" && (
                            <div className="space-y-12">
                                <div className="flex flex-col md:flex-row md:items-center gap-8 px-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                                            <Share2 className="w-6 h-6 text-violet-500" />
                                        </div>
                                        <h2 className="text-3xl font-black text-white tracking-tighter italic">Holographic Projections</h2>
                                    </div>
                                    <div className="flex flex-wrap gap-2 p-1.5 bg-white/[0.03] border border-white/[0.05] rounded-2xl">
                                        {DIAGRAM_TABS.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveDiagramTab(tab.id)}
                                                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeDiagramTab === tab.id
                                                    ? "bg-white text-black shadow-2xl"
                                                    : "text-white/20 hover:text-white/40"
                                                    }`}
                                            >
                                                {tab.icon}
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <GlassCard className="p-1 border-white/[0.05] bg-white/[0.01]">
                                    <DiagramViewer
                                        chart={diagrams[activeDiagramTab]}
                                        id={activeDiagramTab}
                                    />
                                </GlassCard>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {DIAGRAM_TABS.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveDiagramTab(tab.id)}
                                            className={`text-left p-8 rounded-[2rem] border transition-all duration-700 group ${activeDiagramTab === tab.id
                                                ? "border-violet-500/40 bg-violet-500/10"
                                                : "border-white/5 bg-white/[0.02] hover:border-white/20"
                                                }`}
                                        >
                                            <div className={`flex items-center gap-3 mb-4 font-black uppercase text-[10px] tracking-[0.3em] ${activeDiagramTab === tab.id ? "text-violet-400" : "text-white/20 group-hover:text-white/40"}`}>
                                                {tab.icon}
                                                {tab.label}
                                            </div>
                                            <p className="text-sm text-white/30 font-medium leading-relaxed italic">
                                                {tab.id === "architecture" && "Global system topology map."}
                                                {tab.id === "er" && "Relational schema protocols."}
                                                {tab.id === "flow" && "Logic traversal sequence."}
                                                {tab.id === "component" && "Interface bridge structural."}
                                                {tab.id === "sequence" && "API packet lifecycle."}
                                                {tab.id === "usecase" && "Neural actor bridge matrix."}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

function Terminal({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
    );
}
