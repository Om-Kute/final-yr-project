"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, Sparkles, Loader2, ArrowUpRight } from "lucide-react";
import { useProject } from "@/hooks/useProject";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import toast from "react-hot-toast";

export const AIChatPanel = () => {
    const {
        chatMessages, addChatMessage, isChatLoading, setChatLoading,
        generatedResult, setGeneratedResult
    } = useProject();
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatMessages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isChatLoading) return;

        const userMsg = inputValue.trim();
        setInputValue("");

        // Add user message to state
        addChatMessage({
            role: "user",
            content: userMsg,
            timestamp: new Date().toISOString(),
        });

        setChatLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentArchitecture: generatedResult,
                    userMessage: userMsg
                }),
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            // Update architecture
            setGeneratedResult(data.updatedArchitecture);

            // Add assistant response
            addChatMessage({
                role: "assistant",
                content: `I've updated the architecture based on your request. I added support for "${userMsg}" and refined the system components accordingly. You can review the changes in the tabs.`,
                timestamp: new Date().toISOString(),
            });

            toast.success("Architecture updated by AI assistant!");
        } catch (error) {
            console.error("Chat Error:", error);
            toast.error("Failed to refine architecture. Please try again.");
            addChatMessage({
                role: "assistant",
                content: "I encountered an error while trying to update the architecture. Please try again or rephrase your request.",
                timestamp: new Date().toISOString(),
            });
        } finally {
            setChatLoading(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] border border-purple-400/30 group"
                >
                    <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center"
                    >
                        <Sparkles className="w-3 h-3 text-white" />
                    </motion.div>
                </motion.button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        className="fixed bottom-8 right-8 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)]"
                    >
                        <Card className="h-full flex flex-col border border-white/10 bg-[#0d1117]/95 backdrop-blur-xl shadow-2xl p-0 overflow-hidden">
                            {/* Header */}
                            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/20 flex items-center justify-center text-purple-400">
                                        <Bot className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-sm">Arch Architect</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] text-emerald-400 font-bold tracking-wider uppercase">Active AI Agent</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
                            >
                                {chatMessages.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                                        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                                            <MessageSquare className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-white/80 font-bold">Iterate with AI</h4>
                                        <p className="text-white/40 text-xs leading-relaxed">
                                            Need specific changes? Tell the AI to "Add Stripe integration" or "Scale for 1M users".
                                        </p>
                                    </div>
                                ) : (
                                    chatMessages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[85%] flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border ${msg.role === 'user'
                                                        ? 'bg-blue-500/20 border-blue-500/20 text-blue-400'
                                                        : 'bg-purple-500/20 border-purple-500/20 text-purple-400'
                                                    }`}>
                                                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                                </div>
                                                <div className={`p-3 rounded-2xl text-xs leading-relaxed ${msg.role === 'user'
                                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                                        : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none'
                                                    }`}>
                                                    {msg.content}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                                {isChatLoading && (
                                    <div className="flex justify-start">
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/20 flex items-center justify-center text-purple-400">
                                                <Bot className="w-4 h-4" />
                                            </div>
                                            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                                                <div className="flex gap-1">
                                                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                                    <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                                </div>
                                                <span className="text-[10px] text-white/40 font-medium">AI is thinking...</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-white/10 bg-white/5 h-[80px]">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                                    className="relative flex items-center gap-2"
                                >
                                    <input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Modify architecture..."
                                        disabled={isChatLoading}
                                        className="w-full h-11 bg-black/40 border border-white/10 rounded-xl px-4 pr-12 text-xs text-white focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputValue.trim() || isChatLoading}
                                        className="absolute right-1.5 w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center hover:bg-purple-500 transition-colors disabled:opacity-20 disabled:hover:bg-purple-600"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
