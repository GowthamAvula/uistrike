"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const stagger = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
} as const;

const item = {
    hidden: { y: 15, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
} as const;

export function FlightSearchForm() {
    const [tripType, setTripType] = useState<"one-way" | "round-trip" | "multi-city">("round-trip");
    const [directOnly, setDirectOnly] = useState(false);
    const [origin, setOrigin] = useState("Mumbai (BOM)");
    const [destination, setDestination] = useState("London (LHR)");

    const swapStations = () => {
        const temp = origin;
        setOrigin(destination);
        setDestination(temp);
    };

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="w-full p-2"
        >
            <motion.div
                variants={item}
                className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200/50 bg-white/80 p-8 shadow-2xl backdrop-blur-2xl dark:border-zinc-800/50 dark:bg-zinc-950/80"
            >
                {/* Decorative background element */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"></div>

                {/* Top Section: Segmented Control + Checkbox */}
                <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 relative z-10">
                    <div className="flex p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50">
                        {["one-way", "round-trip", "multi-city"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setTripType(type as "one-way" | "round-trip" | "multi-city")}
                                suppressHydrationWarning={true}
                                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all capitalize ${tripType === type
                                    ? "bg-white text-black shadow-lg dark:bg-zinc-800 dark:text-white"
                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                                    }`}
                            >
                                {type.replace("-", " ")}
                            </button>
                        ))}
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${directOnly ? 'bg-indigo-600 border-indigo-600' : 'border-zinc-300 dark:border-zinc-700'
                            }`}>
                            {directOnly && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={directOnly}
                            onChange={() => setDirectOnly(!directOnly)}
                            suppressHydrationWarning={true}
                        />
                        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">Direct only</span>
                    </label>
                </motion.div>

                {/* Main Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    {/* From */}
                    <motion.div variants={item} className="flex flex-col gap-2">
                        <label className="text-[11px] uppercase font-black tracking-widest text-zinc-400 px-1">From</label>
                        <div className="group rounded-2xl border border-zinc-200 bg-white px-4 py-4 transition-all focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 dark:border-zinc-800 dark:bg-zinc-900">
                            <input
                                type="text"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                placeholder="Origin"
                                suppressHydrationWarning={true}
                                className="w-full bg-transparent text-sm font-bold outline-none text-zinc-900 dark:text-zinc-100"
                            />
                            <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-tight">{origin.includes('BOM') ? 'Chhatrapati Shivaji (BOM)' : 'Departure Airport'}</p>
                        </div>
                    </motion.div>

                    {/* To */}
                    <motion.div variants={item} className="flex flex-col gap-2">
                        <label className="text-[11px] uppercase font-black tracking-widest text-zinc-400 px-1">To</label>
                        <div className="group rounded-2xl border border-zinc-200 bg-white px-4 py-4 transition-all focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 dark:border-zinc-800 dark:bg-zinc-900">
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="Destination"
                                suppressHydrationWarning={true}
                                className="w-full bg-transparent text-sm font-bold outline-none text-zinc-900 dark:text-zinc-100"
                            />
                            <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-tight">{destination.includes('LHR') ? 'London Heathrow (LHR)' : 'Arrival Airport'}</p>
                        </div>
                    </motion.div>

                    {/* Dates Container */}
                    <motion.div variants={item} className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] uppercase font-black tracking-widest text-zinc-400 px-1">Depart</label>
                            <div className="group rounded-2xl border border-zinc-200 bg-white px-4 py-4 transition-all focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 dark:border-zinc-800 dark:bg-zinc-900">
                                <input
                                    type="date"
                                    suppressHydrationWarning={true}
                                    className="w-full bg-transparent text-xs font-bold outline-none text-zinc-900 dark:text-zinc-100"
                                />
                            </div>
                        </div>
                        <div className={`flex flex-col gap-2 transition-opacity duration-300 ${tripType === 'one-way' ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                            <label className="text-[11px] uppercase font-black tracking-widest text-zinc-400 px-1">Return</label>
                            <div className="group rounded-2xl border border-zinc-200 bg-white px-4 py-4 transition-all focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 dark:border-zinc-800 dark:bg-zinc-900">
                                <input
                                    type="date"
                                    suppressHydrationWarning={true}
                                    className="w-full bg-transparent text-xs font-bold outline-none text-zinc-900 dark:text-zinc-100"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Travel Details */}
                    <motion.div variants={item} className="flex flex-col gap-2">
                        <label className="text-[11px] uppercase font-black tracking-widest text-zinc-400 px-1">Travelers & Class</label>
                        <div className="group rounded-2xl border border-zinc-200 bg-white px-4 py-4 transition-all focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-500 dark:border-zinc-800 dark:bg-zinc-900">
                            <select
                                suppressHydrationWarning={true}
                                className="w-full bg-transparent text-xs font-bold outline-none text-zinc-900 dark:text-zinc-100 appearance-none"
                            >
                                <option>1 Adult, Economy</option>
                                <option>1 Adult, Business</option>
                                <option>2 Adults, Economy</option>
                            </select>
                        </div>
                    </motion.div>

                    {/* Swap Button (Absolute Positioned for cool effect) */}
                    <motion.button
                        variants={item}
                        onClick={swapStations}
                        suppressHydrationWarning={true}
                        whileHover={{ scale: 1.1, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-[165px] left-1/2 -translate-x-1/2 z-20 h-10 w-10 rounded-full border border-zinc-200 bg-white shadow-xl flex items-center justify-center dark:border-zinc-800 dark:bg-zinc-900 hidden md:flex"
                    >
                        <span className="text-xl">⇄</span>
                    </motion.button>
                </div>

                {/* CTA */}
                <motion.button
                    variants={item}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    suppressHydrationWarning={true}
                    className="w-full mt-8 h-16 rounded-2xl bg-indigo-600 font-black text-sm text-white shadow-2xl shadow-indigo-500/40 transition-all hover:bg-indigo-700 uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                >
                    Explore Flights
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </motion.button>

                {/* Popular Chips */}
                <motion.div variants={item} className="mt-8 flex flex-wrap justify-center gap-2 relative z-10">
                    {["BOM → DXB", "DEL → LHR", "JFK → LHR"].map((route) => (
                        <button
                            key={route}
                            suppressHydrationWarning={true}
                            className="px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-[10px] font-black uppercase text-zinc-500 dark:text-zinc-400 hover:bg-indigo-500 hover:text-white transition-all shadow-sm"
                        >
                            {route}
                        </button>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
