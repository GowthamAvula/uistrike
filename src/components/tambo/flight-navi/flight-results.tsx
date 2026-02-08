"use client";

import React, { useState, useMemo } from "react";
import {
    Stack,
    Group,
    Text,
    Title,
    RangeSlider,
    Checkbox,
    Tabs,
    Chip,
    ScrollArea,
    ActionIcon,
    Badge,
    Collapse,
    Divider,
    Button
} from "@mantine/core";
import {
    Filter,
    ArrowUpDown,
    ChevronDown,
    Info,
    Wifi,
    Coffee,
    Clock,
    Zap,
    TrendingDown,
    MapPin,
    Plane,
    Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type Flight = {
    id: string;
    airline: string;
    logo: string;
    code: string;
    segments: {
        from: string;
        to: string;
        depart: string;
        arrive: string;
        duration: string;
        stops: number;
    }[];
    price: number;
    score: number; // 1-10 quality score
    features: string[];
};

const DEMO_FLIGHTS: Flight[] = [
    {
        id: "1",
        airline: "Jesko Air",
        logo: "JX",
        code: "JX 402",
        segments: [{ from: "MAA", to: "DXB", depart: "08:45", arrive: "11:20", duration: "2h 35m", stops: 0 }],
        price: 468,
        score: 9.8,
        features: ["WiFi", "Meal", "USB"]
    },
    {
        id: "2",
        airline: "Skylane",
        logo: "SK",
        code: "SK 118",
        segments: [{ from: "MAA", to: "DXB", depart: "12:10", arrive: "15:05", duration: "2h 55m", stops: 1 }],
        price: 392,
        score: 8.5,
        features: ["WiFi"]
    },
    {
        id: "3",
        airline: "Aurora Jets",
        logo: "AJ",
        code: "AJ 901",
        segments: [{ from: "MAA", to: "DXB", depart: "18:30", arrive: "21:00", duration: "2h 30m", stops: 0 }],
        price: 529,
        score: 9.2,
        features: ["WiFi", "Meal", "Legroom"]
    }
];

export function FlightResults({ onSelect }: { onSelect: (f: Flight) => void }) {
    const [sortBy, setBy] = useState<string>("best");
    const [filters, setFilters] = useState({
        nonstop: false,
        morning: false,
        priceRange: [0, 1000] as [number, number],
    });

    const sortedFlights = useMemo(() => {
        let list = [...DEMO_FLIGHTS];

        if (filters.nonstop) list = list.filter(f => f.segments.every(s => s.stops === 0));

        if (sortBy === "cheapest") return list.sort((a, b) => a.price - b.price);
        if (sortBy === "fastest") return list.sort((a, b) => a.segments[0].duration.localeCompare(b.segments[0].duration));
        return list.sort((a, b) => b.score - a.score);
    }, [sortBy, filters]);

    return (
        <Group align="flex-start" gap="xl" className="w-full max-w-[1400px] mx-auto mt-12 px-8">
            {/* Sidebar Filters */}
            <Stack gap="xl" className="w-80 flex-shrink-0 sticky top-32">
                <Group justify="space-between">
                    <Title order={4} className="text-white font-black italic tracking-tighter uppercase">Filters</Title>
                    <Text size="xs" fw={700} className="text-cyan-400 cursor-pointer hover:underline uppercase tracking-widest">Reset</Text>
                </Group>

                <FilterSection title="Stops">
                    <Stack gap="xs">
                        <FilterCheckbox label="Non-Stop" count={4} checked={filters.nonstop} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, nonstop: e.target.checked })}
                        />
                        <FilterCheckbox label="1 Stop" count={12} />
                        <FilterCheckbox label="2+ Stops" count={2} />
                    </Stack>
                </FilterSection>

                <FilterSection title="Airlines">
                    <Stack gap="xs">
                        <FilterCheckbox label="Jesko Air" count={8} checked />
                        <FilterCheckbox label="Skylane" count={15} checked />
                        <FilterCheckbox label="Aurora Jets" count={3} checked />
                    </Stack>
                </FilterSection>

                <FilterSection title="Price Range">
                    <Stack gap="lg" pt="sm">
                        <RangeSlider
                            color="cyan"
                            min={0}
                            max={1000}
                            label={val => `$${val}`}
                            value={filters.priceRange}
                            onChange={(val) => setFilters({ ...filters, priceRange: val })}
                            styles={{
                                thumb: { border: '2px solid #22d3ee', backgroundColor: '#020308' },
                                track: { backgroundColor: 'rgba(255,255,255,0.05)' },
                                bar: { backgroundColor: '#22d3ee' }
                            }}
                        />
                        <Group justify="space-between" className="text-white/40">
                            <Text size="xs" fw={700}>$0</Text>
                            <Text size="xs" fw={700}>$1,000</Text>
                        </Group>
                    </Stack>
                </FilterSection>
            </Stack>

            {/* Main Results Area */}
            <Stack gap="xl" className="flex-1">
                {/* Sorting Tabs */}
                <Tabs value={sortBy} onChange={(val) => setBy(val || "best")} variant="none">
                    <Tabs.List className="bg-white/5 p-1 rounded-2xl border border-white/10 flex gap-1">
                        <SortTab value="best" label="BEST" sub="Recommended" />
                        <SortTab value="cheapest" label="CHEAPEST" sub="Standard Economy" />
                        <SortTab value="fastest" label="FASTEST" sub="Shortest Duration" />
                    </Tabs.List>
                </Tabs>

                {/* Chips for Quick Filter */}
                <Group gap="xs">
                    <Chip.Group multiple value={[]}>
                        <QuickChip label="Morning Flights" />
                        <QuickChip label="Free Meal" />
                        <QuickChip label="Refundable" />
                        <QuickChip label="WiFi Included" />
                    </Chip.Group>
                </Group>

                {/* Cards List */}
                <Stack gap="lg">
                    <AnimatePresence mode="popLayout">
                        {sortedFlights.map((flight) => (
                            <FlightResultCard
                                key={flight.id}
                                flight={flight}
                                onSelect={() => onSelect(flight)}
                            />
                        ))}
                    </AnimatePresence>
                </Stack>
            </Stack>
        </Group>
    );
}

function FilterSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <Stack gap="md">
            <Text size="xs" fw={900} className="uppercase tracking-[.25em] text-white/30 border-b border-white/5 pb-2">{title}</Text>
            {children}
        </Stack>
    );
}

function FilterCheckbox({ label, count, checked, onChange }: any) {
    return (
        <Group justify="space-between" align="center" style={{ cursor: 'pointer' }} onClick={onChange}>
            <Checkbox
                label={label}
                checked={checked}
                onChange={onChange}
                color="cyan"
                styles={{
                    label: { color: "white", fontSize: "13px", fontWeight: 600, paddingLeft: '12px' },
                    input: { backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.1)' }
                }}
            />
            <Text size="xs" className="text-white/20 font-mono">{count}</Text>
        </Group>
    );
}

function SortTab({ value, label, sub }: { value: string, label: string, sub: string }) {
    return (
        <Tabs.Tab
            value={value}
            className="flex-1 h-14 rounded-xl transition-all border border-transparent data-[active]:bg-cyan-500/10 data-[active]:border-cyan-500/30"
        >
            <Stack gap={0} align="center">
                <Text size="xs" fw={900} className="tracking-widest uppercase data-[active]:text-cyan-400">{label}</Text>
                <Text size="xs" className="opacity-40">{sub}</Text>
            </Stack>
        </Tabs.Tab>
    );
}

function QuickChip({ label }: { label: string }) {
    return (
        <Chip
            size="xs"
            variant="outline"
            color="cyan"
            styles={{
                label: { borderRadius: '12px', padding: '12px 16px', textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.1em', fontSize: '9px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' },
                checkIcon: { display: 'none' }
            }}
        >
            {label}
        </Chip>
    );
}

function FlightResultCard({ flight, onSelect }: { flight: Flight, onSelect: () => void }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-3xl p-8 hover:bg-white/[0.06] hover:border-cyan-500/20 transition-all cursor-pointer shadow-xl"
            onClick={onSelect}
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8">
                <Stack gap="xl">
                    {flight.segments.map((s, i) => (
                        <Group key={i} justify="space-between" align="center">
                            <Group gap="xl">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black italic text-cyan-400">
                                    {flight.logo}
                                </div>
                                <Stack gap={0}>
                                    <Text size="xl" fw={900}>{s.depart} — {s.arrive}</Text>
                                    <Text size="xs" fw={700} className="text-white/40 uppercase tracking-widest">{flight.airline} • {flight.code}</Text>
                                </Stack>
                            </Group>

                            <Stack gap={0} align="center" className="flex-1 px-8 hidden sm:flex">
                                <Text size="xs" fw={900} className="text-white/40 tracking-[0.3em] uppercase">{s.duration}</Text>
                                <div className="w-full h-px bg-white/10 relative my-2">
                                    <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-white/20 rounded-full -translate-y-1/2" />
                                    <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-white/20 rounded-full -translate-y-1/2" />
                                    <Plane size={14} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-500" />
                                </div>
                                <Text size="xs" fw={700} className={s.stops === 0 ? "text-emerald-400" : "text-amber-400"}>
                                    {s.stops === 0 ? "NON‑STOP" : `${s.stops} STOP`}
                                </Text>
                            </Stack>

                            <Stack gap={0} align="flex-end">
                                <Text size="sm" fw={800}>{s.from} — {s.to}</Text>
                                <Text size="xs" className="text-white/20 uppercase font-black">Segment {i + 1}</Text>
                            </Stack>
                        </Group>
                    ))}

                    <Group gap="md">
                        {flight.features.map(f => (
                            <Badge key={f} variant="outline" color="gray" size="xs" className="border-white/10 text-white/40 font-black tracking-widest px-3 py-2">
                                {f}
                            </Badge>
                        ))}
                        <Text size="xs" className="text-white/20 flex items-center gap-2 ml-auto">
                            <TrendingDown size={14} /> Low price for MAA‑DXB
                        </Text>
                    </Group>
                </Stack>

                <Stack justify="center" align="center" className="bg-white/5 rounded-2xl p-6 border border-white/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all">
                    <Text size="xs" fw={900} className="text-cyan-400/60 tracking-[.3em] uppercase">Total Price</Text>
                    <Title className="text-4xl font-black italic tracking-tighter">${flight.price}</Title>
                    <Button
                        fullWidth
                        onClick={onSelect}
                        className="bg-white text-black hover:bg-cyan-400 hover:text-white transition-all font-black uppercase tracking-widest text-[10px] h-10 mt-2"
                    >
                        Select Flight
                    </Button>
                </Stack>
            </div>
        </motion.div>
    );
}
