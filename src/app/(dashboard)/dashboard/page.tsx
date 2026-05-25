"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassCard, TextGradient, MagneticButton } from "@/components/ui/DesignSystem";
import { Button } from "@/components/ui/Button";
import {
    Plus,
    Search,
    Layout,
    ExternalLink,
    MoreHorizontal,
    Clock,
    Code2,
    Database,
    Cpu,
    Zap,
    TrendingUp,
    Shield
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const recentProjects = [
    {
        name: "Architect_v2_Frontend",
        updated: "2h ago",
        stack: "Next.js + Tailwind",
        status: "Live",
        color: "from-blue-500 to-cyan-500",
        glow: "rgba(34, 211, 238, 0.2)"
    },
    {
        name: "SaaS_Backend_API",
        updated: "5h ago",
        stack: "Node.js + Prisma",
        status: "Draft",
        color: "from-purple-500 to-blue-500",
        glow: "rgba(139, 92, 246, 0.2)"
    },
    {
        name: "Ecom_Microservices",
        updated: "1d ago",
        stack: "Go + gRPC",
        status: "Deploying",
        color: "from-cyan-500 to-emerald-500",
        glow: "rgba(16, 185, 129, 0.2)"
    },
];

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]" />
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">System Operational</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-4">
                        Welcome, <TextGradient>{user?.name?.split(' ')[0] || "Architect"}.</TextGradient>
                    </h1>
                    <p className="text-white/30 text-lg font-medium tracking-tight">Your neural workspace is ready for deployment.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Link href="/dashboard/create-project">
                        <MagneticButton className="h-16 px-10 rounded-2xl text-lg font-bold group">
                            <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-500" />
                            Initialize New Project
                        </MagneticButton>
                    </Link>
                </motion.div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Active Nodes", value: "24", icon: Cpu, change: "+4.2%", color: "text-blue-400" },
                    { label: "Neural Tokens", value: "128k", icon: Zap, change: "82% cap", color: "text-purple-400" },
                    { label: "Architecture Files", value: "1.4k", icon: Code2, change: "+120", color: "text-cyan-400" },
                    { label: "System Health", value: "99.9%", icon: Shield, change: "Optimal", color: "text-emerald-400" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i + 0.3 }}
                    >
                        <GlassCard className="!p-6 border-white/5 hover:border-white/20 transition-colors">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] ${stat.color}`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black text-white/20 bg-white/5 px-2 py-1 rounded-md uppercase tracking-widest">{stat.change}</span>
                            </div>
                            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <p className="text-4xl font-black text-white tracking-tighter">{stat.value}</p>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Projects */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                            <Clock className="w-5 h-5 text-primary" /> Recent Deployments
                        </h3>
                        <Link href="/dashboard/projects" className="text-[11px] font-black text-primary uppercase tracking-widest hover:brightness-125 transition-all">
                            Browse All Projects →
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentProjects.map((project, i) => (
                            <motion.div
                                key={project.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i + 0.6 }}
                            >
                                <GlassCard
                                    className="group !p-5 hover:border-primary/20 transition-all flex items-center gap-6"
                                    glowColor={project.glow}
                                >
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shrink-0 shadow-2xl ${project.color}`}>
                                        <Layout className="w-7 h-7 text-white" />
                                    </div>

                                    <div className="flex-grow min-w-0">
                                        <h4 className="text-lg font-bold text-white truncate group-hover:text-primary transition-colors">{project.name}</h4>
                                        <div className="flex items-center gap-6 mt-1">
                                            <span className="flex items-center gap-2 text-[11px] font-bold text-white/30 uppercase tracking-wider">
                                                <div className="w-1.5 h-1.5 rounded-full bg-white/10" /> {project.updated}
                                            </span>
                                            <span className="flex items-center gap-2 text-[11px] font-bold text-primary uppercase tracking-wider">
                                                <Code2 className="w-3.5 h-3.5" /> {project.stack}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:border-primary/20 transition-colors">
                                            {project.status}
                                        </div>
                                        <MagneticButton variant="secondary" className="w-10 h-10 !p-0 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10">
                                            <ExternalLink className="w-4 h-4 text-white" />
                                        </MagneticButton>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white tracking-tight px-2">Rapid Execution</h3>
                    <GlassCard className="relative overflow-hidden border-white/10 bg-[#050816]/60">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-[60px] -z-10" />

                        <div className="space-y-3">
                            {[
                                { label: "Generate Architecture", icon: Cpu, color: "text-blue-400", sub: "Neural blueprinting engine" },
                                { label: "Database Modeler", icon: Database, color: "text-purple-400", sub: "Visualize schema relations" },
                                { label: "API Documentation", icon: Search, color: "text-cyan-400", sub: "Instant Swagger / Scalar" },
                            ].map((action, i) => (
                                <motion.button
                                    key={action.label}
                                    whileHover={{ x: 5, scale: 1.02 }}
                                    className="w-full flex items-center gap-5 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] hover:border-primary/30 hover:bg-white/[0.05] transition-all text-left group"
                                >
                                    <div className={`p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform ${action.color}`}>
                                        <action.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{action.label}</p>
                                        <p className="text-[10px] text-white/20 font-medium uppercase tracking-widest">{action.sub}</p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        <div className="mt-10 pt-10 border-t border-white/5">
                            <div className="p-6 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-transparent border border-primary/20 relative overflow-hidden group mb-4">
                                <TrendingUp className="absolute -right-4 -bottom-4 w-24 h-24 text-primary/10 group-hover:scale-125 transition-transform duration-1000" />
                                <p className="text-xs font-bold text-white mb-2 tracking-tight">Unlock Enterprise Layer</p>
                                <p className="text-[10px] text-white/40 mb-6 leading-relaxed">Scale your projects with SOC2 compliance and multi-region clusters.</p>
                                <Button variant="secondary" className="w-full h-11 bg-white/10 border-white/10 hover:bg-white/20 text-xs font-black uppercase tracking-widest">
                                    Upgrade to Elite
                                </Button>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
