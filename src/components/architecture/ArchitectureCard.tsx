"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Copy, Check, LucideIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export const COLORS = {
    purple: { border: 'border-purple-500/20', text: 'text-purple-400', bg: 'bg-purple-400' },
    blue: { border: 'border-blue-500/20', text: 'text-blue-400', bg: 'bg-blue-400' },
    cyan: { border: 'border-cyan-500/20', text: 'text-cyan-400', bg: 'bg-cyan-400' },
    emerald: { border: 'border-emerald-500/20', text: 'text-emerald-400', bg: 'bg-emerald-400' },
    rose: { border: 'border-rose-500/20', text: 'text-rose-400', bg: 'bg-rose-400' }
};

interface ArchitectureCardProps {
    title: string;
    items: string[];
    icon: LucideIcon;
    color: keyof typeof COLORS;
    isEmptyMessage?: string;
    className?: string;
}

export function ArchitectureCard({
    title,
    items,
    icon: Icon,
    color,
    isEmptyMessage = "No data available",
    className
}: ArchitectureCardProps) {
    const [copied, setCopied] = useState(false);
    const colorStyles = COLORS[color];

    const handleCopy = () => {
        if (items.length === 0) return;
        navigator.clipboard.writeText(items.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Card hover={true} className={twMerge(`bg-black/40 h-full flex flex-col ${colorStyles.border}`, className)}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${colorStyles.text}`} />
                    <h3 className="text-sm uppercase tracking-widest text-text-muted font-bold">{title}</h3>
                </div>
                {items.length > 0 && (
                    <button
                        onClick={handleCopy}
                        className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-text-muted hover:text-white transition-all transform hover:scale-105 active:scale-95"
                        title={`Copy ${title} items`}
                    >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                )}
            </div>

            <ul className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {items.length > 0 ? (
                    items.map((item, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start text-white text-sm"
                        >
                            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 mr-3 shrink-0 shadow-[0_0_8px_currentColor] ${colorStyles.bg}`}></span>
                            <span className="leading-relaxed font-medium">{item}</span>
                        </motion.li>
                    ))
                ) : (
                    <li className="text-text-muted text-sm italic py-4">{isEmptyMessage}</li>
                )}
            </ul>
        </Card>
    );
}
