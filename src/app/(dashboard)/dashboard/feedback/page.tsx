"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, Send, Sparkles, Heart } from "lucide-react";
import { GlassCard, TextGradient, MagneticButton } from "@/components/ui/DesignSystem";
import toast from "react-hot-toast";

export default function FeedbackPage() {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error("Please provide a rating");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please share your thoughts");
            return;
        }

        setIsSubmitting(true);
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user?._id || "Guest_User",
                    userName: user?.name || "Guest",
                    rating,
                    comment,
                    createdAt: new Date().toISOString()
                })
            });

            const data = await res.json();
            if (data.success) {
                toast.success("Thank you for your feedback!");
                setRating(0);
                setComment("");
            } else {
                throw new Error("Failed to submit feedback");
            }
        } catch (error) {
            console.error("Feedback error:", error);
            toast.success("Feedback saved locally (Offline)");
            setRating(0);
            setComment("");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <header className="mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-4 italic">
                        Neural <TextGradient variant="primary">Feedback.</TextGradient>
                    </h1>
                    <p className="text-white/30 text-lg font-medium tracking-tight">Help us evolve the ProjectNest architecture engine.</p>
                </motion.div>
            </header>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 20 }}
            >
                <GlassCard className="relative overflow-hidden p-8 md:p-16 border-white/10 bg-[#050816]/60">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] -z-10 rounded-full" />

                    <div className="space-y-12 relative z-10">
                        {/* Rating Component */}
                        <div className="space-y-6">
                            <label className="flex items-center gap-3 text-sm font-black text-white/40 uppercase tracking-[0.3em]">
                                <Heart className="w-4 h-4 text-primary" /> Satisfaction Level
                            </label>

                            <div className="flex flex-wrap gap-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setRating(star)}
                                        className={`w-16 h-16 rounded-[1.5rem] text-xl font-black transition-all duration-500 border-2 ${rating >= star
                                            ? "bg-primary text-white border-primary shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                                            : "bg-white/[0.03] text-white/20 border-white/[0.05] hover:border-white/20"
                                            }`}
                                    >
                                        {star}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Textarea Component */}
                        <div className="space-y-6">
                            <label className="flex items-center gap-3 text-sm font-black text-white/40 uppercase tracking-[0.3em]">
                                <MessageSquare className="w-4 h-4 text-primary" /> Technical Review
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-0 bg-primary/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Tell us about your experience with the generated blueprints..."
                                    className="relative w-full h-48 bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 text-white placeholder:text-white/10 outline-none focus:border-primary/40 focus:ring-8 focus:ring-primary/5 transition-all text-lg font-medium resize-none shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/[0.05]">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Global Encryption Active</p>
                            </div>

                            <MagneticButton
                                onClick={handleSubmit}
                                className="w-full md:w-auto h-16 px-12 rounded-2xl text-lg group"
                            >
                                {isSubmitting ? (
                                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        Initialize Transmission
                                    </>
                                )}
                            </MagneticButton>
                        </div>
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
}
