"use client";
import React from "react";
import { GlassCard } from "./GlassCard";
import { Bell, Settings, Search } from "lucide-react";
// @ts-ignore
import { motion } from "framer-motion";

export function ProfileHeader() {
    return (
        <div className="flex items-center justify-between py-6 px-1">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white/20 shadow-lg relative z-10">
                        {/* Placeholder avatar */}
                        <img
                            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix"
                            alt="User"
                            className="h-full w-full object-cover bg-indigo-900/50"
                        />
                    </div>
                    {/* Online indicator */}
                    <div className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-emerald-500 border-2 border-[#0B1221] rounded-full z-20"></div>
                </div>

                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xs font-medium text-blue-300 uppercase tracking-wider mb-0.5"
                    >
                        Good Evening
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-bold text-white"
                    >
                        Commander Sheppard
                    </motion.h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <IconButton icon={Search} delay={0.1} />
                <IconButton icon={Bell} delay={0.2} hasBadge />
            </div>
        </div>
    );
}

function IconButton({ icon: Icon, delay, hasBadge }: { icon: any, delay: number, hasBadge?: boolean }) {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + delay }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="relative h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 transition-colors"
        >
            <Icon size={18} />
            {hasBadge && (
                <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
            )}
        </motion.button>
    );
}
