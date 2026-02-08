"use client";
import { motion } from "framer-motion";

const spring = { type: "spring", stiffness: 420, damping: 34, mass: 0.9 } as const;
const stagger = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
} as const;

const item = {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    show: { y: 0, opacity: 1, filter: "blur(0px)", transition: spring },
} as const;

const flights = [
    { id: 1, from: "DEL", to: "DXB", date: "20 Feb", depart: "09:10", arrive: "11:40", airline: "Emirates", stops: 0, duration: "3h 00m", price: 18999, tag: "Best deal" },
    { id: 2, from: "BOM", to: "SIN", date: "18 Feb", depart: "22:30", arrive: "06:20", airline: "Singapore", stops: 0, duration: "5h 20m", price: 27999, tag: "Non‑stop" },
    { id: 3, from: "BLR", to: "BKK", date: "22 Feb", depart: "13:05", arrive: "18:10", airline: "Thai", stops: 0, duration: "4h 35m", price: 15999, tag: "Popular" },
    { id: 4, from: "DEL", to: "LHR", date: "25 Feb", depart: "02:15", arrive: "07:10", airline: "British Airways", stops: 0, duration: "9h 25m", price: 46999, tag: "Premium" },
    { id: 5, from: "BOM", to: "AUH", date: "21 Feb", depart: "07:40", arrive: "09:15", airline: "Etihad", stops: 0, duration: "3h 05m", price: 17499, tag: "Limited seats" },
    { id: 6, from: "HYD", to: "KUL", date: "23 Feb", depart: "23:10", arrive: "06:05", airline: "Malaysia", stops: 1, duration: "6h 25m", price: 13999, tag: "Cheapest" },
    { id: 7, from: "DEL", to: "JFK", date: "27 Feb", depart: "01:20", arrive: "10:50", airline: "Air India", stops: 1, duration: "19h 10m", price: 69999, tag: "Long haul" },
    { id: 8, from: "MAA", to: "DOH", date: "19 Feb", depart: "04:55", arrive: "07:10", airline: "Qatar", stops: 0, duration: "4h 45m", price: 20999, tag: "Top rated" },
];

export function Marketplace() {
    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="marketplace transition-colors duration-500"
        >
            <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div variants={item} className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
                        <div>
                            <h2 className="text-4xl font-black tracking-tighter text-white mb-2">Marketplace</h2>
                            <p className="text-zinc-400 font-medium">World-class inventory. AI-curated routes.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {["Non-stop", "Cheapest", "Morning", "Premium"].map((chip) => (
                                <button key={chip} className="px-5 py-2.5 rounded-full border border-white/10 bg-zinc-900/40 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-white/20 transition-all">
                                    {chip}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Hero Banner Area */}
                    <motion.div variants={item} className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-[3rem] overflow-hidden mb-16 group border border-white/10 glassDark shadow-xl bg-gradient-to-br from-[#1a237e] via-[#311b92] to-[#0d47a1]">
                        <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/40 to-transparent"></div>
                        <div className="relative h-full flex flex-col justify-center p-12 max-w-lg">
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tighter"
                            >
                                Fly smarter. <br />Book faster.
                            </motion.h3>
                            <p className="text-zinc-300 text-sm md:text-lg font-medium mb-8">Hand-picked deals updated in real-time by your Global Sky concierge.</p>
                            <button className="w-fit px-10 h-14 bg-white text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
                                Explore Deals
                            </button>
                        </div>
                    </motion.div>

                    {/* Flights Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {flights.map((flight) => (
                            <motion.article
                                key={flight.id}
                                variants={item}
                                whileHover={{ y: -8, border: "1px solid rgba(255, 255, 255, 0.2)" }}
                                className="group flex flex-col p-8 rounded-[2.5rem] glassDark border border-white/5 shadow-2xl transition-all relative overflow-hidden cursor-pointer"
                            >
                                {/* Card Glow (Light) */}
                                <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-indigo-50 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className="space-y-1.5">
                                        <h4 className="font-black text-white uppercase tracking-tight">{flight.airline}</h4>
                                        <span className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black text-indigo-400 rounded-full uppercase tracking-widest shadow-sm">
                                            {flight.tag}
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-white tracking-tighter">₹{flight.price.toLocaleString()}</p>
                                        <p className="text-[10px] font-bold text-zinc-500 italic">Economy · Return</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 mb-10 relative z-10">
                                    <div className="text-center">
                                        <b className="text-3xl font-black text-white tracking-tighter">{flight.from}</b>
                                        <span className="block text-[11px] font-black text-zinc-500 mt-1 uppercase">{flight.depart}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-[1px] bg-zinc-800 relative mb-2">
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs">✈️</div>
                                        </div>
                                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop`} · {flight.duration}</span>
                                    </div>
                                    <div className="text-center">
                                        <b className="text-3xl font-black text-white tracking-tighter">{flight.to}</b>
                                        <span className="block text-[11px] font-black text-zinc-500 mt-1 uppercase">{flight.arrive}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 mb-8 relative z-10">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                        <span className="opacity-50">📅</span> {flight.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                        <span className="opacity-50">🔄</span> Flex
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                        <span className="opacity-50">👜</span> 7kg
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-auto pt-6 border-t border-white/5 relative z-10">
                                    <button className="flex-1 h-12 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-white/5 transition-all">Details</button>
                                    <button className="flex-[2] h-12 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg">Book Now</button>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .marketplace {
                    position: relative;
                    min-height: 100vh;
                    overflow: hidden;
                    background: transparent;
                }
                .glassDark {
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    background: rgba(17, 24, 39, 0.42);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                }
            `}</style>
        </motion.div>
    );
}
