"use client";
import { motion } from "framer-motion";

export function ItinerarySummary() {
    return (
        <aside className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 space-y-4 sticky top-6 h-fit overflow-hidden">
            {/* Visual Section (Video) */}
            <div className="h-[210px] rounded-[1.25rem] border border-white/10 bg-zinc-950 overflow-hidden relative">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
                >
                    <source src="/videos/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute inset-x-4 bottom-4 flex justify-between items-end gap-4">
                    <div>
                        <p className="text-sm font-black text-white tracking-widest uppercase">DXB → LHR</p>
                        <p className="text-[11px] font-bold text-zinc-400 mt-1">Select dates to continue</p>
                    </div>
                    <div className="px-3 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                        Economy
                    </div>
                </div>
            </div>

            {/* Summary Details */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h2 className="text-sm font-black text-white uppercase tracking-widest">Your itinerary</h2>
                        <p className="text-[11px] font-bold text-zinc-400 mt-1.5 leading-relaxed">
                            Choose a flight from the list to see details here.
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Total</span>
                        <span className="text-sm font-black text-white">—</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {[
                        { label: 'From', value: 'DXB' },
                        { label: 'To', value: 'LHR' },
                        { label: 'Depart', value: '—' },
                        { label: 'Return', value: '—' },
                        { label: 'Passengers', value: '1' },
                        { label: 'Cabin', value: 'Economy' }
                    ].map((item) => (
                        <div key={item.label} className="p-4 bg-black/20 border border-white/10 rounded-2xl flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{item.label}</span>
                            <b className="text-xs font-black text-white">{item.value}</b>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2.5 pt-2">
                    <button className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-white hover:bg-white/10 transition-colors">
                        Hold fare
                    </button>
                    <button className="flex-1 px-6 py-3 bg-gradient-to-r from-brand to-brand-secondary text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-brand/20 hover:scale-[1.02] active:scale-95 transition-all">
                        Book now
                    </button>
                </div>
            </div>

            <div className="p-4 bg-emerald-accent/5 border border-emerald-accent/20 rounded-2xl text-[11px] font-bold text-emerald-accent/80 leading-relaxed italic">
                Tip: Fly during off-peak hours to save up to 40% on your next booking with Jesko Jets.
            </div>
        </aside>
    );
}
