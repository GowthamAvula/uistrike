"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const flightDiscounts = [
    { id: "FD-101", title: "Up to 18% off International Flights", provider: "SkyTrips", code: "FLY18", discount: "18%", minSpend: 25000, validTill: "2026-03-15", eligibility: ["Economy & Premium Economy", "Tue–Thu travel"], notes: ["Taxes may apply", "Limited seats"] },
    { id: "FD-102", title: "Flat ₹2,500 off Domestic", provider: "AeroDeal", code: "DOM2500", discount: "₹2,500", minSpend: 8000, validTill: "2026-02-28", eligibility: ["Domestic routes only"], notes: ["One use per account"] }
];

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

export function CommandCenter() {
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.current = e.clientX - rect.left;
            mouseY.current = e.clientY - rect.top;
            containerRef.current.style.setProperty("--x", `${mouseX.current}px`);
            containerRef.current.style.setProperty("--y", `${mouseY.current}px`);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <motion.div
            ref={containerRef}
            initial="hidden"
            animate="show"
            variants={stagger}
            className="w-full max-w-5xl px-6 py-12 relative text-white"
        >
            {/* Global Noise Overlay */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay z-50" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            {/* Header / Profile Section */}
            <motion.div variants={item} className="mb-12 flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-white">
                        Command Center
                    </h1>
                    <p className="mt-2 text-zinc-400">
                        Welcome back, <span className="font-bold text-zinc-100">Alex Julian Sky</span>
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-zinc-900/50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-zinc-400 border border-zinc-100/10">
                        Verified
                    </div>
                    <div className="rounded-full bg-amber-900/30 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-400 border border-amber-500/20">
                        <span className="goldShimmer">Gold Member</span>
                    </div>
                </div>
            </motion.div>

            {/* Mission Control Grid (12-column) */}
            <div className="mb-12 grid grid-cols-12 gap-6">

                {/* 1. Next Flight Hero (Dominant - 7 Cols) */}
                <motion.div
                    variants={item}
                    className="col-span-12 lg:col-span-7 relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-zinc-900/40 to-black/40 backdrop-blur-3xl p-8 group shadow-2xl"
                >
                    {/* Specular highlight tracking */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                        style={{ background: "radial-gradient(600px circle at var(--x) var(--y), rgba(255,255,255,0.06), transparent 40%)" }}
                    />

                    {/* Inner highlight & specular layer */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-40 transition-opacity group-hover:opacity-60" />

                    {/* DYNAMIC CONTENT based on LocalStorage */}
                    <BookedStateView />

                </motion.div>

                {/* 2 & 3. Supporting Instruments (5 Cols) */}
                <div className="col-span-12 lg:col-span-5 grid grid-rows-2 gap-6">
                    {/* Loyalty Module */}
                    <motion.div
                        variants={item}
                        whileHover={{ scale: 1.01, border: "1px solid rgba(255, 255, 255, 0.2)" }}
                        className="glassDark rounded-[2.5rem] p-8 flex flex-col justify-between group transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500">Asset Balance</p>
                            <span className="goldShimmer text-xs font-black uppercase tracking-widest">Gold</span>
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-white tabular-nums tracking-tighter">128,420</h3>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">+4,250 this month</p>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-950/50 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "75%" }}
                                className="h-full bg-indigo-500/80"
                            />
                        </div>
                    </motion.div>

                    {/* Gate Watch Module */}
                    <motion.div
                        variants={item}
                        whileHover={{ scale: 1.01, border: "1px solid rgba(74, 222, 128, 0.3)" }}
                        className="glassDark rounded-[2.5rem] p-8 flex flex-col justify-between group transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500">Traffic Intel</p>
                            <div className="flex items-center gap-1.5">
                                <motion.span
                                    animate={{ opacity: [0.4, 1, 0.4] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="h-1.5 w-1.5 rounded-full bg-green-500"
                                />
                                <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Active Radar</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-4xl font-black text-white tracking-tighter">Active</h3>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Monitoring 2 Ops</p>
                        </div>
                        <div className="h-1.5 w-full flex gap-1">
                            {[1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0].map((v, i) => (
                                <div key={i} className={`h-full flex-1 rounded-sm ${v ? 'bg-green-500/40' : 'bg-zinc-800'}`} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Upcoming Trips Section */}
            <motion.div variants={item} className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Upcoming Trips</h2>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm font-semibold text-indigo-500 hover:text-indigo-400"
                >
                    View All
                </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Domestic Trip Card */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.01, border: "1px solid rgba(99, 102, 241, 0.4)" }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 glassDark p-6 transition-all hover:shadow-2xl hover:shadow-indigo-500/10"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Domestic</p>
                            <h4 className="mt-1 text-xl font-bold">BOM → DEL</h4>
                            <p className="text-sm text-zinc-500">Air India · AI 635</p>
                        </div>
                        <motion.div
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            className="rounded-xl bg-zinc-100 p-3 dark:bg-zinc-900 group-hover:bg-indigo-600 transition-colors"
                        >
                            <span className="text-xl inline-block">🎟️</span>
                        </motion.div>
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 px-1 border-l-2 border-indigo-500 mb-1">Boarding</p>
                            <p className="font-bold">18:10</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 pr-1 border-r-2 border-indigo-500 mb-1">Gate</p>
                            <p className="font-bold text-indigo-500">T2 · B14</p>
                        </div>
                    </div>
                </motion.div>

                {/* International Trip Card */}
                <motion.div
                    variants={item}
                    whileHover={{ scale: 1.01, border: "1px solid rgba(245, 158, 11, 0.4)" }}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 glassDark p-6 transition-all hover:shadow-2xl hover:shadow-amber-500/10"
                >
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">International</p>
                            <h4 className="mt-1 text-xl font-bold">BOM → DXB</h4>
                            <p className="text-sm text-zinc-500">Emirates · EK 501</p>
                        </div>
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="rounded-xl bg-zinc-100 p-3 dark:bg-zinc-900 group-hover:bg-amber-600 transition-colors"
                        >
                            <span className="text-xl inline-block">🌍</span>
                        </motion.div>
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 px-1 border-l-2 border-amber-500 mb-1">Status</p>
                            <p className="font-bold text-blue-500">Scheduled</p>
                        </div>
                        <div className="text-right text-xs text-zinc-500">
                            Personalized Docs Ready (100%)
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Flight Discounts Section */}
            <motion.section variants={item} className="mt-16 p-8 rounded-[2.5rem] border border-white/10 glassDark shadow-2xl backdrop-blur-xl">
                <header className="flex items-center justify-between gap-4 mb-8">
                    <div>
                        <h3 className="text-xl font-black text-white">Active Flight Offers</h3>
                        <p className="text-xs font-medium text-zinc-400 mt-1">Exclusive deals curated for your Gold tier.</p>
                    </div>
                    <button className="text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors">View all deals</button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {flightDiscounts.map((d) => (
                        <article key={d.id} className="group p-6 rounded-[2rem] border border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30 transition-all hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:shadow-xl hover:shadow-indigo-500/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="flex justify-between items-start gap-4 mb-6 relative z-10">
                                <div>
                                    <h4 className="font-black text-zinc-900 dark:text-white tracking-tight leading-tight">{d.title}</h4>
                                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{d.provider}</span>
                                        <span className="text-[10px] font-bold text-zinc-400">Min spend: ₹{d.minSpend.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="px-4 py-2 bg-indigo-500 text-white text-xs font-black rounded-xl shadow-lg shadow-indigo-500/20">
                                    {d.discount}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-6 relative z-10">
                                <code className="flex-1 px-4 h-11 flex items-center bg-white dark:bg-black rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 font-bold text-lg tracking-widest text-indigo-600 dark:text-indigo-400">
                                    {d.code}
                                </code>
                                <button
                                    onClick={() => navigator.clipboard.writeText(d.code)}
                                    className="px-6 h-11 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg"
                                >
                                    Copy
                                </button>
                            </div>

                            <ul className="space-y-2 relative z-10">
                                {d.eligibility.map((x, i) => (
                                    <li key={i} className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                        <span className="h-1 w-1 rounded-full bg-indigo-500"></span>
                                        {x}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-[10px] font-black text-zinc-400 uppercase tracking-widest italic opacity-60">
                                {d.notes.join(" · ")}
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                    <h4 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] mb-4">Related Intelligence</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: "Baggage Rules", href: "#" },
                            { label: "Refund Policies", href: "#" },
                            { label: "Fare Rules", href: "#" },
                            { label: "Elite Support", href: "#" }
                        ].map((link) => (
                            <a key={link.label} href={link.href} className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 text-[10px] font-black text-zinc-600 dark:text-zinc-300 uppercase tracking-widest hover:bg-white dark:hover:bg-zinc-800 hover:border-indigo-200 transition-all text-center">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </motion.section>

            <style jsx global>{`
                .glassDark {
                    backdrop-filter: blur(24px);
                    -webkit-backdrop-filter: blur(24px);
                    background: rgba(17, 24, 39, 0.42);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                }
                .indigoGlow {
                    box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.15) inset, 0 10px 40px rgba(99, 102, 241, 0.08);
                }
                .indigoGlow:hover {
                    box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.35) inset, 0 10px 40px rgba(99, 102, 241, 0.18);
                }
                .goldShimmer {
                    background: linear-gradient(90deg, #b08d2a, #D6B35A, #fff1b0, #D6B35A, #b08d2a);
                    background-size: 240% 100%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    animation: goldShimmer 2.6s linear infinite;
                }
                @keyframes goldShimmer {
                    0% { background-position: 0% }
                    100% { background-position: 240% }
                }
            `}</style>
        </motion.div>
    );
}

function BookedStateView() {
    const [booked, setBooked] = useState<{
        code: string;
        from: string;
        to: string;
        departTime: string;
        date: string;
        duration: string;
        stops: string;
    } | null>(null);

    useEffect(() => {
        const data = localStorage.getItem("bookedFlight");
        if (data) {
            try {
                const parsed = JSON.parse(data);
                const timeout = setTimeout(() => {
                    setBooked(parsed);
                }, 0);
                return () => clearTimeout(timeout);
            } catch (e) {
                console.error("Failed to parse booked flight", e);
            }
        }
    }, []);

    if (!booked) {
        // Default View (No Booking)
        return (
            <>
                <div className="relative flex items-start justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500">Live Mission Data</p>
                        <h2 className="mt-1 text-2xl font-black text-white tracking-tight">Active Incursion</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                            <motion.span
                                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                                transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                            />
                            On Schedule
                        </span>
                        <button className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:bg-white/10 transition-all hover:text-white">
                            View Briefing
                        </button>
                    </div>
                </div>

                <div className="mt-10 grid grid-cols-12 gap-8 items-end">
                    <div className="col-span-12 md:col-span-7">
                        <p className="text-[10px] uppercase tracking-widest font-black text-zinc-500">T-minus Countdown</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className="text-6xl font-black text-white tracking-tighter italic">18</span>
                            <span className="text-xl font-bold text-zinc-500">H</span>
                            <span className="text-6xl font-black text-white tracking-tighter italic ml-2">42</span>
                            <span className="text-xl font-bold text-zinc-500">M</span>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                        <p className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Vector Routing</p>
                        <div className="mt-3 flex items-center gap-4">
                            <span className="text-lg font-black text-white">BOM</span>
                            <div className="h-px flex-1 relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
                                <motion.div
                                    animate={{ x: ["0%", "470%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-1 h-3 w-px bg-white/20 blur-[1px]"
                                />
                            </div>
                            <span className="text-lg font-black text-white">DEL</span>
                        </div>
                        <p className="mt-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Flight AI-635 · Departs 06:20</p>
                    </div>
                </div>

                {/* Timeline Meter */}
                <div className="mt-10">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-black text-zinc-600 mb-2">
                        <span>Pre-flight</span>
                        <span>Boarding</span>
                        <span>Airborne</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-900/50 border border-white/5 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "38%" }}
                            transition={{ duration: 2, ease: "circOut" }}
                            className="h-full bg-gradient-to-r from-indigo-600 to-cyan-500 relative"
                        >
                            <div className="absolute inset-0 bg-white/10 shimmer-fast" />
                        </motion.div>
                    </div>
                </div>
            </>
        );
    }

    // Booked View
    return (
        <div className="relative h-full flex flex-col justify-between">
            {/* Background Video for Booked State */}
            <div className="absolute inset-0 -m-8 z-0">
                <video
                    src="/videos/travel-route.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-40 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
            </div>

            <div className="relative z-10 flex items-start justify-between">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-emerald-400 mb-1">Mission Confirmed</p>
                    <h2 className="text-3xl font-black text-white tracking-tight">Flight {booked.code}</h2>
                    <p className="text-sm font-medium text-zinc-300">
                        {booked.from} <span className="text-zinc-500 mx-1">→</span> {booked.to}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                        <motion.span
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                        />
                        Live Tracking
                    </span>
                </div>
            </div>

            <div className="relative z-10 mt-auto pt-10">
                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Departure</p>
                        <p className="text-xl font-black text-white">{booked.departTime}</p>
                        <p className="text-xs text-zinc-400">{booked.date}</p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Duration</p>
                        <p className="text-xl font-black text-white">{booked.duration}</p>
                        <p className="text-xs text-zinc-400">{booked.stops}</p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Route</p>
                        {/* Mini visualizer */}
                        <div className="h-8 flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                            <div className="h-0.5 flex-1 bg-white/20" />
                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
