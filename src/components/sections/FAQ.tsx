"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, TextGradient } from "@/components/ui/DesignSystem";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: "How does the AI generate architectural blueprints?",
            a: "Our engine uses a multi-layered neural network trained on millions of open-source and enterprise-grade system designs to propose the most efficient architecture for your specific needs."
        },
        {
            q: "Can I export my project to multiple tech stacks?",
            a: "Yes. ProjectNest AI supports over 50+ modern combinations of frontend, backend, and database technologies, all with unified business logic and type safety."
        },
        {
            q: "Is my project data secure and private?",
            a: "Absolutely. We implement enterprise-grade encryption and follow SOC2 compliance standards. Your project data belongs only to you and is never used to train our public models."
        },
        {
            q: "Does ProjectNest AI support cloud deployment?",
            a: "Yes, we provide ready-to-use Docker configurations and Terraform scripts for AWS, Google Cloud, and Azure as part of your project export."
        }
    ];

    return (
        <section id="faq" className="py-32 relative bg-mesh-gradient">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-20">
                    <span className="text-[10px] font-bold text-accent tracking-[0.3em] uppercase mb-4 block">Knowledge Base</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter">
                        Common <TextGradient>Questions.</TextGradient>
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="group">
                            <GlassCard
                                className={`cursor-pointer !p-0 transition-all duration-500 overflow-hidden ${activeIndex === i ? "border-primary/30" : ""}`}
                                glowColor="rgba(34, 211, 238, 0.05)"
                            >
                                <div
                                    className="p-6 md:p-8 flex items-center justify-between"
                                    onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                >
                                    <div className="flex items-center gap-4">
                                        <HelpCircle className={`w-5 h-5 transition-colors duration-500 ${activeIndex === i ? "text-primary" : "text-white/20"}`} />
                                        <h3 className="font-bold text-white text-lg tracking-tight">{faq.q}</h3>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: activeIndex === i ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown className="w-5 h-5 text-white/20" />
                                    </motion.div>
                                </div>

                                <AnimatePresence>
                                    {activeIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-8 pb-8 pt-0 text-white/40 leading-relaxed text-base">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </GlassCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
