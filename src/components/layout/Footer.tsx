import React from "react";
import Link from "next/link";
import { Globe, Mail, Shield, Sparkles } from "lucide-react";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    const icons = [Globe, Mail, Shield];

    const sections = [
        {
            title: "Product",
            links: ["Features", "Capabilities", "Pricing", "Enterprise", "Security"]
        },
        {
            title: "Resources",
            links: ["Documentation", "API Reference", "Architecture Guide", "Neural Engineering"]
        },
        {
            title: "Company",
            links: ["About", "Careers", "Press", "Contact", "Terms"]
        }
    ];

    return (
        <footer className="pt-32 pb-12 relative overflow-hidden bg-black/40 border-t border-white/5">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-8 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                                <span className="text-white font-black text-xl italic">PN</span>
                            </div>
                            <span className="text-xl font-black text-white tracking-tighter">
                                PROJECT<span className="text-primary-vibrant">NEST</span> <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">AI</span>
                            </span>
                        </Link>
                        <p className="text-white/30 text-base leading-relaxed max-w-sm mb-8">
                            Empowering the next generation of software engineers with billion-dollar AI architecture and neural-driven design systems.
                        </p>
                        <div className="flex items-center gap-6">
                            {icons.map((Icon, i) => (
                                <a key={i} href="#" className="text-white/20 hover:text-primary transition-colors duration-300">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {sections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8 italic">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm text-white/30 hover:text-white transition-colors duration-300 font-bold">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-[10px] font-black text-white/20 tracking-[0.4em] uppercase">
                        © {currentYear} PROJECTNEST AI SYSTEMS. ALL RIGHTS RESERVED.
                    </div>
                    <div className="flex items-center gap-8 text-[10px] font-black text-white/20 tracking-[0.4em] uppercase">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            NETWORK OPERATIONAL
                        </div>
                        <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
                        <a href="#" className="hover:text-white transition-colors">SECURITY</a>
                    </div>
                </div>
            </div>

            {/* Background Glow */}
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />
        </footer>
    );
};
