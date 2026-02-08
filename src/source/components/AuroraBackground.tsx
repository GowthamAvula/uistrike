"use client";
// @ts-ignore
import { motion } from "framer-motion";

export function AuroraBackground() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0a0c]">
            {/* Base radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.5),transparent_100%)]" />

            {/* Animated Aurora Blooms */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: ["-10%", "10%", "-10%"],
                    y: ["-5%", "5%", "-5%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-500/10 blur-[120px] rounded-full"
            />

            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: ["10%", "-10%", "10%"],
                    y: ["5%", "-5%", "5%"],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-blue-500/10 blur-[120px] rounded-full"
            />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-purple-500/5 blur-[100px] rounded-full"
            />

            {/* Grain/Noise Overlay for premium texture */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />
        </div>
    );
}
