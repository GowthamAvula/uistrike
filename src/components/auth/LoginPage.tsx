"use client";

import React, { useState } from "react";
import { Stack, Text, Title, TextInput, Button, Paper, Group } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { User, ArrowRight, Plane, MapPin, Calendar } from "lucide-react";

interface LoginPageProps {
    onLogin: (name: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);

    const handleLogin = () => {
        if (!name.trim()) {
            setError(true);
            return;
        }
        onLogin(name.trim());
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `
                        linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Floating Orbs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-[480px] px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Logo/Brand */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <motion.div
                            animate={{ rotate: [0, 5, 0, -5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-block mb-4"
                        >
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
                                <Plane size={40} className="text-white" strokeWidth={2.5} />
                            </div>
                        </motion.div>
                        <Title className="text-4xl font-black text-white tracking-tight">Flight Navi</Title>
                        <Text className="text-blue-200 font-medium mt-2">Your Journey Begins Here</Text>
                    </motion.div>

                    {/* Login Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <Paper
                            radius="2xl"
                            className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 shadow-2xl"
                        >
                            <Stack gap="lg">
                                <Stack gap="xs">
                                    <Text className="text-2xl font-black text-white">Welcome Aboard</Text>
                                    <Text className="text-sm text-blue-200">Enter your details to access the flight deck</Text>
                                </Stack>

                                {/* Name Input with Micro-Animation */}
                                <div className="relative">
                                    <motion.div
                                        animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <Stack gap={8}>
                                            <Text className="text-xs font-bold text-blue-300 uppercase tracking-wider">Passenger Name</Text>
                                            <div className="relative group">
                                                <motion.div
                                                    className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity"
                                                    animate={{ rotate: [0, 360] }}
                                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                                />
                                                <div className="relative">
                                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-300 z-10" />
                                                    <TextInput
                                                        placeholder="Enter your name..."
                                                        value={name}
                                                        onChange={(e) => { setName(e.target.value); setError(false); }}
                                                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                                                        styles={{
                                                            input: {
                                                                height: '56px',
                                                                paddingLeft: '48px',
                                                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                                                border: error ? '2px solid rgba(239, 68, 68, 0.5)' : '2px solid rgba(255, 255, 255, 0.1)',
                                                                borderRadius: '12px',
                                                                color: 'white',
                                                                fontWeight: 700,
                                                                fontSize: '16px',
                                                                transition: 'all 0.3s',
                                                                '&:focus': {
                                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                                    borderColor: 'rgba(59, 130, 246, 0.8)',
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </Stack>
                                    </motion.div>

                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="mt-2"
                                            >
                                                <Text className="text-xs text-red-400 font-semibold">Please enter your name to continue</Text>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Login Button with Hover Animation */}
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        onClick={handleLogin}
                                        className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-xl text-white font-black uppercase tracking-wider text-sm shadow-lg shadow-blue-500/50 transition-all"
                                    >
                                        <Group gap="sm">
                                            <span>Enter Flight Deck</span>
                                            <motion.div
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                <ArrowRight size={20} />
                                            </motion.div>
                                        </Group>
                                    </Button>
                                </motion.div>
                            </Stack>
                        </Paper>
                    </motion.div>

                    {/* Bottom Info Cards with Stagger Animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="mt-8 grid grid-cols-3 gap-3"
                    >
                        {[
                            { icon: MapPin, label: "150+ Destinations", delay: 0.9 },
                            { icon: Plane, label: "500+ Flights", delay: 1.0 },
                            { icon: Calendar, label: "24/7 Booking", delay: 1.1 },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: item.delay, duration: 0.5 }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <Paper
                                    radius="lg"
                                    className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 text-center"
                                >
                                    <item.icon size={20} className="text-blue-400 mx-auto mb-2" />
                                    <Text className="text-xs font-bold text-white">{item.label}</Text>
                                </Paper>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
