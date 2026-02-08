"use client";
import React from "react";
import { GlassCard } from "./GlassCard";
import { motion } from "framer-motion";

const FRIENDS = [
    { id: 1, name: "Gowtham", location: "Home", x: 52, y: 72, avatar: "/user_photo.jpg", emoji: "🏠" },
    { id: 2, name: "Traveler A.", location: "Japan", x: 80, y: 38, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shelly", emoji: "⛩️" },
    { id: 3, name: "Friend B.", location: "Europe", x: 48, y: 32, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Edgar", emoji: "🏰" },
    { id: 4, name: "Explorer C.", location: "USA", x: 18, y: 35, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cecil", emoji: "🗽" },
];

export function FriendsLocationMap() {
    return (
        <GlassCard className="p-0 overflow-hidden relative h-[500px] flex flex-col border-zinc-100 bg-white shadow-2xl rounded-[3.5rem]">
            <div className="p-10 flex items-center justify-between relative z-20">
                <div>
                    <h3 className="text-2xl font-black text-zinc-950 tracking-tight">Real-time Location</h3>
                    <p className="text-base text-zinc-400 mt-1 font-bold">Track your network across the globe</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-6 h-12 rounded-2xl bg-zinc-950 text-white text-sm font-black hover:bg-zinc-800 transition-all uppercase tracking-wider shadow-xl">
                        Adjust Map
                    </button>
                </div>
            </div>

            <div className="flex-1 relative overflow-hidden bg-white group/map">
                {/* User's Specific 3D World Map Background */}
                <img
                    src="/map_bg.jpg"
                    className="absolute inset-0 w-full h-full object-contain p-8 opacity-90 scale-110 group-hover/map:scale-100 transition-transform duration-[2000ms]"
                    alt="World Map"
                />

                {/* Friend Markers - Placing them on the 3D globe image */}
                {FRIENDS.map((friend) => (
                    <motion.div
                        key={friend.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        whileHover={{ scale: 1.1, zIndex: 50 }}
                        drag
                        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                        className="absolute flex flex-col items-center cursor-grab active:cursor-grabbing"
                        style={{ left: `${friend.x}%`, top: `${friend.y}%` }}
                    >
                        <div className="relative group flex flex-col items-center">
                            {/* Floating Meaningful Emoji Pointer */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="mb-2 relative"
                            >
                                <span className="text-3xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] filter">
                                    {friend.emoji}
                                </span>
                                {/* Pointer Tip */}
                                <div className="w-0.5 h-4 bg-zinc-400 mx-auto -mt-1 opacity-50"></div>
                            </motion.div>

                            {/* Personalized Avatar Pill (Positioned below the pointer) */}
                            <div className="bg-white/90 backdrop-blur-xl px-2 py-2 rounded-full flex items-center gap-3 border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)] whitespace-nowrap">
                                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-inner bg-zinc-100">
                                    <img src={friend.avatar} className="w-full h-full object-cover" alt="" />
                                </div>
                                <div className="flex flex-col pr-4">
                                    <span className="text-sm font-black text-zinc-950 leading-none">{friend.name}</span>
                                    <span className="text-[10px] text-zinc-400 font-extrabold uppercase mt-1 tracking-widest">{friend.location}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </GlassCard>
    );
}
