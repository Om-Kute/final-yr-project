"use client";

import React from "react";
import { motion } from "framer-motion";
import { SavedProject } from "@/lib/store";
import { Card } from "@/components/ui/Card";
import {
    Database,
    Layout,
    Server,
    Layers
} from "lucide-react";

interface ComparisonViewProps {
    projectA: SavedProject;
    projectB: SavedProject;
    projectC?: SavedProject;
}

export const ComparisonView = ({ projectA, projectB, projectC }: ComparisonViewProps) => {
    const projects = [projectA, projectB, projectC].filter(Boolean) as SavedProject[];

    const sections = [
        {
            title: "Frontend Stack",
            key: "frontend",
            icon: Layout,
            color: "purple",
            getItems: (p: SavedProject) => p.techStack.frontend
        },
        {
            title: "Backend Stack",
            key: "backend",
            icon: Server,
            color: "blue",
            getItems: (p: SavedProject) => p.techStack.backend
        },
        {
            title: "Database Entities",
            key: "database",
            icon: Database,
            color: "cyan",
            getItems: (p: SavedProject) => p.database
        },
        {
            title: "Core Features",
            key: "features",
            icon: Layers,
            color: "rose",
            getItems: (p: SavedProject) => p.features
        }
    ];

    const isUnique = (item: string, currentProject: SavedProject, sectionKey: string) => {
        return projects.every(p => {
            if (p.id === currentProject.id) return true;
            const targetSection = sections.find(s => s.key === sectionKey);
            const items = targetSection ? targetSection.getItems(p) : [];
            return !items.includes(item);
        });
    };

    return (
        <div className={`grid grid-cols-1 md:grid-cols-${projects.length} gap-8 relative mt-12`}>
            {/* VS Badge if exactly 2 projects */}
            {projects.length === 2 && (
                <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/20 items-center justify-center backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <span className="text-sm font-bold text-white/40">VS</span>
                </div>
            )}

            {projects.map((project, idx) => (
                <div key={project.id} className="space-y-6">
                    <div className={`p-6 rounded-3xl bg-gradient-to-br ${idx === 0 ? "from-purple-500/10" : idx === 1 ? "from-blue-500/10" : "from-emerald-500/10"
                        } to-transparent border ${idx === 0 ? "border-purple-500/20" : idx === 1 ? "border-blue-500/20" : "border-emerald-500/20"
                        }`}>
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-sm text-white/40 line-clamp-2">{project.description}</p>
                    </div>

                    {sections.map((section) => (
                        <Card key={section.key} className="border-white/5 bg-white/[0.02]">
                            <div className="flex items-center gap-2 mb-4">
                                <section.icon className={`w-4 h-4 text-${section.color}-400`} />
                                <h4 className="text-xs font-bold text-white/60 tracking-wider uppercase">{section.title}</h4>
                            </div>
                            <div className="space-y-2">
                                {section.getItems(project).map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: idx === 0 ? -10 : 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-${section.color}-500/40`} />
                                            <span className="text-sm text-white/80">{item}</span>
                                        </div>
                                        {isUnique(item, project, section.key) && (
                                            <span className={`text-[10px] font-bold ${idx === 0 ? "text-purple-400 bg-purple-400/10" :
                                                    idx === 1 ? "text-blue-400 bg-blue-400/10" :
                                                        "text-emerald-400 bg-emerald-400/10"
                                                } px-1.5 py-0.5 rounded uppercase`}>Unique</span>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            ))}
        </div>
    );
};
