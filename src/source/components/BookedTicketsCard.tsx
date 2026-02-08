import React from "react";
import { motion } from "framer-motion";
import { Ticket, Plane, Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { DESTINATION_ASSETS } from "./DestinationAssets";

const BOOKED_TICKETS = [
    {
        id: 1,
        flightNumber: "MH 127",
        from: "KUL",
        to: "MEL",
        date: "12 Feb 2026",
        time: "22:15",
        status: "Confirmed",
        color: "indigo",
        package: "Standard",
        avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/docs/src/docs/images/avatar-1.png"
    },
    {
        id: 2,
        flightNumber: "SQ 421",
        from: "SIN",
        to: "LHR",
        date: "24 Feb 2026",
        time: "09:30",
        status: "Boarding soon",
        color: "emerald",
        package: "Premium",
        avatar: "https://raw.githubusercontent.com/mantinedev/mantine/master/docs/src/docs/images/avatar-1.png"
    }
];

export function BookedTicketsCard() {
    return (
        <GlassCard className="p-8 border-white/10 bg-white/5 backdrop-blur-xl rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            {/* Background Gradient Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 blur-[100px] pointer-events-none" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">Your Boarding Passes</h3>
                    <p className="text-zinc-400 font-bold mt-1">Manage your upcoming journeys</p>
                </div>
                <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
                    <Ticket size={24} />
                </div>
            </div>

            <div className="space-y-6 relative z-10">
                {BOOKED_TICKETS.map((ticket) => {
                    const asset = DESTINATION_ASSETS[ticket.to];
                    return (
                        <motion.div
                            key={ticket.id}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="group relative p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-pointer overflow-hidden shadow-xl"
                        >
                            {/* Accent Edge */}
                            <div className={`absolute left-0 top-0 bottom-0 w-2 bg-${ticket.color}-500 group-hover:w-3 transition-all`} />

                            <div className="flex items-center justify-between gap-6">
                                {/* Flight Path & Details */}
                                <div className="flex-1 flex items-center gap-10">
                                    <div className="flex flex-col">
                                        <div className="text-3xl font-black text-white tracking-tighter">{ticket.from}</div>
                                        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mt-1">Departure</div>
                                    </div>

                                    <div className="flex flex-col items-center flex-1 max-w-[100px]">
                                        <div className="flex items-center gap-2 w-full">
                                            <div className="h-px bg-white/10 flex-1" />
                                            <Plane size={16} className={`text-${ticket.color}-400 rotate-90 transform group-hover:translate-x-2 transition-transform duration-500`} />
                                            <div className="h-px bg-white/10 flex-1" />
                                        </div>
                                        <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mt-2 group-hover:text-white/40 transition-colors">Non-Stop</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="text-3xl font-black text-white tracking-tighter">{ticket.to}</div>
                                        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mt-1">Destination</div>
                                    </div>
                                </div>

                                {/* 3D Asset Preview */}
                                <div className="hidden md:block w-32 h-32 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/20 group-hover:scale-110 transition-transform duration-500">
                                    {asset && (
                                        <>
                                            <img
                                                src={asset.image3d}
                                                className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity"
                                                alt={asset.name}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                                                <span className="text-[9px] font-black text-white truncate max-w-[70px] uppercase">{asset.name}</span>
                                                <div className="w-6 h-6 rounded-full border border-white/40 overflow-hidden bg-white/10">
                                                    <img src={ticket.avatar} className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-zinc-400">
                                        <Calendar size={14} />
                                        <span className="text-[11px] font-bold">{ticket.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-400">
                                        <Clock size={14} />
                                        <span className="text-[11px] font-bold">{ticket.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[9px] font-black px-3 py-1 rounded-full bg-${ticket.color}-500/20 text-${ticket.color}-300 uppercase tracking-widest border border-${ticket.color}-500/20`}>
                                            {ticket.package} Pkg
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-black text-white/30 tracking-[0.3em] font-mono group-hover:text-white/60 transition-colors uppercase">{ticket.flightNumber}</span>
                                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-xl bg-${ticket.color}-500/10 text-${ticket.color}-400 uppercase tracking-widest border border-${ticket.color}-500/10 group-hover:bg-${ticket.color}-500/20 transition-all`}>
                                        {ticket.status}
                                    </span>
                                </div>
                            </div>

                            {/* Glass Shine Effect */}
                            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rotate-45 pointer-events-none group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                        </motion.div>
                    );
                })}
            </div>

            <button className="w-full mt-10 py-5 rounded-[1.5rem] bg-white text-zinc-950 text-sm font-black hover:bg-zinc-100 transition-all shadow-xl shadow-white/5 uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95">
                <span>View Full Itinerary Archive</span>
                <ChevronRight size={18} />
            </button>
        </GlassCard>
    );
}
