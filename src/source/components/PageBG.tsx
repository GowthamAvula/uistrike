"use client";

import React from "react";

export function PageBG({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070a12] [background-image:radial-gradient(1200px_800px_at_10%_10%,rgba(59,130,246,0.14),transparent_60%),radial-gradient(900px_700px_at_90%_20%,rgba(168,85,247,0.14),transparent_55%),radial-gradient(900px_700px_at_40%_90%,rgba(34,197,94,0.10),transparent_55%),linear-gradient(120deg,#0b1220,#070a12)]">
            {/* Animated glow layer */}
            <div className="pointer-events-none absolute -inset-[40%] opacity-35 blur-[70px] animate-bgDrift [background:conic-gradient(from_180deg,rgba(59,130,246,0.20),rgba(168,85,247,0.20),rgba(34,197,94,0.14),rgba(59,130,246,0.20))] motion-reduce:animate-none" />

            {/* Grain (subtle) */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'180\' height=\'180\' filter=\'url(%23n)\' opacity=\'.35\'/%3E%3C/svg%3E')]" />

            {/* Content */}
            <div className="relative">{children}</div>
        </div>
    );
}
