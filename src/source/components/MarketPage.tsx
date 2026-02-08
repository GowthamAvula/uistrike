"use client";

import React from "react";
import { PageBG } from "./PageBG";
import { cardClass } from "./CardStyles";
import { ShoppingCart, Search, Filter } from "lucide-react";
import { clsx } from "clsx";

export function MarketPage() {
    return (
        <PageBG>
            <div className="relative z-10 p-6 pt-20 max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white/90 tracking-tight">Marketplace</h1>
                        <p className="text-white/50 mt-1">Discover tools, integrations, and data packs.</p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white/80 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/90 placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500/50 hover:bg-white/10 transition-all w-64"
                            />
                        </div>
                        <button className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-colors">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Market Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {MARKET_ITEMS.map((item, i) => (
                        <MarketCard key={i} item={item} />
                    ))}
                </div>
            </div>
        </PageBG>
    );
}

interface MarketItem {
    title: string;
    description: string;
    category: string;
    price: string;
    rating: number;
    reviews: number;
    color: string;
    icon: React.ReactNode;
}

function MarketCard({ item }: { item: MarketItem }) {
    return (
        <div className={clsx(cardClass, "flex flex-col h-full")}>
            <div className="h-40 rounded-t-2xl bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center border-b border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] to-transparent opacity-60" />
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500 text-white/20">
                    {item.icon}
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-medium text-white/80 border border-white/10">
                    {item.price}
                </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 ${item.color}`}>
                        {item.category}
                    </span>
                </div>
                <h3 className="text-lg font-semibold text-white/90 mb-1">{item.title}</h3>
                <p className="text-sm text-white/50 mb-4 line-clamp-2">{item.description}</p>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-white/40">
                        <span>{item.rating}</span>
                        <span>★</span>
                        <span>({item.reviews})</span>
                    </div>
                    <button className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 text-white/60 transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

const MARKET_ITEMS = [
    {
        title: "Threat Intel Pro",
        description: "Advanced heuristics and real-time threat feed integration for enterprise implementation.",
        category: "Security",
        price: "$49/mo",
        rating: 4.8,
        reviews: 124,
        color: "text-emerald-400",
        icon: <ShieldCheckIcon className="w-16 h-16" />
    },
    {
        title: "Dark Web Scanner",
        description: "Monitor exposure of credentials and sensitive data across darknet markets.",
        category: "Analysis",
        price: "$29/mo",
        rating: 4.6,
        reviews: 89,
        color: "text-purple-400",
        icon: <GlobeIcon className="w-16 h-16" />
    },
    {
        title: "API Shield",
        description: "Protect your endpoints from abuse and automated attacks with AI-driven rate limiting.",
        category: "Infrastructure",
        price: "$89/mo",
        rating: 4.9,
        reviews: 210,
        color: "text-blue-400",
        icon: <KeyIcon className="w-16 h-16" />
    },
    {
        title: "PhishGuard Enterprise",
        description: "Complete email security suite with automated incident response.",
        category: "Bundle",
        price: "$199/mo",
        rating: 5.0,
        reviews: 45,
        color: "text-amber-400",
        icon: <MailIcon className="w-16 h-16" />
    },
    {
        title: "Log Analyzer",
        description: "Centralized logging with anomaly detection patterns.",
        category: "Tools",
        price: "Free",
        rating: 4.5,
        reviews: 320,
        color: "text-white/60",
        icon: <FileTextIcon className="w-16 h-16" />
    },
];

// Simple icons for the demo
function ShieldCheckIcon(props: React.SVGProps<SVGSVGElement>) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg> }
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg> }
function KeyIcon(props: React.SVGProps<SVGSVGElement>) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg> }
function MailIcon(props: React.SVGProps<SVGSVGElement>) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> }
function FileTextIcon(props: React.SVGProps<SVGSVGElement>) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg> }
