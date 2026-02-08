"use client";
import React from "react";
import { Search, Bell, Monitor, Smartphone, Apple } from "lucide-react";
import { Avatar } from "@mantine/core";

import { DashboardBackground } from "./DashboardBackground";
import { BookedTicketsCard } from "./BookedTicketsCard";
import { FlightCouponsSection } from "./FlightCouponsSection";

const USER_AVATAR = "https://raw.githubusercontent.com/mantinedev/mantine/master/docs/src/docs/images/avatar-1.png";

export function DashboardPage() {
    return (
        <DashboardBackground>
            <div className="min-h-screen text-white pb-32 overflow-x-hidden selection:bg-cyan-500/30 relative">
                <div className="max-w-[1400px] mx-auto relative z-10 px-8 py-10">

                    {/* 1. Header Area - Clean & High Contrast */}
                    <header className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-6">
                            <Avatar
                                src={USER_AVATAR}
                                size={64}
                                radius="xl"
                                className="border-4 border-white shadow-2xl"
                            />
                            <div>
                                <h1 className="text-4xl font-black text-white flex items-center gap-4 tracking-tight">
                                    Good Morning, Gowtham
                                    <span className="animate-bounce">👋</span>
                                </h1>
                                <p className="text-zinc-300 font-bold mt-1">Plan your itinerary with us</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex gap-2 p-1 bg-white rounded-full shadow-md border border-zinc-100">
                                <button className="p-3 rounded-full hover:bg-zinc-50 text-zinc-900 transition-colors shadow-sm"><Search size={20} /></button>
                                <button className="p-3 rounded-full hover:bg-zinc-50 text-zinc-900 transition-colors relative shadow-sm">
                                    <Bell size={20} />
                                    <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
                                </button>
                            </div>
                            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-md border border-white/10">
                                <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em]">Get Apps:</span>
                                <div className="flex gap-3">
                                    <Apple size={18} className="text-white" />
                                    <Smartphone size={18} className="text-indigo-400" />
                                    <Monitor size={18} className="text-sky-400" />
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Main Content Area (8 Cols) */}
                        <div className="lg:col-span-8 space-y-12">
                            {/* Booked Tickets Section */}

                            {/* Booked Tickets Section */}
                            <BookedTicketsCard />
                        </div>

                        {/* Right Column (4 Cols) */}
                        <div className="lg:col-span-4 space-y-12 relative">
                            {/* Flight Coupons Section */}
                            <FlightCouponsSection />
                        </div>
                    </div>
                </div>

                <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            </div>
        </DashboardBackground>
    );
}
