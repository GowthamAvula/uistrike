"use client";

import React, { useState, useRef } from "react";
import { Title, Text, Group, Stack, Badge } from "@mantine/core";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { GlassCard } from "./GlassCard";
import {
    ArrowRight,
    Globe,
    CloudRain,
    Plane,
    Navigation,
    LayoutDashboard,
    ShoppingCart,
    Heart,
    Compass
} from "lucide-react";

export function LandingPage({ onEnter }: { onEnter: (target?: string) => void }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [activeVideo, setActiveVideo] = useState(1);
    const [isGlobeFocused, setIsGlobeFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const flightData = {
        temp: "24°C",
        condition: "Clear Sky",
        wind: "12 km/h",
        destination: "Sydney (SYD)",
        status: "ON-TRACK",
        progress: 65
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;
        setMousePos({ x, y });
    };

    const MagneticButton = ({ children, className, onClick, ...props }: React.ComponentPropsWithoutRef<typeof motion.button>) => {
        const btnRef = useRef<HTMLButtonElement>(null);
        const [position, setPosition] = useState({ x: 0, y: 0 });

        const handleMouse = (e: React.MouseEvent) => {
            if (!btnRef.current) return;
            const { clientX, clientY } = e;
            const { left, top, width, height } = btnRef.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            setPosition({ x: x * 0.3, y: y * 0.3 });
        };

        return (
            <motion.button
                ref={btnRef}
                onMouseMove={handleMouse}
                onMouseLeave={() => setPosition({ x: 0, y: 0 })}
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                onClick={onClick}
                className={className}
                {...props}
            >
                {children}
            </motion.button>
        );
    };

    const floatingVariants: Variants = {
        initial: { y: 0 },
        animate: {
            y: [0, -10, 0],
            transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30, filter: "blur(20px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full overflow-hidden bg-[#020308] text-white font-sans selection:bg-cyan-500/30"
        >
            {/* Background Videos with Manual Control */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeVideo}
                    initial={{ opacity: 0, scale: 1.1, x: 30 }}
                    animate={{
                        opacity: 1,
                        scale: isGlobeFocused ? 1.08 : 1.03,
                        x: isGlobeFocused ? mousePos.x * 1.5 : mousePos.x * 0.4,
                        y: isGlobeFocused ? mousePos.y * 1.5 : mousePos.y * 0.4,
                        filter: isGlobeFocused ? "brightness(0.7) contrast(1.2)" : "brightness(0.5) contrast(1)"
                    }}
                    exit={{ opacity: 0, scale: 0.95, x: -30 }}
                    transition={{
                        duration: 1,
                        ease: [0.23, 1, 0.32, 1], // Smoother ease-out
                    }}
                    style={{ willChange: "transform, scale, filter" }}
                    className="absolute inset-0 z-0 h-full w-full"
                >
                    <video
                        key={activeVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover saturate-[1.2]"
                        src={
                            activeVideo === 1
                                ? "/videos/globe-transition-1.mp4"
                                : activeVideo === 2
                                    ? "/videos/globe-transition-2.mp4"
                                    : "/videos/globe-transition-3.mp4"
                        }
                    />
                </motion.div>
            </AnimatePresence>

            {/* Global Control Hitbox (Large invisible area over middle-right where globe usually is) */}
            <div
                className="absolute inset-x-[30%] inset-y-[10%] z-5 cursor-default"
                onMouseEnter={() => setIsGlobeFocused(true)}
                onMouseLeave={() => setIsGlobeFocused(false)}
            />


            {/* Cinematic Overlays */}
            <div className="absolute inset-0 z-[1] pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(1400px 800px at calc(50% + ${mousePos.x * 2}px) calc(50% + ${mousePos.y * 2}px), rgba(30, 80, 255, 0.08), transparent 70%),
                            linear-gradient(to bottom, transparent, rgba(2, 3, 8, 0.95))
                        `,
                        backdropFilter: "blur(0.5px)"
                    }}
                />
            </div>

            {/* Navigation Header */}
            <header className="relative z-50 flex items-center justify-between px-10 py-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
                    <motion.div
                        animate={{
                            borderColor: ["rgba(34,211,238,0.2)", "rgba(168,85,247,0.4)", "rgba(34,211,238,0.2)"],
                            boxShadow: ["0 0 0px rgba(34,211,238,0)", "0 0 20px rgba(34,211,238,0.2)", "0 0 0px rgba(34,211,238,0)"]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-2 rounded-xl bg-cyan-500/10 border backdrop-blur-md"
                    >
                        <Navigation size={24} className="text-cyan-400" />
                    </motion.div>
                    <Text fw={900} size="xl" className="tracking-tighter text-2xl">
                        TAMBO <motion.span
                            animate={{ color: ["#22d3ee", "#a855f7", "#22d3ee"] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >SKY</motion.span>
                    </Text>
                </motion.div>

                <Group gap="xl" className="hidden md:flex">
                    {[
                        { label: "Explorer", icon: <LayoutDashboard size={14} />, tab: "dashboard" },
                        { label: "Bookings", icon: <Plane size={14} />, tab: "flights" },
                        { label: "Bazaar", icon: <ShoppingCart size={14} />, tab: "market" }
                    ].map((nav, i) => (
                        <motion.button
                            key={nav.label}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ color: "#22d3ee", scale: 1.05 }}
                            transition={{ delay: 0.1 * i }}
                            onClick={() => onEnter(nav.tab)}
                            className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/50 transition-all font-mono"
                        >
                            {nav.icon}
                            {nav.label}
                        </motion.button>
                    ))}
                </Group>
            </header>

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] max-w-[1400px] flex-col justify-center px-10 pb-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                    className="flex flex-col lg:flex-row items-center justify-between gap-16"
                >
                    {/* Copy Column */}
                    <motion.div variants={itemVariants} className="flex-1 space-y-12">
                        <div className="space-y-6">
                            <motion.div
                                animate={{
                                    backgroundColor: ["rgba(255,255,255,0.05)", "rgba(34,211,238,0.1)", "rgba(255,255,255,0.05)"],
                                    borderColor: ["rgba(255,255,255,0.1)", "rgba(34,211,238,0.3)", "rgba(255,255,255,0.1)"]
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                                className="inline-flex items-center gap-3 px-5 py-2 rounded-full border backdrop-blur-2xl"
                            >
                                <Compass size={16} className="text-cyan-400" />
                                <Text size="xs" fw={900} className="tracking-[0.25em] uppercase text-cyan-100/80">
                                    Next-Gen Travel Architecture
                                </Text>
                            </motion.div>

                            <div className="relative">
                                <Title
                                    className="text-7xl lg:text-9xl font-black leading-[0.85] tracking-[-0.05em] select-none"
                                    style={{ transform: `translate(${mousePos.x * 0.05}px, ${mousePos.y * 0.05}px)` }}
                                >
                                    Fly. Heal. <br />
                                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                                        Connect.
                                    </span>
                                </Title>
                                {/* Glow under title */}
                                <motion.div
                                    animate={{
                                        opacity: [0.2, 0.4, 0.2],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 6, repeat: Infinity }}
                                    className="absolute -bottom-10 left-0 w-full h-20 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"
                                />
                            </div>

                            <div className="space-y-4 max-w-[580px]">
                                <Text className="text-2xl text-white font-bold leading-tight">
                                    The unified command center for students venturing across world borders.
                                </Text>
                                <Text className="text-lg text-zinc-400 font-medium leading-relaxed">
                                    Tambo Sky seamlessly blends high-resolution <strong>flight booking</strong> with holistic <strong>wellness tracking</strong>.
                                </Text>
                            </div>
                        </div>

                        <Group gap="xl">
                            <MagneticButton
                                onClick={() => onEnter("flights")}
                                className="group relative px-12 py-5 rounded-2xl bg-white text-black overflow-hidden shadow-2xl shadow-cyan-500/20"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="relative z-10 flex items-center gap-3 text-lg font-black tracking-tight group-hover:text-white transition-colors">
                                    ENTER FLIGHT DECK <ArrowRight size={22} />
                                </span>
                            </MagneticButton>

                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                                onClick={() => setActiveVideo(activeVideo === 3 ? 1 : activeVideo + 1)}
                                className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl transition-all font-black text-xs tracking-widest uppercase border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    <Globe size={18} className="text-cyan-400" />
                                </motion.div>
                                Switch Horizon
                            </motion.button>

                        </Group>
                    </motion.div>

                    {/* Adjustable Floating Weather Widget */}
                    <motion.div
                        variants={itemVariants}
                        className="flex-shrink-0 relative z-30"
                    >
                        <motion.div
                            variants={floatingVariants}
                            initial="initial"
                            animate="animate"
                            whileHover={{
                                scale: 1.05,
                                rotateY: 10,
                                rotateX: -5,
                                transition: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                            style={{
                                perspective: "1200px",
                                transformStyle: "preserve-3d"
                            }}
                        >
                            <GlassCard
                                className="w-full max-w-[380px] p-0 overflow-hidden"
                                style={{
                                    transform: "translateZ(50px)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    background: "rgba(2,3,8,0.6)",
                                    backdropFilter: "blur(40px)"
                                }}
                            >
                                {/* Header */}
                                <div className="p-8 border-b border-white/5 bg-white/[0.03]">
                                    <Group justify="space-between">
                                        <Stack gap={0}>
                                            <div className="flex items-center gap-2 text-cyan-400">
                                                <Compass size={12} strokeWidth={3} />
                                                <Text size="xs" fw={900} className="tracking-[0.3em] uppercase opacity-60">Horizon</Text>
                                            </div>
                                            <Title order={3} className="text-3xl font-black">Global Hub</Title>
                                        </Stack>
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                color: ["#22d3ee", "#fff", "#22d3ee"]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="p-3 rounded-2xl bg-cyan-400/10 border border-cyan-400/20"
                                        >
                                            <CloudRain size={20} />
                                        </motion.div>
                                    </Group>
                                </div>

                                {/* Body */}
                                <div className="p-8 space-y-8">
                                    <div className="flex justify-between items-end">
                                        <motion.div
                                            animate={{ color: ["#fff", "#22d3ee", "#fff"] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                        >
                                            <Title className="text-6xl font-black tracking-tighter">{flightData.temp}</Title>
                                        </motion.div>
                                        <Text fw={800} size="sm" className="text-zinc-500 uppercase pb-2 tracking-widest">{flightData.condition}</Text>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 bg-white/[0.03] p-5 rounded-2xl border border-white/5">
                                        <Stack gap={0}>
                                            <Text size="xs" fw={900} className="text-zinc-500 uppercase tracking-widest text-[8px]">Wind Velocity</Text>
                                            <Text size="sm" className="font-bold">{flightData.wind}</Text>
                                        </Stack>
                                        <Stack gap={0}>
                                            <Text size="xs" fw={900} className="text-zinc-500 uppercase tracking-widest text-[8px]">Visibility</Text>
                                            <Text size="sm" className="font-bold text-cyan-400">TOTAL</Text>
                                        </Stack>
                                    </div>

                                    {/* Sub-widget (Status) */}
                                    <div className="space-y-3">
                                        <Group justify="space-between">
                                            <Text size="xs" fw={900} className="text-cyan-400/60 uppercase tracking-widest text-[8px]">Active Sync</Text>
                                            <Badge color="cyan" variant="outline" size="xs" className="text-[8px] font-black border-cyan-400/30">LIVE</Badge>
                                        </Group>
                                        <Text size="sm" fw={800} className="opacity-90">{flightData.destination}</Text>
                                        <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: "65%",
                                                    backgroundColor: ["#22d3ee", "#3b82f6", "#22d3ee"]
                                                }}
                                                transition={{
                                                    width: { duration: 2, ease: "easeOut" },
                                                    backgroundColor: { duration: 3, repeat: Infinity }
                                                }}
                                                className="h-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-8 py-4 bg-white/[0.02] flex justify-between items-center opacity-40">
                                    <Heart size={12} className="text-white" />
                                    <Text size="xs" fw={900} className="uppercase tracking-[.2em] text-[8px]">Standby Mode</Text>
                                    <div className="flex gap-1">
                                        <motion.div
                                            animate={{ opacity: [1, 0.2, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="w-1 h-1 rounded-full bg-cyan-400"
                                        />
                                        <div className="w-1 h-1 rounded-full bg-white/20" />
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Vibrant Ambient Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.05, 0.1, 0.05],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[180px]"
                />
            </div>
        </div>
    );
}
