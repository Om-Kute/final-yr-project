"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextGradient } from "@/components/ui/DesignSystem";

export const SocialProof = () => {
    const logos = ["OPENAI", "ANTHROPIC", "STRIPE", "VERCEL", "LINEAR", "APPLE", "META", "GOOGLE"];
    const stats = [
        { label: "Neural Patterns", value: "48,000+" },
        { label: "Deployment Success", value: "99.9%" },
        { label: "Engineering Hours Saved", value: "2.4M" },
        { label: "Sub-Second Blueprinting", value: "0.2s" }
    ];

    return (
        <section className="py-20 border-y border-white/5 bg-black/20 backdrop-blur-3xl overflow-hidden">
            {/* Logos Marquee */}
            <div className="container mx-auto px-6 mb-20 text-center">
                <span className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase mb-12 block italic">INTEGRATED WITH POWERHOUSE INTELLIGENCE</span>
                <div className="relative flex overflow-hidden">
                    <div className="flex animate-marquee whitespace-nowrap gap-20 items-center grayscale opacity-30">
                        {[...logos, ...logos].map((logo, i) => (
                            <span key={i} className="text-2xl md:text-4xl font-black text-white tracking-tighter">{logo}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats section */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tighter">
                                <TextGradient>{stat.value}</TextGradient>
                            </div>
                            <div className="text-[10px] md:text-sm font-bold text-white/30 uppercase tracking-[0.2em]">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </section>
    );
};
