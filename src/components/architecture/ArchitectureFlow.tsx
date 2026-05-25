"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { getIconForComponent } from '@/lib/iconMap';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface ArchitectureFlowProps {
    flow: string[];
}

export const ArchitectureFlow = React.memo(function ArchitectureFlow({ flow }: ArchitectureFlowProps) {
    if (!flow || flow.length === 0) return null;

    return (
        <Card className="p-4 md:p-8 border-emerald-500/20 overflow-x-auto bg-black/40 min-h-[300px] flex items-center justify-start section-scroll relative">
            <div className="absolute top-4 left-4 inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-full tracking-wider uppercase backdrop-blur-md">
                Data Flow Diagram
            </div>

            <div className="flex items-center min-w-max py-8 px-2 md:px-4 mt-6">
                {flow.map((node, i) => {
                    const Icon = getIconForComponent(node);
                    return (
                        <React.Fragment key={i}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.4, type: "spring", bounce: 0.4 }}
                                className="relative group shrink-0 mx-2 md:mx-0"
                            >
                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

                                <div className="px-6 py-6 rounded-xl border border-white/10 bg-white/5 font-semibold text-white relative z-10 hover:border-emerald-500/50 transition-all duration-300 flex flex-col items-center gap-4 backdrop-blur-sm shadow-xl min-w-[140px] md:min-w-[160px] transform hover:-translate-y-1">
                                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-300">
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <span className="text-sm text-center leading-snug">{node}</span>
                                </div>
                            </motion.div>

                            {i < flow.length - 1 && (
                                <motion.div
                                    initial={{ opacity: 0, scaleX: 0 }}
                                    animate={{ opacity: 1, scaleX: 1 }}
                                    transition={{ delay: i * 0.15 + 0.1, duration: 0.3 }}
                                    className="mx-2 md:mx-4 shrink-0 flex items-center justify-center text-emerald-500/40 origin-left"
                                >
                                    <ArrowRight className="w-6 h-6 md:w-8 md:h-8 animate-pulse" />
                                </motion.div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </Card>
    );
});
