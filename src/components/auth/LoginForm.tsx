"use client";

import React, { useState } from "react";
import { Stack, Text, Title, TextInput, Button, Checkbox, Group, Anchor, PasswordInput } from "@mantine/core";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Sparkles, Globe } from "lucide-react";

interface LoginFormProps {
    onLogin: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        // Demo login - just check if fields are filled
        setError("");
        onLogin();
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#4A9FFF] via-[#7EC8FF] to-[#BEE3FF]">
            {/* Animated Background Elements */}
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

            {/* Airplane Hero */}
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
            <div className="absolute top-10 inset-x-10 z-30 flex justify-between items-center px-10">
                <Group gap="xs" className="text-white">
                    <Text fw={900} className="italic tracking-tighter text-2xl">Wanderlust</Text>
                </Group>
                <Group gap="xl" className="hidden lg:flex">
                    {["Home", "Destinations", "Experiences", "About"].map((nav) => (
                        <Text key={nav} size="xs" fw={700} className="text-white/70 hover:text-white cursor-pointer transition-colors">{nav}</Text>
                    ))}
                    <Globe size={18} className="text-white/70" />
                </Group>
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-20 w-full max-w-[480px] mx-8"
            >
                <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-12 shadow-[0_40px_100px_rgba(0,102,255,0.2)] border border-white">
                    <Stack gap="xl">
                        {/* Header */}
                        <Stack gap="xs">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 w-fit"
                            >
                                <Sparkles size={14} />
                                <Text size="xs" fw={900} className="tracking-[0.2em] uppercase">Welcome Back</Text>
                            </motion.div>

                            <Title className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 leading-tight">
                                Sign in to your
                                <br />
                                <span className="relative inline-block mt-1">
                                    account
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1, delay: 0.8 }}
                                        className="absolute bottom-1 left-0 h-2 bg-blue-200 -z-10"
                                    />
                                </span>
                            </Title>
                        </Stack>

                        {/* Form */}
                        <Stack gap="md">
                            <div>
                                <Text size="xs" fw={800} className="text-gray-500 uppercase tracking-widest mb-2">Email Address</Text>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <TextInput
                                        placeholder="your.email@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-12"
                                        styles={{
                                            input: {
                                                height: '56px',
                                                borderRadius: '16px',
                                                border: '2px solid #e5e7eb',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                paddingLeft: '48px',
                                                transition: 'all 0.2s',
                                                '&:focus': {
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <Text size="xs" fw={800} className="text-gray-500 uppercase tracking-widest mb-2">Password</Text>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                                    <PasswordInput
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        styles={{
                                            input: {
                                                height: '56px',
                                                borderRadius: '16px',
                                                border: '2px solid #e5e7eb',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                paddingLeft: '48px',
                                                transition: 'all 0.2s',
                                                '&:focus': {
                                                    borderColor: '#3b82f6',
                                                    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 border border-red-200 rounded-xl p-3"
                                >
                                    <Text size="xs" fw={700} className="text-red-600">{error}</Text>
                                </motion.div>
                            )}

                            <Group justify="space-between">
                                <Checkbox
                                    label={<Text size="sm" fw={600} className="text-gray-600">Remember me</Text>}
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.currentTarget.checked)}
                                    styles={{
                                        input: {
                                            cursor: 'pointer',
                                            borderRadius: '6px'
                                        }
                                    }}
                                />
                                <Anchor size="sm" fw={700} className="text-blue-600 hover:text-blue-700">
                                    Forgot password?
                                </Anchor>
                            </Group>

                            <Button
                                onClick={handleLogin}
                                className="bg-blue-600 hover:bg-blue-700 h-14 rounded-2xl text-white font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 group transition-all active:scale-95 shadow-[0_10px_30px_rgba(37,99,235,0.3)] mt-2"
                            >
                                Sign In
                                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                    <ArrowRight size={20} />
                                </motion.div>
                            </Button>
                        </Stack>

                        {/* Footer */}
                        <div className="text-center pt-4 border-t border-gray-100">
                            <Text size="sm" className="text-gray-600">
                                Don't have an account?{' '}
                                <Anchor fw={700} className="text-blue-600 hover:text-blue-700">
                                    Sign up for free
                                </Anchor>
                            </Text>
                        </div>
                    </Stack>
                </div>

                {/* Social Proof */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-center"
                >
                    <Group justify="center" gap="xl">
                        <Group gap={-10}>
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                                </div>
                            ))}
                        </Group>
                        <Text size="sm" fw={700} className="text-white">
                            Join 10,000+ travelers exploring the world
                        </Text>
                    </Group>
                </motion.div>
            </motion.div>
        </div>
    );
}
