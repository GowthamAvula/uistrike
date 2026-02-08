"use client";
import { motion } from "framer-motion";

const stagger = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
} as const;

export function FlightResults() {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start">

                {/* 1. Filter Sidebar */}
                <aside className="sticky top-28 p-8 bg-zinc-900/5 dark:bg-zinc-100/5 border border-zinc-200 dark:border-white/10 rounded-[2.5rem] space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black text-zinc-900 dark:text-white">Filters</h2>
                        <button className="text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors">Reset</button>
                    </div>

                    <div className="pt-6 border-t border-zinc-200 dark:border-white/10">
                        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">Stops</h3>
                        <div className="space-y-4">
                            {['Non-stop', '1 stop', '2+ stops'].map((stop, i) => (
                                <label key={stop} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" defaultChecked={i === 0} className="w-4 h-4 rounded border-zinc-300 dark:border-zinc-700 text-indigo-500 focus:ring-indigo-500 transition-all" />
                                    <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{stop}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-200 dark:border-white/10">
                        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">Price Range</h3>
                        <input type="range" className="w-full accent-indigo-500" min="100" max="1500" defaultValue="650" />
                        <div className="mt-2 text-sm font-bold text-zinc-900 dark:text-zinc-400">Up to $650</div>
                    </div>
                </aside>

                {/* 2. Results Section */}
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row justify-between items-end gap-4 px-2">
                        <div>
                            <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Best flights</h2>
                            <p className="text-sm font-medium text-zinc-500">New York → London · 2 travelers</p>
                        </div>
                        <div className="flex gap-4 items-center">
                            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Sort by</span>
                            <select className="px-5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-full text-sm font-bold text-zinc-900 dark:text-white outline-none">
                                <option>Recommended</option>
                                <option>Cheapest</option>
                                <option>Fastest</option>
                            </select>
                        </div>
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="space-y-4"
                    >
                        {[
                            { airline: 'British Airways', logo: 'BA', from: '09:10', to: '21:15', price: 642, info: 'Non-stop · 7h 05m' },
                            { airline: 'Virgin Atlantic', logo: 'VS', from: '12:40', to: '06:00', price: 588, info: '1 stop · 9h 20m' }
                        ].map((flight, idx) => (
                            <motion.article
                                key={idx}
                                variants={item}
                                whileHover={{ scale: 1.01, border: '1px solid rgba(99, 102, 241, 0.4)' }}
                                className="group flex flex-col md:flex-row items-stretch p-6 bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 rounded-[2.5rem] transition-all hover:shadow-2xl shadow-black/5"
                            >
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 pr-6 border-b md:border-b-0 md:border-r border-zinc-100 dark:border-white/5 pb-6 md:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 flex items-center justify-center bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-2xl font-black text-xs">
                                            {flight.logo}
                                        </div>
                                        <div>
                                            <div className="font-black text-zinc-900 dark:text-white">{flight.airline}</div>
                                            <div className="text-xs font-bold text-zinc-500">{flight.info}</div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center gap-6">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-black text-zinc-900 dark:text-white leading-none">{flight.from}</span>
                                            <span className="text-xs font-black text-zinc-500 uppercase mt-1">JFK</span>
                                        </div>
                                        <div className="flex-1 flex flex-col items-center gap-2">
                                            <div className="w-full h-0.5 bg-zinc-200 dark:bg-white/10 rounded-full relative">
                                                <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2.5 h-2.5 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-full border-2 border-white dark:border-zinc-900" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Direct</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-2xl font-black text-zinc-900 dark:text-white leading-none">{flight.to}</span>
                                            <span className="text-xs font-black text-zinc-500 uppercase mt-1">LHR</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col justify-between items-center md:items-end pl-0 md:pl-8 pt-6 md:pt-0 w-full md:w-[150px]">
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-zinc-900 dark:text-white leading-none">${flight.price}</div>
                                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">per person</div>
                                    </div>
                                    <button className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-xs font-black uppercase tracking-widest rounded-2xl hover:scale-110 active:scale-95 transition-all">
                                        Select
                                    </button>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
