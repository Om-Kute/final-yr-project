"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard, TextGradient } from "@/components/ui/DesignSystem";
import { CheckCircle2, Server, Smartphone, Cloud, ArrowRight } from "lucide-react";

export const Capabilities = () => {
    const caps = [
        {
            title: "Enterprise Backbone",
            description: "Built for massive scale with microservices architecture and high-availability clusters.",
            metrics: "99.99% Uptime",
            icon: <Server className="text-primary w-6 h-6" />
        },
        {
            title: "Multi-Platform Core",
            description: "Native-grade performance across web, iOS, and Android with unified business logic.",
            metrics: "1 Codebase",
            icon: <Smartphone className="text-secondary w-6 h-6" />
        },
        {
            title: "Global Intelligence",
            description: "Low-latency edge computing with AI models deployed at the source of interaction.",
            metrics: "< 50ms Latency",
            icon: <Cloud className="text-accent w-6 h-6" />
        }
    ];

    return (
        <section id="capabilities" className="py-32 relative bg-mesh-gradient">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="lg:w-1/2">
                        <span className="text-[10px] font-bold text-secondary tracking-[0.3em] uppercase mb-4 block">Capabilities</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                            Engineered for <br /><TextGradient>Extreme Scale.</TextGradient>
                        </h2>
                        <p className="text-white/40 text-lg mb-12 max-w-lg leading-relaxed">
                            We don't just generate code; we architect entire ecosystems.
                            Our engine ensures your infrastructure is ready for the first thousand and the first million users.
                        </p>

                        <div className="space-y-6">
                            {["Zero-latency integration", "Post-quantum security layer", "Autonomous scaling protocols"].map((text) => (
                                <div key={text} className="flex items-center gap-4 text-white/60 font-bold tracking-tight">
                                    <CheckCircle2 className="text-primary w-5 h-5" />
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 grid grid-cols-1 gap-6">
                        {caps.map((cap, i) => (
                            <motion.div
                                key={cap.title}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <GlassCard className="flex items-center gap-8 group">
                                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] group-hover:scale-110 transition-transform">
                                        {cap.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-bold text-white tracking-tight">{cap.title}</h4>
                                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{cap.metrics}</span>
                                        </div>
                                        <p className="text-xs text-white/30 leading-relaxed">{cap.description}</p>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
