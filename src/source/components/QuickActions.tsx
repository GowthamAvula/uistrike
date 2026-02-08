"use client";
import React from "react";
import { GlassCard } from "./GlassCard";
import { Plane, CreditCard, Shield, Map, Zap, Calendar } from "lucide-react";
// @ts-ignore
import { motion } from "framer-motion";

const ACTIONS = [
    { icon: Plane, label: "Book Flight", color: "from-blue-400 to-indigo-500" },
    { icon: Map, label: "Explore", color: "from-emerald-400 to-teal-500" },
    { icon: Calendar, label: "Schedule", color: "from-amber-400 to-orange-500" },
    { icon: CreditCard, label: "Wallet", color: "from-purple-400 to-fuchsia-500" },
];

export function QuickActions() {
    return (
        <div className="grid grid-cols-4 gap-3">
            {ACTIONS.map((action, idx) => (
                <ActionItem key={action.label} action={action} index={idx} />
            ))}
        </div>
    );
}

function ActionItem({ action, index }: { action: typeof ACTIONS[0], index: number }) {
    return (
        <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-3 p-2 group"
        >
            <div className="relative h-14 w-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg overflow-hidden group-hover:border-white/20 transition-colors">
                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

                <action.icon size={24} className="text-white/90 relative z-10" />
            </div>
            <span className="text-[11px] font-medium text-white/60 group-hover:text-white/90 transition-colors">
                {action.label}
            </span>
        </motion.button>
    );
}
