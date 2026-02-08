"use client";

import React, { useState } from "react";
import { Stack, Text, Title, TextInput, Button, Group } from "@mantine/core";
import { motion } from "framer-motion";
import { User, ArrowRight, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
    onContinue: (name: string) => void;
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);

    const handleContinue = () => {
        if (!name.trim()) {
            setError(true);
            return;
        }
        onContinue(name.trim());
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#4A9FFF] via-[#6BB5FF] to-[#BEE3FF]">
            {/* Animated Background Clouds */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{ x: [-100, 100], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[10%] left-[10%] w-[400px] h-[200px] bg-white rounded-full blur-[80px]"
                />
                <motion.div
                    animate={{ x: [100, -100], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[40%] right-[10%] w-[500px] h-[300px] bg-white rounded-full blur-[100px]"
                />
            </div>

            {/* Hero Airplane */}
            <motion.div
                initial={{ x: -200, y: 100, opacity: 0, rotate: -10 }}
                animate={{ x: 0, y: 0, opacity: 1, rotate: 5 }}
                transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                className="absolute bottom-[-10%] right-[-5%] z-10 pointer-events-none hidden lg:block"
            >
                <img
                    src="https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2070&auto=format&fit=crop"
                    alt="Airplane"
                    className="w-[900px] drop-shadow-[0_50px_100px_rgba(0,0,0,0.2)]"
                    style={{ filter: "brightness(1.1) contrast(1.1)" }}
                />
            </motion.div>

            {/* Top Navigation */}
            <div className="absolute top-8 left-10 z-30">
                <Text fw={900} className="italic tracking-tighter text-3xl text-white">Wanderlust</Text>
            </div>

            {/* Main Content */}
            <div className="relative z-20 w-full max-w-[900px] px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <Stack gap="xl" align="center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white"
                        >
                            <Sparkles size={16} />
                            <Text size="xs" fw={900} className="tracking-[0.25em] uppercase">Experience the</Text>
                        </motion.div>

                        {/* Title */}
                        <Stack gap={10} align="center">
                            <Title className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white text-center leading-[0.9]">
                                Magic of Wanderlust
                            </Title>
                            <Text className="text-lg md:text-xl font-medium text-white/90 text-center max-w-[600px]">
                                Discover breathtaking destinations and unforgettable experiences around the world.
                            </Text>
                        </Stack>

                        {/* Search Bar Style Input */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="w-full max-w-[700px] mt-8"
                        >
                            <div className="bg-white rounded-[2rem] p-2 shadow-[0_20px_60px_rgba(0,102,255,0.25)] flex flex-col md:flex-row items-stretch gap-2">
                                {/* Name Input Section */}
                                <div className="flex-1 flex items-center gap-3 px-6 py-4 hover:bg-gray-50 rounded-[1.5rem] transition-colors group">
                                    <User size={20} className="text-blue-500 flex-shrink-0" />
                                    <div className="flex-1">
                                        <Text size="xs" fw={800} className="text-gray-400 uppercase tracking-wider mb-1">Passenger Name</Text>
                                        <TextInput
                                            variant="unstyled"
                                            placeholder="Enter your name to begin..."
                                            value={name}
                                            onChange={(e) => { setName(e.target.value); setError(false); }}
                                            onKeyPress={(e) => e.key === 'Enter' && handleContinue()}
                                            styles={{
                                                input: {
                                                    color: '#1a1a1a',
                                                    fontWeight: 800,
                                                    fontSize: '18px',
                                                    padding: 0,
                                                    border: 'none'
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Button */}
                                <Button
                                    onClick={handleContinue}
                                    className="bg-blue-600 hover:bg-blue-700 h-full min-h-[70px] px-8 rounded-[1.5rem] text-white font-black uppercase tracking-widest text-sm flex items-center gap-3 transition-all active:scale-95 shadow-lg"
                                >
                                    Find My Adventure
                                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                        <ArrowRight size={20} />
                                    </motion.div>
                                </Button>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-3 text-center"
                                >
                                    <Text size="sm" fw={700} className="text-white/90 bg-red-500/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block border border-red-300/30">
                                        Please enter your name to continue
                                    </Text>
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Social Proof */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-8"
                        >
                            <Group gap="xl" justify="center">
                                <Group gap={-10}>
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gray-200 shadow-lg">
                                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Traveler" />
                                        </div>
                                    ))}
                                </Group>
                                <Stack gap={0}>
                                    <Text size="sm" fw={900} className="text-white">10,000+ Happy Travelers</Text>
                                    <Group gap={3}>
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Sparkles key={s} size={12} className="text-yellow-300 fill-yellow-300" />
                                        ))}
                                        <Text size="xs" fw={700} className="text-white/80 ml-1">4.9/5</Text>
                                    </Group>
                                </Stack>
                            </Group>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="hidden md:block"
                        >
                            <Group gap={60}>
                                <Stack gap={0} align="center">
                                    <Text size="xs" fw={900} className="text-white/50 uppercase tracking-[0.3em]">Destinations</Text>
                                    <Text size="2xl" fw={900} className="text-white">150+</Text>
                                </Stack>
                                <Stack gap={0} align="center">
                                    <Text size="xs" fw={900} className="text-white/50 uppercase tracking-[0.3em]">Countries</Text>
                                    <Text size="2xl" fw={900} className="text-white">50+</Text>
                                </Stack>
                            </Group>
                        </motion.div>
                    </Stack>
                </motion.div>
            </div>
        </div>
    );
}
