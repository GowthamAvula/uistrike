"use client";

import React, { useState } from "react";
import {
    Group,
    Stack,
    Text,
    ActionIcon,
    TextInput,
    Select,
    Button,
    Switch,
    NumberInput,
    Popover,
    UnstyledButton,
    Badge,
    Collapse,
    Divider
} from "@mantine/core";
import {
    MapPin,
    Calendar,
    Users,
    ArrowRightLeft,
    Plus,
    Trash2,
    ChevronDown,
    PlaneTakeoff,
    PlaneLanding,
    Briefcase,
    ShieldCheck,
    ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";

export type TripType = "oneway" | "round" | "multicity";

interface FlightSegment {
    id: string;
    from: string;
    to: string;
    date: Date | [Date | null, Date | null] | null;
}

export interface FlightSearchProps {
    onSearch: (data: any) => void;
}

export function FlightSearch({ onSearch }: FlightSearchProps) {
    const [tripType, setTripType] = useState<TripType>("round");
    const [segments, setSegments] = useState<FlightSegment[]>([
        { id: "1", from: "Chennai (MAA)", to: "Dubai (DXB)", date: [null, null] }
    ]);
    const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
    const [cabin, setCabin] = useState("economy");
    const [options, setOptions] = useState({ direct: false, nearby: false, bags: true });

    // Handle hydration safely
    React.useEffect(() => {
        setSegments([{
            id: "1",
            from: "Chennai (MAA)",
            to: "Dubai (DXB)",
            date: tripType === "round" ? [new Date(), new Date()] : new Date()
        }]);
    }, [tripType]);

    const addSegment = () => {
        const last = segments[segments.length - 1];
        setSegments([...segments, {
            id: Math.random().toString(36).substr(2, 9),
            from: last?.to || "",
            to: "",
            date: null
        }]);
    };

    const removeSegment = (id: string) => {
        if (segments.length > 1) {
            setSegments(segments.filter(s => s.id !== id));
        }
    };

    const updateSegment = (id: string, updates: Partial<FlightSegment>) => {
        setSegments(segments.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const handleSearch = () => {
        onSearch({ tripType, segments, passengers, cabin, options });
    };

    return (
        <Stack gap="xl" className="w-full max-w-5xl mx-auto p-1">
            {/* Trip Type & Cabin Selection */}
            <Group justify="space-between">
                <Group gap="xs">
                    {(["round", "oneway", "multicity"] as const).map((type) => (
                        <UnstyledButton
                            key={type}
                            onClick={() => setTripType(type)}
                            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${tripType === type
                                ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
                                }`}
                        >
                            {type.replace("-", " ")}
                        </UnstyledButton>
                    ))}
                </Group>

                <Group gap="md">
                    <Select
                        size="xs"
                        variant="unstyled"
                        value={cabin}
                        onChange={(val: string | null) => setCabin(val || "economy")}
                        data={[
                            { value: "economy", label: "Economy" },
                            { value: "premium_economy", label: "Premium Economy" },
                            { value: "business", label: "Business" },
                            { value: "first", label: "First" },
                        ]}
                        leftSection={<Briefcase size={12} className="text-cyan-400" />}
                        className="bg-white/5 px-4 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors"
                        styles={{
                            input: { color: "white", fontWeight: 700, textTransform: "uppercase", fontSize: "10px", letterSpacing: "0.1em" },
                            dropdown: { background: "#0c121e", border: "1px solid rgba(255,255,255,0.1)", color: "white" },
                            option: { fontSize: "12px" }
                        }}
                    />

                    <Popover position="bottom-end" withArrow shadow="md">
                        <Popover.Target>
                            <UnstyledButton className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors flex items-center gap-2">
                                <Users size={12} className="text-cyan-400" />
                                <Text size="xs" fw={700} className="uppercase tracking-widest text-white">
                                    {passengers.adults + passengers.children + passengers.infants} Traveler
                                </Text>
                                <ChevronDown size={12} className="text-white/40" />
                            </UnstyledButton>
                        </Popover.Target>
                        <Popover.Dropdown bg="#0c121e" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                            <Stack gap="md" p="xs" className="text-white">
                                <PassengerCounter
                                    label="Adults"
                                    desc="Age 12+"
                                    value={passengers.adults}
                                    min={1}
                                    onChange={(val: number) => setPassengers({ ...passengers, adults: val })}
                                />
                                <PassengerCounter
                                    label="Children"
                                    desc="Age 2-11"
                                    value={passengers.children}
                                    onChange={(val: number) => setPassengers({ ...passengers, children: val })}
                                />
                                <PassengerCounter
                                    label="Infants"
                                    desc="Under 2"
                                    value={passengers.infants}
                                    onChange={(val: number) => setPassengers({ ...passengers, infants: val })}
                                />
                            </Stack>
                        </Popover.Dropdown>
                    </Popover>
                </Group>
            </Group>

            {/* Main Search Panel */}
            <div className="relative bg-[#020308]/60 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <Stack gap="lg">
                    <AnimatePresence mode="popLayout">
                        {segments.map((segment, index) => (
                            <motion.div
                                key={segment.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_1fr] gap-4 items-end"
                            >
                                <Stack gap={5}>
                                    <Text size="xs" fw={900} className="uppercase tracking-[0.2em] text-cyan-400/60 ml-1">Origin</Text>
                                    <TextInput
                                        placeholder="From where?"
                                        value={segment.from}
                                        onChange={(e) => updateSegment(segment.id, { from: e.target.value })}
                                        leftSection={<PlaneTakeoff size={18} className="text-white/20" />}
                                        variant="unstyled"
                                        className="bg-white/5 border border-white/5 rounded-2xl px-2 hover:bg-white/10 transition-all font-bold"
                                        styles={{ input: { color: "white", padding: "12px 0", fontSize: "16px" } }}
                                    />
                                </Stack>

                                <div className="hidden md:flex items-center justify-center pb-2">
                                    <ActionIcon
                                        variant="subtle"
                                        color="cyan"
                                        radius="xl"
                                        onClick={() => updateSegment(segment.id, { from: segment.to, to: segment.from })}
                                        className="hover:bg-cyan-500/10"
                                    >
                                        <ArrowRightLeft size={16} />
                                    </ActionIcon>
                                </div>

                                <Stack gap={5}>
                                    <Text size="xs" fw={900} className="uppercase tracking-[0.2em] text-cyan-400/60 ml-1">Destination</Text>
                                    <TextInput
                                        placeholder="Where to?"
                                        value={segment.to}
                                        onChange={(e) => updateSegment(segment.id, { to: e.target.value })}
                                        leftSection={<PlaneLanding size={18} className="text-white/20" />}
                                        variant="unstyled"
                                        className="bg-white/5 border border-white/5 rounded-2xl px-2 hover:bg-white/10 transition-all font-bold"
                                        styles={{ input: { color: "white", padding: "12px 0", fontSize: "16px" } }}
                                    />
                                </Stack>

                                <Stack gap={5}>
                                    <Text size="xs" fw={900} className="uppercase tracking-[0.2em] text-cyan-400/60 ml-1">
                                        {tripType === "round" && index === 0 ? "Dates" : "Departure"}
                                    </Text>
                                    <DatePickerInput
                                        type={tripType === "round" && index === 0 ? "range" : "default"}
                                        placeholder="Pick date"
                                        value={segment.date as any}
                                        onChange={(val: any) => updateSegment(segment.id, { date: val })}
                                        leftSection={<Calendar size={18} className="text-white/20" />}
                                        variant="unstyled"
                                        className="bg-white/5 border border-white/5 rounded-2xl px-2 hover:bg-white/10 transition-all font-bold"
                                        styles={{ input: { color: "white", padding: "12px 0", fontSize: "16px" } }}
                                    />
                                </Stack>

                                {tripType === "multicity" && segments.length > 1 && (
                                    <ActionIcon
                                        variant="subtle"
                                        color="red"
                                        className="absolute -right-12 top-10"
                                        onClick={() => removeSegment(segment.id)}
                                    >
                                        <Trash2 size={16} />
                                    </ActionIcon>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {tripType === "multicity" && (
                        <Button
                            variant="subtle"
                            color="cyan"
                            leftSection={<Plus size={16} />}
                            onClick={addSegment}
                            className="w-fit hover:bg-cyan-500/10 px-6 font-black uppercase tracking-widest text-[10px]"
                        >
                            Add another flight
                        </Button>
                    )}
                </Stack>

                {/* Footer Options */}
                <Group justify="space-between" mt="xl" className="pt-8 border-t border-white/5">
                    <Group gap="xl">
                        <Switch
                            label="Direct Flights Only"
                            size="xs"
                            checked={options.direct}
                            onChange={(e) => setOptions({ ...options, direct: e.currentTarget.checked })}
                            styles={{ label: { color: "rgba(255,255,255,0.4)", fontWeight: 700, textTransform: "uppercase", fontSize: "9px", letterSpacing: "0.1em" } }}
                        />
                        <Switch
                            label="Nearby Airports"
                            size="xs"
                            checked={options.nearby}
                            onChange={(e) => setOptions({ ...options, nearby: e.currentTarget.checked })}
                            styles={{ label: { color: "rgba(255,255,255,0.4)", fontWeight: 700, textTransform: "uppercase", fontSize: "9px", letterSpacing: "0.1em" } }}
                        />
                        <CheckboxButton
                            active={options.bags}
                            onClick={() => setOptions({ ...options, bags: !options.bags })}
                            label="Add Bags Later"
                        />
                    </Group>

                    <Button
                        size="xl"
                        radius="2xl"
                        onClick={handleSearch}
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all px-12 font-black italic tracking-tighter"
                    >
                        SEARCH HORIZON <ArrowRight size={22} className="ml-2 not-italic" />
                    </Button>
                </Group>
            </div>

            {/* Flexible Dates Info */}
            <Group className="bg-cyan-400/5 border border-cyan-400/10 p-4 rounded-2xl" gap="sm">
                <ShieldCheck size={16} className="text-cyan-400" />
                <Text size="xs" className="text-cyan-100/60 font-medium">
                    Flexible with dates? Search ±3 days for the absolute best fares across world borders.
                </Text>
            </Group>
        </Stack>
    );
}

function PassengerCounter({ label, desc, value, onChange, min = 0 }: any) {
    return (
        <Group justify="space-between" w={220}>
            <Stack gap={0}>
                <Text size="sm" fw={800} className="text-white">{label}</Text>
                <Text size="xs" className="text-white/40">{desc}</Text>
            </Stack>
            <Group gap="xs">
                <ActionIcon
                    variant="outline"
                    color="cyan"
                    disabled={value <= min}
                    onClick={() => onChange(value - 1)}
                    size="sm"
                >
                    <Text fw={900}>-</Text>
                </ActionIcon>
                <Text size="sm" fw={900} w={20} ta="center">{value}</Text>
                <ActionIcon
                    variant="outline"
                    color="cyan"
                    onClick={() => onChange(value + 1)}
                    size="sm"
                >
                    <Plus size={12} />
                </ActionIcon>
            </Group>
        </Group>
    );
}

function CheckboxButton({ active, onClick, label }: any) {
    return (
        <UnstyledButton onClick={onClick} className="flex items-center gap-2 group">
            <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${active ? "bg-cyan-400 border-cyan-400" : "border-white/20 group-hover:border-white/40"}`}>
                {active && <Plus size={10} className="text-black" />}
            </div>
            <Text size="xs" fw={700} className={`uppercase tracking-widest text-[9px] transition-colors ${active ? "text-white" : "text-white/40"}`}>
                {label}
            </Text>
        </UnstyledButton>
    );
}
