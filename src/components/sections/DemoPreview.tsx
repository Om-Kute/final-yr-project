"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Activity, Bell, Search, User } from "lucide-react";

export const DemoPreview = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-accent/5 blur-[150px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Precision Engineering <br />
                        <span className="text-white/40">Visualized.</span>
                    </h2>
                    <p className="text-white/30 max-w-xl mx-auto text-base font-normal leading-relaxed">
                        An integrated design environment optimized for speed.
                        Manage enterprise-grade architectures through a unified command center.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="relative max-w-6xl mx-auto group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000" />

                    <Card className="relative overflow-hidden border-white/10 bg-white/5 backdrop-blur-3xl rounded-[3rem] p-4 shadow-2xl">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-50" />

                        <img
                            src="/premium_dashboard_preview_1779430232897.png"
                            alt="ProjectNest AI Dashboard Preview"
                            className="w-full h-auto object-cover rounded-[2.5rem] shadow-inner"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                            <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-white font-bold tracking-tight">AI Engine Online</span>
                            </div>
                            <Button variant="secondary" size="lg" className="glass border-white/10 hover:bg-white/10 font-bold px-8">
                                Explore Live Demo
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};
