"use client";
import React from "react";
import { GlassCard } from "./GlassCard";
import { ArrowRight, Calendar, Clock } from "lucide-react";

const TRIPS = [
    {
        id: "VX-299",
        origin: "DXB",
        dest: "LHR",
        date: "Feb 12",
        time: "08:45 AM",
        status: "Confirmed",
    },
    {
        id: "VX-302",
        origin: "LHR",
        dest: "JFK",
        date: "Feb 15",
        time: "02:30 PM",
        status: "Pending",
    },
];

export function UpcomingTrips() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wide">Upcoming Trips</h3>
                <button className="text-xs text-blue-400 hover:text-blue-300">View all</button>
            </div>

            <div className="space-y-3">
                {TRIPS.map((trip) => (
                    <GlassCard key={trip.id} className="p-4 flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-white/5 flex flex-col items-center justify-center border border-white/10">
                                <span className="text-xs font-bold text-white/90">{trip.date.split(" ")[1]}</span>
                                <span className="text-[10px] text-white/50 uppercase">{trip.date.split(" ")[0]}</span>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-lg font-bold text-white">
                                    {trip.origin}
                                    <ArrowRight size={14} className="text-white/30" />
                                    {trip.dest}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-white/50 mt-0.5">
                                    <span className="flex items-center gap-1">
                                        <Clock size={10} /> {trip.time}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                    <span>{trip.id}</span>
                                </div>
                            </div>
                        </div>

                        <div className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${trip.status === "Confirmed"
                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                            }`}>
                            {trip.status}
                        </div>
                    </GlassCard>
                ))}
            </div>
        </div>
    );
}
