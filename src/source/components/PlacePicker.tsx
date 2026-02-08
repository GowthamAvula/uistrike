"use client";

import React, { useState, useEffect } from "react";
// @ts-ignore
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Check } from "lucide-react";
import { clsx } from "clsx";

/**
 * PlacePicker Component
 * Implements "subtle + fast" animations as requested.
 * 
 * Animation Specs:
 * - Duration: 220ms (Medium), 160ms (Fast)
 * - Easing: cubic-bezier(.2, .8, .2, 1)
 */

interface Airport {
    code: string;
    city: string;
    name: string;
}

const airports: Airport[] = [
    { code: "MAA", city: "Chennai", name: "Chennai International Airport" },
    { code: "DXB", city: "Dubai", name: "Dubai International" },
    { code: "LHR", city: "London", name: "Heathrow Airport" },
    { code: "JFK", city: "New York", name: "John F. Kennedy International" },
    { code: "SIN", city: "Singapore", name: "Changi Airport" },
    { code: "HND", city: "Tokyo", name: "Haneda Airport" },
    { code: "CDG", city: "Paris", name: "Charles de Gaulle" },
    { code: "SFO", city: "San Francisco", name: "San Francisco International" },
];

interface PlacePickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (value: string) => void;
    label: string;
    currentValue?: string;
}

export function PlacePicker({ isOpen, onClose, onSelect, label, currentValue }: PlacePickerProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAirports, setFilteredAirports] = useState(airports);

    useEffect(() => {
        if (isOpen) {
            setSearchTerm("");
            setFilteredAirports(airports);
        }
    }, [isOpen]);

    useEffect(() => {
        const lower = searchTerm.toLowerCase();
        setFilteredAirports(
            airports.filter(
                (a) =>
                    a.city.toLowerCase().includes(lower) ||
                    a.code.toLowerCase().includes(lower) ||
                    a.name.toLowerCase().includes(lower)
            )
        );
    }, [searchTerm]);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                            onClick={onClose}
                        />

                        {/* Modal Panel */}
                        <div
                            key="modal-wrapper"
                            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 12, scale: 0.985 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 12, scale: 0.985 }}
                                transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                                className="w-full max-w-md bg-[#12141c] border border-white/10 rounded-2xl shadow-2xl pointer-events-auto overflow-hidden flex flex-col max-h-[80vh]"
                            >
                                {/* Search Header */}
                                <div className="p-4 border-b border-white/10 flex items-center gap-3">
                                    <Search className="text-white/40" size={18} />
                                    <input
                                        autoFocus
                                        placeholder={`Search ${label}...`}
                                        className="flex-1 bg-transparent border-none outline-none text-white text-base placeholder:text-white/30"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button onClick={onClose} className="text-xs text-white/40 hover:text-white transition-colors">
                                        ESC
                                    </button>
                                </div>

                                {/* List */}
                                <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
                                    {filteredAirports.map((airport, index) => {
                                        const isSelected = currentValue?.includes(airport.code) || currentValue === airport.city;

                                        return (
                                            <div
                                                key={airport.code}
                                                onClick={() => {
                                                    onSelect(`${airport.city} (${airport.code})`);
                                                    onClose();
                                                }}
                                                data-selected={isSelected}
                                                // Animation class logic applied via style tag below for "fast" feel
                                                className="place-row group flex items-center justify-between p-3 rounded-lg cursor-pointer mb-1"
                                                style={{
                                                    animation: `rowIn 180ms cubic-bezier(.2,.8,.2,1) both`,
                                                    animationDelay: `${index * 0.03}s` // Slight stagger only on open
                                                }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={clsx(
                                                        "w-8 h-8 rounded-full flex items-center justify-center bg-white/5",
                                                        "group-hover:bg-white/10 text-white/60 group-hover:text-white transition-colors"
                                                    )}>
                                                        <MapPin size={14} />
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-medium text-sm">
                                                            {airport.city} <span className="opacity-50 ml-1">{airport.code}</span>
                                                        </div>
                                                        <div className="text-white/40 text-xs">{airport.name}</div>
                                                    </div>
                                                </div>

                                                {/* Check Icon with Animation */}
                                                {isSelected && (
                                                    <Check size={16} className="text-blue-400 animate-in fade-in zoom-in duration-200" />
                                                )}
                                            </div>
                                        );
                                    })}

                                    {filteredAirports.length === 0 && (
                                        <div className="p-8 text-center text-white/30 text-sm">
                                            No results found for "{searchTerm}"
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            <style jsx>{`
                /* CSS Implementation of User Request */
                .place-row {
                    transition: background-color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out);
                }
                .place-row:hover {
                    background: rgba(255, 255, 255, 0.04);
                    transform: translateX(2px);
                }
                .place-row:active {
                    transform: translateX(1px) scale(0.99);
                }
                .place-row[data-selected="true"] {
                    background: rgba(124, 195, 255, 0.10);
                }
                @keyframes rowIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}
