"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Cpu, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Features", href: "/#features" },
        { name: "Capabilities", href: "/#capabilities" },
        { name: "About Us", href: "/#about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl"
        >
            <div className={`glass-navbar rounded-full px-8 py-3 flex items-center justify-between shadow-2xl transition-all duration-500 ${scrolled ? "bg-black/80 ring-1 ring-white/10" : "bg-black/40"}`}>
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                            <span className="text-white font-black text-lg italic">PN</span>
                        </div>
                        <span className="text-lg font-black text-white tracking-tighter">
                            PROJECT<span className="text-primary-vibrant">NEST</span> <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold">AI</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative text-[13px] font-bold text-white/80 hover:text-white transition-colors group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="hidden sm:block">
                        <Button variant="ghost" className="text-xs font-bold text-white/70 hover:text-white uppercase tracking-widest px-4">
                            Log In
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="bg-white text-black hover:bg-white/90 rounded-full font-bold px-6 h-10 text-[11px] uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all active:scale-95">
                            Elite Access
                        </Button>
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        className="lg:hidden p-2 text-white/40 hover:text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-20 left-1/2 -translate-x-1/2 w-full glass-navbar rounded-[2rem] p-8 lg:hidden border border-white/5 shadow-3xl"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-xl font-bold text-white/60 hover:text-white transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full text-white/60 font-bold uppercase tracking-widest h-14">
                                        Log In
                                    </Button>
                                </Link>
                                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full bg-white text-black font-bold h-14 rounded-2xl uppercase tracking-widest">
                                        Elite Access
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

