"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard, TextGradient, MagneticButton } from "@/components/ui/DesignSystem";
import { Check, Zap, Sparkles, Shield } from "lucide-react";

export const Pricing = () => {
    const tiers = [
        {
            name: "Basic",
            price: "Free",
            description: "Perfect for exploring AI architecture concepts.",
            features: ["3 Neural Blueprints / mo", "Standard Code Generation", "Community Support", "Public Projects"],
            cta: "Get Started",
            variant: "secondary"
        },
        {
            name: "Enterprise",
            price: "$49",
            description: "Designed for modern engineering teams and startups.",
            features: ["Unlimited Blueprints", "Elite Multi-Stack Generation", "Priority Cloud Support", "Private Project Vault", "SOC2 Compliance Layer", "Custom AI Training"],
            cta: "Start Elite Access",
            variant: "primary",
            highlight: true
        }
    ];

    return (
        <section id="pricing" className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase mb-4 block">Pricing</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
                        Built for <TextGradient>Global Scale.</TextGradient>
                    </h2>
                    <p className="text-white/40 text-lg leading-relaxed">
                        Transparent, enterprise-grade pricing. No hidden fees.
                        Just pure architectural intelligence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassCard
                                className={`h-full flex flex-col ${tier.highlight ? "ring-2 ring-primary/50 relative overflow-visible" : ""}`}
                                glowColor={tier.highlight ? "rgba(59, 130, 246, 0.3)" : "rgba(255, 255, 255, 0.05)"}
                            >
                                {tier.highlight && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-xl">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{tier.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-5xl font-black text-white tracking-tighter">{tier.price}</span>
                                        {tier.price !== "Free" && <span className="text-white/30 text-sm">/month</span>}
                                    </div>
                                    <p className="text-sm text-white/40 leading-relaxed">{tier.description}</p>
                                </div>

                                <div className="space-y-4 mb-20 flex-1">
                                    {tier.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-3 text-sm text-white/60">
                                            <Check className="w-4 h-4 text-primary" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <MagneticButton
                                    variant={tier.variant === "primary" ? "primary" : "secondary"}
                                    className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-xs"
                                >
                                    {tier.cta}
                                </MagneticButton>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
