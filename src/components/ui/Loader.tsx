"use client";

import React from "react";
import { motion } from "framer-motion";

export const Loader = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="relative h-12 w-12">
                <motion.div
                    animate={{
                        rotate: 360,
                        borderRadius: ["25%", "50%", "25%"],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute inset-0 border-2 border-primary border-t-transparent shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                />
                <motion.div
                    animate={{
                        rotate: -360,
                        borderRadius: ["50%", "25%", "50%"],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute inset-2 border-2 border-accent border-b-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                />
            </div>
        </div>
    );
};
