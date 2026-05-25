"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Alex Rivera",
        role: "Senior Software Architect @ TechFlow",
        content: "This tool changed our entire onboarding process. We can now prototype full system architectures in minutes instead of weeks. The code quality is surprisingly high.",
        avatar: "AR",
    },
    {
        name: "Sarah Chen",
        role: "Founder @ LaunchPad",
        content: "The smart tech stack recommendation is spot on. It saved us months of research and potential debt. Highly recommended for any startup founder.",
        avatar: "SC",
    },
    {
        name: "James Wilson",
        role: "Engineering Manager @ CloudScale",
        content: "The ZIP export feature is a game-changer. It generates a perfectly structured Next.js project that follows all our internal best practices.",
        avatar: "JW",
    },
];

export const Testimonials = () => {
    return (
        <section className="py-24 bg-dark/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Trusted by <span className="text-gradient">Innovators</span>
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        See how the worlds most efficient teams are using AI Project Architect to ship faster.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full border-white/5 bg-white/5 relative">
                                <Quote className="absolute top-4 right-6 w-10 h-10 text-primary/10 -z-10" />
                                <p className="text-text-secondary mb-8 relative z-10 italic">
                                    &quot;{testimonial.content}&quot;
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-lg">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{testimonial.name}</h4>
                                        <p className="text-xs text-text-muted">{testimonial.role}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
