"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    PlusSquare,
    Files,
    GitCompare,
    Settings,
    LogOut,
    Cpu,
    Star,
    ChevronRight
} from "lucide-react";
import { useUI } from "@/hooks/useUI";
import { useAuth } from "@/hooks/useAuth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", color: "text-blue-400" },
    { icon: PlusSquare, label: "Create Project", href: "/dashboard/create-project", color: "text-purple-400" },
    { icon: Files, label: "My Projects", href: "/dashboard/projects", color: "text-emerald-400" },
    { icon: GitCompare, label: "Compare Projects", href: "/dashboard/compare", color: "text-orange-400" },
    { icon: Star, label: "Feedback", href: "/dashboard/feedback", color: "text-yellow-400" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings", color: "text-slate-400" },
];

export const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { sidebarOpen, setSidebarOpen } = useUI();
    const { logout } = useAuth();

    return (
        <aside
            className={cn(
                "fixed left-4 top-4 bottom-4 bg-[#050816]/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] transition-all duration-700 z-50 flex flex-col shadow-3xl overflow-hidden",
                sidebarOpen ? "w-72" : "w-24"
            )}
        >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

            {/* Header / Logo */}
            <div className="p-8 pb-4 relative">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Cpu className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    {sidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col"
                        >
                            <span className="font-black text-white tracking-tighter text-lg leading-tight">
                                ProjectNest <span className="text-primary italic">AI</span>
                            </span>
                            <span className="text-[9px] font-bold text-white/20 tracking-[0.2em] uppercase">Enterprise V3</span>
                        </motion.div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-grow px-4 space-y-2 mt-8 overflow-y-auto no-scrollbar">
                {menuItems.map((item, i) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={cn(
                                    "relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-500 group cursor-pointer",
                                    isActive
                                        ? "bg-white/[0.03] border border-white/10 text-white shadow-2xl"
                                        : "text-white/40 hover:text-white hover:bg-white/[0.02]"
                                )}
                            >
                                {/* Active Indicator Glow */}
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active-glow"
                                        className="absolute inset-0 bg-primary/5 blur-xl rounded-2xl"
                                    />
                                )}

                                <div className={cn(
                                    "relative w-6 h-6 flex items-center justify-center transition-all duration-500",
                                    isActive ? item.color : "group-hover:text-white"
                                )}>
                                    <item.icon className="w-5 h-5 shrink-0" />
                                </div>

                                {sidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-sm font-bold tracking-tight"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}

                                {isActive && sidebarOpen && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="ml-auto flex items-center"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                        <ChevronRight className="w-4 h-4 text-white/10 ml-2" />
                                    </motion.div>
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section / Profile */}
            <div className="p-6 mt-auto">
                <div className="relative group">
                    <button
                        onClick={() => {
                            logout();
                            router.push("/login");
                        }}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-red-500/10 hover:border-red-500/20 group transition-all duration-500"
                    >
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-500/20">
                            <LogOut className="w-4 h-4 text-white/40 group-hover:text-red-400 transition-colors" />
                        </div>
                        {sidebarOpen && (
                            <div className="flex flex-col items-start translate-y-[-1px]">
                                <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">Log Out</span>
                                <span className="text-[10px] text-white/20">Architect Session</span>
                            </div>
                        )}
                    </button>
                    {/* Floating Glow for Sidebar bottom */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 blur-[80px] -z-10 group-hover:bg-red-500/5 transition-all duration-1000" />
                </div>
            </div>
        </aside>
    );
};
