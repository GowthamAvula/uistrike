"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface Flight {
    id: string;
    airline: string;
    code: string;
    depart: string;
    arrive: string;
    duration: string;
    stops: number;
    price: number;
}

export function Hero() {
    const [tripType, setTripType] = useState('oneway');
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

    const flights: Flight[] = [
        { id: "JJ-214", airline: "Jesko Airways", code: "JJ", depart: "08:10", arrive: "12:55", duration: "7h 45m", stops: 0, price: 214 },
        { id: "SK-090", airline: "Skyline", code: "SK", depart: "10:40", arrive: "16:05", duration: "8h 25m", stops: 1, price: 188 },
        { id: "AT-771", airline: "Altair", code: "AT", depart: "14:15", arrive: "18:35", duration: "7h 20m", stops: 0, price: 342 },
    ];

    return (
        <section className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 space-y-8 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand/10 blur-[100px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-emerald-accent/5 blur-[100px]" />
            </div>

            <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start gap-6">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight leading-none">Find your next flight</h2>
                        <p className="text-sm font-medium text-zinc-400 mt-3 max-w-lg leading-relaxed">
                            Search routes, compare fares, and pick the best timing with our high-precision booking flow.
                        </p>
                        <div className="flex flex-wrap gap-2.5 mt-6">
                            {[
                                { label: "Nonstop", bold: "deals today" },
                                { label: "Avg check-in", bold: "12 min" },
                                { label: "Trusted by", bold: "28k" }
                            ].map((chip, idx) => (
                                <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-full">
                                    {idx === 0 && <div className="w-2 h-2 rounded-full bg-gradient-to-br from-brand to-brand-secondary shadow-[0_0_8px_rgba(109,123,255,1)]" />}
                                    <span className="text-xs font-medium text-zinc-400">{chip.label} <b className="text-white font-bold">{chip.bold}</b></span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Support</span>
                        <span className="text-xs font-black text-white">24/7</span>
                    </div>
                </div>

                {/* Search Form */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-4 space-y-4">
                    <div className="flex justify-between items-center gap-4">
                        <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-full gap-1">
                            {['One-way', 'Round-trip', 'Multi-city'].map((type) => {
                                const id = type.toLowerCase().replace('-', '');
                                return (
                                    <button
                                        key={id}
                                        onClick={() => setTripType(id)}
                                        className={`px-5 py-2 rounded-full text-xs font-black transition-all ${tripType === id
                                            ? 'bg-gradient-to-br from-brand to-brand-secondary text-white shadow-lg'
                                            : 'text-zinc-500 hover:text-white'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                );
                            })}
                        </div>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">One-way selected</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-4 bg-black/20 border border-white/10 rounded-2xl flex flex-col gap-1.5 focus-within:border-brand/50 transition-colors">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">From</label>
                            <input className="bg-transparent border-0 p-0 text-sm font-black text-white outline-none" defaultValue="DXB — Dubai" />
                        </div>
                        <div className="p-4 bg-black/20 border border-white/10 rounded-2xl flex flex-col gap-1.5 focus-within:border-brand/50 transition-colors">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">To</label>
                            <input className="bg-transparent border-0 p-0 text-sm font-black text-white outline-none" defaultValue="LHR — London" />
                        </div>

                        <div className="md:col-span-2 flex items-center justify-between gap-4 py-1">
                            <button className="flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-white hover:bg-white/10 transition-colors">
                                ⇄ Swap
                            </button>
                            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase">Cabin</span>
                                <select className="bg-transparent border-0 p-0 text-xs font-black text-white outline-none cursor-pointer">
                                    <option>Economy</option>
                                    <option>Business</option>
                                    <option>First</option>
                                </select>
                            </div>
                        </div>

                        <div className="p-4 bg-black/20 border border-white/10 rounded-2xl flex flex-col gap-1.5 focus-within:border-brand/50 transition-colors">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Depart</label>
                            <input type="date" className="bg-transparent border-0 p-0 text-sm font-black text-white outline-none" defaultValue="2024-06-12" />
                        </div>
                        <div className="p-4 bg-black/20 border border-white/10 rounded-2xl flex flex-col gap-1.5 opacity-50">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Return</label>
                            <input type="date" className="bg-transparent border-0 p-0 text-sm font-black text-white outline-none" readOnly />
                        </div>

                        <div className="p-4 bg-black/20 border border-white/10 rounded-2xl flex flex-col gap-1.5 focus-within:border-brand/50 transition-colors">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Passengers</label>
                            <select className="bg-transparent border-0 p-0 text-sm font-black text-white outline-none cursor-pointer">
                                <option>1 passenger</option>
                                <option>2 passengers</option>
                            </select>
                        </div>
                        <div className="p-4 bg-black/20 border border-white/10 rounded-2xl flex flex-col gap-1.5 focus-within:border-brand/50 transition-colors">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Filters</label>
                            <select className="bg-transparent border-0 p-0 text-sm font-black text-white outline-none cursor-pointer">
                                <option>Best</option>
                                <option>Cheapest</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Showing popular options</span>
                        <div className="flex gap-2.5 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-white hover:bg-white/10 transition-colors">Reset</button>
                            <button className="flex-2 sm:flex-none px-10 py-3 bg-gradient-to-r from-brand to-brand-secondary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all">Search flights</button>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-3 pt-2">
                    {flights.map((f) => (
                        <motion.div
                            key={f.id}
                            whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.075)" }}
                            className={`p-4 bg-white/5 border border-white/10 rounded-[1.25rem] grid grid-cols-1 sm:grid-cols-[1.2fr_1fr_auto] gap-6 items-center cursor-pointer transition-all ${selectedFlight?.id === f.id ? 'ring-2 ring-brand/50 shadow-2xl shadow-brand/10' : ''}`}
                            onClick={() => setSelectedFlight(f)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 flex items-center justify-center bg-zinc-950 border border-white/10 rounded-xl font-black text-[10px] text-zinc-400">
                                    {f.code}
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-white">{f.airline}</h3>
                                    <p className="text-[10px] font-bold text-zinc-500 mt-0.5">{f.id} • {f.duration} • {f.stops === 0 ? 'Nonstop' : '1 stop'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 px-2">
                                <div className="text-center">
                                    <div className="text-sm font-black text-white leading-none">{f.depart}</div>
                                    <div className="text-[10px] font-black text-zinc-600 mt-1 uppercase tracking-tighter">DXB</div>
                                </div>
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent relative">
                                    <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1.5 h-1.5 bg-brand rounded-full" />
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-black text-white leading-none">{f.arrive}</div>
                                    <div className="text-[10px] font-black text-zinc-600 mt-1 uppercase tracking-tighter">LHR</div>
                                </div>
                            </div>
                            <div className="text-right pl-4">
                                <div className="text-base font-black text-white leading-none">${f.price}</div>
                                <div className="text-[10px] font-bold text-zinc-500 mt-1">per person</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
