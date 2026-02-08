import React from "react";
import { motion } from "framer-motion";
import { Tag, Zap, Percent, ChevronRight } from "lucide-react";
import { GlassCard } from "./GlassCard";

const COUPONS = [
    {
        id: 1,
        code: "FLYHIGH25",
        discount: "25% OFF",
        desc: "International Flights",
        color: "from-indigo-500 to-purple-600"
    },
    {
        id: 2,
        code: "STAYCALM",
        discount: "$50 OFF",
        desc: "Business Class Upgrade",
        color: "from-emerald-500 to-teal-600"
    }
];

export function FlightCouponsSection() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <div>
                    <h3 className="text-xl font-black text-white tracking-tight">Active Offers</h3>
                    <p className="text-sm text-zinc-400 font-bold">Exclusive deals for you</p>
                </div>
                <Tag className="text-zinc-500" size={20} />
            </div>

            <div className="grid grid-cols-1 gap-4">
                {COUPONS.map((coupon) => (
                    <motion.div
                        key={coupon.id}
                        whileHover={{ scale: 1.02 }}
                        className={`relative p-6 rounded-[2rem] bg-gradient-to-br ${coupon.color} shadow-lg cursor-pointer group overflow-hidden`}
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap size={16} className="text-white/80 fill-white/20" />
                                <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">Limited Time</span>
                            </div>

                            <h4 className="text-3xl font-black text-white leading-tight mb-1">{coupon.discount}</h4>
                            <p className="text-xs font-bold text-white/80 mb-6">{coupon.desc}</p>

                            <div className="flex items-center justify-between">
                                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-3">
                                    <span className="text-sm font-black text-white font-mono">{coupon.code}</span>
                                    <div className="w-px h-4 bg-white/20" />
                                    <button className="text-[10px] font-black text-white uppercase tracking-widest hover:text-white/80 transition-colors">
                                        Copy
                                    </button>
                                </div>
                                <ChevronRight className="text-white/60 group-hover:text-white transition-colors" size={20} />
                            </div>
                        </div>

                        {/* Decorative Circles */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-3xl" />
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
