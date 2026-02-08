"use client";
import React from "react";
import { GlassCard } from "./GlassCard";
import { Sparkles, ArrowRight } from "lucide-react";

export function OffersRail() {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 px-5">
                <Sparkles size={14} className="text-amber-400" />
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide">Special Offers</h3>
            </div>

            <div className="flex overflow-x-auto pb-4 px-5 gap-4 no-scrollbar snap-x">
                <OfferCard
                    title="Business Class Upgrade"
                    desc="Upgrade your flight to DXB for 15,000 miles."
                    color="from-blue-500 to-indigo-600"
                />
                <OfferCard
                    title="Double Miles to Tokyo"
                    desc="Book now and earn 2x miles on JAL routes."
                    color="from-rose-500 to-pink-600"
                />
                <OfferCard
                    title="Lounge Access"
                    desc="Complimentary access at LHR terminal 5."
                    color="from-emerald-500 to-teal-600"
                />
            </div>
        </div>
    );
}

function OfferCard({ title, desc, color }: { title: string, desc: string, color: string }) {
    return (
        <GlassCard className="min-w-[260px] p-0 overflow-hidden snap-center relative group">
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
            <div className="p-5 relative z-10">
                <div className="text-lg font-bold text-white mb-1 leading-tight">{title}</div>
                <p className="text-xs text-white/60 mb-4 line-clamp-2">{desc}</p>
                <div className="flex items-center text-xs font-semibold text-white/90 group-hover:gap-2 transition-all">
                    Claim Offer <ArrowRight size={14} className="ml-1" />
                </div>
            </div>
        </GlassCard>
    );
}
