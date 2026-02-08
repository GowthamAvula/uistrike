"use client";
import React from "react";
import dynamic from "next/dynamic";
import { GlassCard } from "./GlassCard";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

// Dynamically import the heavy 3D scene (no SSR)
const ActiveMissionHero3D = dynamic(() => import("./ActiveMissionHero3D"), {
    ssr: false,
    loading: () => <div className="h-[340px] w-full" />,
});

export function ActiveMissionHero() {
    const reduced = usePrefersReducedMotion();

    return (
        <GlassCard className="relative overflow-hidden p-0 h-[380px] group border-zinc-100 bg-white shadow-2xl rounded-[3rem]">
            {/* Header text/UI layer - Z-indexed above canvas */}
            <div className="absolute top-0 left-0 right-0 z-10 p-8 pointer-events-none">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse-slow"></span>
                            <span className="text-xs font-black tracking-[0.2em] text-indigo-500 uppercase">Live Route</span>
                        </div>
                        <h2 className="text-3xl font-black text-zinc-950 tracking-tight drop-shadow-sm">Global Flight</h2>
                        <div className="mt-1 flex items-center text-zinc-500 text-sm font-bold">
                            <span>SFO</span>
                            <span className="mx-2 text-zinc-300">→</span>
                            <span>DXB</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-orange-50 border border-orange-100 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                    <span className="text-xs text-orange-600 font-black uppercase tracking-wider">On Air</span>
                </div>
            </div>

            {/* Video / Fallback */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-90 grayscale-[0.2]"
                >
                    <source src="/videos/globe-route.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
                {/* Clean vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40 pointer-events-none" />
            </div>
        </GlassCard>
    );
}

function StaticCinematicFallback() {
    return (
        <div className="relative h-full w-full bg-gradient-to-br from-cyan-900/40 via-blue-900/20 to-amber-900/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgba(77,235,255,0.1),transparent_60%)]" />
            <div className="absolute inset-0 bg-[url('/textures/grid-pattern.png')] opacity-10" />

            {/* Abstract decorative circles */}
            <div className="absolute top-1/2 right-[-10%] h-[300px] w-[300px] rounded-full border border-white/5 -translate-y-1/2" />
            <div className="absolute top-1/2 right-[-5%] h-[240px] w-[240px] rounded-full border border-white/10 -translate-y-1/2" />

            <div className="absolute bottom-6 left-6 text-xs text-white/40">
                Reduced motion enabled
            </div>
        </div>
    );
}
