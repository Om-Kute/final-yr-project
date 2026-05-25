"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MagneticButton, TextGradient } from "@/components/ui/DesignSystem";
import { ArrowRight, Play, Sparkles, Zap, Shield, Cpu } from "lucide-react";
import Link from "next/link";

export const Hero = () => {
    return (
        <section id="about" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-mesh-gradient">
            <div className="container mx-auto px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left Side: Content */}
                    <div className="max-w-2xl text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] mb-8 backdrop-blur-3xl"
                        >
                            <Sparkles className="w-4 h-4 text-primary-vibrant" />
                            <span className="text-[10px] font-bold text-white/50 tracking-[0.2em] uppercase">V3.0 Enterprise Intelligence</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]"
                        >
                            Architect <br />
                            <TextGradient className="block">Your Digital</TextGradient>
                            Empire.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-white/40 mb-12 leading-relaxed font-normal max-w-lg"
                        >
                            The most advanced AI infrastructure for modern engineering teams.
                            From neural blueprints to production-ready code in seconds.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row items-center gap-6"
                        >
                            <Link href="/signup">
                                <MagneticButton className="px-10 h-16 rounded-2xl text-lg">
                                    Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
                                </MagneticButton>
                            </Link>
                            <MagneticButton variant="secondary" className="px-10 h-16 rounded-2xl text-lg">
                                <Play className="mr-2 w-5 h-5 fill-white" /> Watch Keynote
                            </MagneticButton>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            className="mt-16 flex items-center gap-8 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                        >
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                <span className="text-[11px] font-bold uppercase tracking-widest">SOC2 COMPLIANT</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5" />
                                <span className="text-[11px] font-bold uppercase tracking-widest">SUB-SECOND LATENCY</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Futuristic UI */}
                    <div className="relative hidden lg:block">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-20"
                            style={{ perspective: "1000px" }}
                        >
                            <div className="relative rounded-3xl border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden shadow-3xl transform hover:rotate-y-12 transition-transform duration-1000">
                                <img
                                    src="/premium_dashboard_preview_1779430232897.png"
                                    alt="ProjectNest Dashboard"
                                    className="w-full h-auto opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Floating Micro-UI */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 w-64 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <Cpu className="text-primary w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">Neural Engine</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ width: ["0%", "85%", "0%"] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[160px] -z-10 rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    );
};

