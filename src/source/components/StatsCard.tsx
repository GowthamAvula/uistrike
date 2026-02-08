"use client";
import React from "react";
import { GlassCard } from "./GlassCard";
import { TrendingUp, Award } from "lucide-react";

export function StatsCard() {
    return (
        <GlassCard className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-300 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-900/40">
                    <Award size={20} className="text-white" />
                </div>
                <div>
                    <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Miles Balance</div>
                    <div className="text-xl font-bold text-white flex items-baseline gap-1">
                        42,850
                        <span className="text-xs text-amber-400 font-medium">+1,240</span>
                    </div>
                </div>
            </div>
            <div className="h-full w-px bg-white/10 mx-2"></div>
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-900/40">
                    <TrendingUp size={20} className="text-white" />
                </div>
                <div>
                    <div className="text-xs text-white/50 font-medium uppercase tracking-wider">Status</div>
                    <div className="text-xl font-bold text-white">Platinum</div>
                </div>
            </div>
        </GlassCard>
    );
}
