"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard, TextGradient } from "@/components/ui/DesignSystem";
import { Brain, Code2, Rocket, Shield, ArrowRight } from "lucide-react";

export const Features = () => {
    const features = [
        {
            title: "Neural Architecture",
            description: "Advanced AI models that understand complex system design requirements instantly.",
            icon: <Brain className="w-8 h-8 text-primary" />,
            glow: "rgba(59, 130, 246, 0.2)"
        },
        {
            title: "Production Code",
            description: "Generate clean, scalable, and type-safe boilerplate code following industry best practices.",
            icon: <Code2 className="w-8 h-8 text-secondary" />,
            glow: "rgba(139, 92, 246, 0.2)"
        },
        {
            title: "Rapid Deployment",
            description: "One-click cloud deployments with pre-configured infrastructure as code.",
            icon: <Rocket className="w-8 h-8 text-accent" />,
            glow: "rgba(34, 211, 238, 0.2)"
        },
        {
            title: "Security by Design",
            description: "Encrypted data layers and SOC2-compliant architecture principles built-in.",
            icon: <Shield className="w-8 h-8 text-white" />,
            glow: "rgba(255, 255, 255, 0.1)"
        }
    ];

    return (
        <section id="features" className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase mb-4 block">Platform Core</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
                        Everything you need <br /> to <TextGradient>scale faster.</TextGradient>
                    </h2>
                    <p className="text-white/40 text-lg leading-relaxed">
                        Industry-standard architecture meets next-generation artificial intelligence.
                        Designed for teams that don't compromise on quality.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassCard className="h-full" glowColor={feature.glow}>
                                <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] w-fit border border-white/[0.05]">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>

                                <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-2 text-primary-vibrant text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                    Learn More <ArrowRight className="w-3 h-3" />
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

