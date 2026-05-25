"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Mail, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";

export const ContactCTA = () => {
    return (
        <section id="contact" className="py-40 relative overflow-hidden bg-[#050505]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-primary/5 blur-[120px] -z-10" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-white/[0.01] border border-white/[0.05] backdrop-blur-3xl rounded-[3rem] p-16 md:p-24 text-center overflow-hidden shadow-2xl"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] mb-10"
                    >
                        <Sparkles className="w-4 h-4 text-primary-vibrant" />
                        <span className="text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase">Enterprise Grade Intelligence</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 tracking-tighter leading-tight">
                        Architect Your Next <br />
                        <span className="text-white/40">Digital Empire.</span>
                    </h2>

                    <p className="text-white/30 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
                        Join the world&apos;s most ambitious engineering teams.
                        Experience the next generation of software design.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto px-10 h-14 text-base rounded-xl font-bold bg-white text-black hover:bg-white/90 transition-all duration-300">
                                Contact Sales <Mail className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                        <Link href="/signup" className="w-full sm:w-auto">
                            <Button variant="secondary" size="lg" className="w-full sm:w-auto px-10 h-14 text-base rounded-xl font-bold border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300">
                                Get Started <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="mt-16 pt-16 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-8"
                    >
                        {[
                            { value: "99.9%", label: "Uptime Promise" },
                            { value: "24/7", label: "AI Support" },
                            { value: "100+", label: "Tech Stacks" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="flex flex-col items-center"
                            >
                                <div className="text-white font-bold text-4xl mb-1 tabular-nums">{stat.value}</div>
                                <div className="text-text-muted text-sm uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
