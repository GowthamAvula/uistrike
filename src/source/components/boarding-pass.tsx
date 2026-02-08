"use client";
import { motion, AnimatePresence } from "framer-motion";

const spring = { type: "spring", stiffness: 420, damping: 34, mass: 0.9 } as const;
const stagger = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
        },
    },
};
const item = {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    show: { y: 0, opacity: 1, filter: "blur(0px)", transition: spring },
};

export function BoardingPass({ onBack }: { onBack: () => void }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
            {/* Backdrop Blur */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-3xl"
                onClick={onBack}
            />

            {/* Boarding Pass Container */}
            <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={spring}
                className="relative w-full max-w-[480px] bg-zinc-900 shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-[3rem] overflow-hidden border border-zinc-800/50"
            >
                {/* Top Section: Glassy Header */}
                <div className="relative p-8 md:p-10">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 flex justify-between items-start mb-12">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-1">Global Sky Priority</p>
                            <h2 className="text-3xl font-black text-white tracking-tighter">QR 557</h2>
                            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mt-1">First Class</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-black text-white px-3 py-1 bg-white/5 rounded-lg inline-block border border-white/10 uppercase tracking-widest">A2</p>
                            <p className="text-[10px] font-black text-zinc-500 mt-2 uppercase tracking-widest">Group</p>
                        </div>
                    </div>

                    {/* Flight Timeline */}
                    <div className="relative z-10 flex justify-between items-end gap-4 mb-2">
                        <div className="text-left flex-1">
                            <h3 className="text-4xl font-black text-white">BOM</h3>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase">Mumbai</p>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-end pb-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ delay: 0.5, duration: 1.5, ease: "circOut" }}
                                className="w-full h-[2px] bg-indigo-500/30 relative flex items-center justify-center mb-1"
                            >
                                <motion.div
                                    className="absolute left-0 h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                    animate={{ width: ["0%", "100%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, times: [0, 0.7, 1] }}
                                />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 px-2 text-sm z-10">✈️</div>
                            </motion.div>
                            <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">12h 45m</span>
                        </div>
                        <div className="text-right flex-1">
                            <h3 className="text-4xl font-black text-white">LHR</h3>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase">London</p>
                        </div>
                    </div>
                </div>

                {/* Perforation Line */}
                <div className="relative flex items-center h-8">
                    <div className="absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full bg-black/80 backdrop-blur-3xl border border-zinc-800/50"></div>
                    <div className="w-full border-t-[3px] border-dashed border-zinc-800/80 mx-4"></div>
                    <div className="absolute right-0 translate-x-1/2 w-8 h-8 rounded-full bg-black/80 backdrop-blur-3xl border border-zinc-800/50"></div>
                </div>

                {/* Bottom Section: Details & QR */}
                <div className="bg-zinc-900/40 p-10 pt-6">
                    <div className="grid grid-cols-3 gap-8 md:gap-12 mb-12">
                        <motion.div variants={item} className="space-y-1">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Gate</p>
                            <p className="text-lg font-black text-white">C24</p>
                        </motion.div>
                        <motion.div variants={item} className="space-y-1">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Seat</p>
                            <p className="text-lg font-black text-white">12A</p>
                        </motion.div>
                        <motion.div variants={item} className="space-y-1">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Boarding</p>
                            <p className="text-lg font-black text-white">05:45</p>
                        </motion.div>
                    </div>

                    {/* Passenger Info */}
                    <div className="flex items-center justify-between mb-12 pb-12 border-b border-zinc-800/50">
                        <div>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Passenger</p>
                            <p className="text-lg font-black text-white">Alex James Sky</p>
                            <span className="goldShimmer text-[10px] font-black uppercase tracking-widest">Gold Status</span>
                        </div>
                        <div className="h-12 w-12 rounded-full border border-zinc-700 bg-zinc-800 flex items-center justify-center text-xl overflow-hidden">
                            👤
                        </div>
                    </div>

                    {/* QR Code Placeholder (Highly styled) */}
                    <div className="flex flex-col items-center gap-6">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="p-4 bg-white rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.05)] cursor-pointer"
                        >
                            {/* Simple SVG QR Simulator */}
                            <svg width="180" height="180" viewBox="0 0 100 100" className="text-black fill-current">
                                <rect width="100" height="100" fill="white" />
                                <path d="M5 5h20v5H5zm0 5h5v10H5zm15 0h5v10h-5zm-10 5h5v5h-5zM5 20h20v5H5zM5 35h5v5H5zm10 0h10v5h-5v10h5V35zm-5 5h5v20H10zm15 0h5v5h-5zm0 15h5v5h-5zM35 5h5v10h-5zM45 5h20v5h-20zM35 20h5v5h-5zm10 0h5v5h-5zm10 0h5v5h-5zm5 0h20v5h-20zM35 35h20v5h-20zM35 45h5v5h-5zM45 45h5v5h-5zM35 60h5v5h-5zM45 60h5v20h-5zm0-10h20v5h-20z" />
                                <rect x="5" y="75" width="20" height="20" fill="currentColor" />
                                <rect x="75" y="5" width="20" height="20" fill="currentColor" />
                                <rect x="75" y="75" width="20" height="20" fill="currentColor" />
                                <rect x="35" y="5" width="5" height="5" />
                                <rect x="35" y="75" width="25" height="5" />
                            </svg>
                        </motion.div>
                        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.5em]">TICKET ID: GS-992-001-X</p>
                    </div>

                    {/* Action */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-10 h-14 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-white/5"
                    >
                        Download Pass
                    </motion.button>
                </div>

                {/* Close Button */}
                <button
                    onClick={onBack}
                    className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white/10 text-white transition-all z-20 border border-white/10"
                >
                    ✕
                </button>
            </motion.div>

            <style jsx global>{`
                .goldShimmer {
                    background: linear-gradient(90deg, #b08d2a, #D6B35A, #fff1b0, #D6B35A, #b08d2a);
                    background-size: 240% 100%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    animation: goldShimmer 2.6s linear infinite;
                }
                @keyframes goldShimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
}
