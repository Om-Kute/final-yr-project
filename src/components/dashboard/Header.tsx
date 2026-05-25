"use client";

import React from "react";
import { Search, Bell, Menu, User, Command } from "lucide-react";
import { useUI } from "@/hooks/useUI";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

export const Header = () => {
    const { toggleSidebar } = useUI();
    const { user } = useAuth();

    return (
        <header className="h-24 sticky top-0 z-40 flex items-center justify-between px-8 bg-[#050816]/10 backdrop-blur-3xl border-b border-white/[0.05]">
            {/* Glossy Gradient Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />

            <div className="flex items-center gap-6 flex-grow max-w-2xl relative">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleSidebar}
                    className="p-3 text-white/40 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-2xl transition-all duration-300"
                >
                    <Menu className="w-5 h-5" />
                </motion.button>

                <div className="relative group w-full max-w-xl">
                    <div className="absolute inset-0 bg-primary/5 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search neural blueprints or stack configurations..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-12 py-3.5 text-sm text-white placeholder:text-white/10 outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[9px] font-black text-white/20 uppercase tracking-widest hidden md:flex">
                        <Command className="w-3 h-3" /> K
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-3 text-white/40 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 rounded-2xl transition-all duration-300 group"
                >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(59,130,246,1)] animate-pulse" />
                </motion.button>

                <div className="flex items-center gap-4 pl-4 ml-2 border-l border-white/10 group cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-white tracking-tight group-hover:text-primary transition-colors leading-none">{user?.name || "Architect"}</p>
                        <div className="flex items-center justify-end gap-1.5 mt-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.2em]">Verified Elite</p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent p-[1px] shadow-2xl group-hover:scale-105 transition-transform duration-500">
                            <div className="w-full h-full bg-[#050816] rounded-[15px] flex items-center justify-center font-black text-white text-lg">
                                {user?.name?.[0] || <User className="w-5 h-5" />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
