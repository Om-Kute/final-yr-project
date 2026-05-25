"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Mail, MessageSquare, Send, User, CheckCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsSubmitted(true);
                toast.success("Message sent successfully!");
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                const data = await response.json();
                toast.error(data.error || "Failed to send message");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-black">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Get in <span className="text-gradient">Touch</span>
                        </h1>
                        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                            Have questions or ideas? We'd love to hear from you.
                            Our team at <span className="text-white font-semibold">ProjectNest AI</span> is here to help you build the future.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="md:col-span-1 space-y-6"
                        >
                            <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-md">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Email</h3>
                                        <p className="text-text-muted text-sm">support@projectnest.ai</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-md">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-3 bg-accent/10 rounded-lg">
                                        <MessageSquare className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Support</h3>
                                        <p className="text-text-muted text-sm">24/7 AI-powered assistance</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="md:col-span-2"
                        >
                            <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-xl relative overflow-hidden">
                                {isSubmitted ? (
                                    <div className="text-center py-12">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
                                        >
                                            <CheckCircle className="w-10 h-10 text-primary" />
                                        </motion.div>
                                        <h2 className="text-2xl font-bold text-white mb-2">Message Received!</h2>
                                        <p className="text-text-secondary mb-8">
                                            Thank you for reaching out. We'll get back to you shortly.
                                        </p>
                                        <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                                                    <User className="w-4 h-4" /> Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                                                    <Mail className="w-4 h-4" /> Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-secondary">Subject</label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                placeholder="How can we help?"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
                                                <MessageSquare className="w-4 h-4" /> Message
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={5}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                                                placeholder="Tell us about your project..."
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full h-12 flex items-center justify-center gap-2 text-lg"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Send Message <Send className="w-5 h-5" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
