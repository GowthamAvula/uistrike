import React from "react";

export function DashboardBackground({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />

            {/* Radar grid */}
            <div className="absolute inset-0 bg-radar-grid opacity-70 [mask-image:radial-gradient(circle_at_30%_10%,black,transparent_65%)]" />

            {/* Moving glow blobs */}
            <div className="pointer-events-none absolute inset-0">
                <div className="animate-glow absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-3xl bg-gradient-to-r from-cyan-500/18 via-indigo-500/12 to-fuchsia-500/14" />
                <div className="animate-glow absolute top-48 left-[15%] h-[420px] w-[520px] rounded-full blur-3xl bg-gradient-to-r from-emerald-500/12 via-sky-500/10 to-cyan-500/12 [animation-delay:2.5s]" />
            </div>

            {/* Subtle “flight paths” overlay (static, classy) */}
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
                viewBox="0 0 1200 700"
                fill="none"
            >
                <path
                    d="M-50 520 C 220 260, 480 260, 720 380 S 1180 580, 1300 220"
                    stroke="rgba(226,232,240,0.55)"
                    strokeWidth="1.5"
                    strokeDasharray="6 10"
                />
                <path
                    d="M-80 220 C 180 80, 520 120, 760 220 S 1120 420, 1280 160"
                    stroke="rgba(56,189,248,0.45)"
                    strokeWidth="1.25"
                    strokeDasharray="4 12"
                />
            </svg>

            {/* Noise */}
            <div className="pointer-events-none absolute inset-0 noise-layer" />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
