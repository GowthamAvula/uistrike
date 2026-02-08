"use client";

import React, { useState } from "react";
import {
    Stack,
    Group,
    Text,
    Title,
    Button,
    ActionIcon,
    Badge,
    Divider,
    Grid,
    UnstyledButton,
    Collapse,
    Stepper,
    Card
} from "@mantine/core";
import {
    ChevronLeft,
    ArrowRight,
    Armchair,
    Briefcase,
    Coffee,
    Wifi,
    Gamepad2,
    ShieldCheck,
    Clock,
    Zap,
    Scale,
    Check,
    Plane
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Flight } from "./flight-results";

interface CustomizationProps {
    flight: Flight;
    onBack: () => void;
    onConfirm: (customData: any) => void;
}

export function FlightCustomization({ flight, onBack, onConfirm }: CustomizationProps) {
    const [step, setStep] = useState(0);
    const [fare, setFare] = useState("standard");
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [addOns, setAddOns] = useState({ meal: false, lounge: false, insurance: true });

    const handleConfirm = () => {
        onConfirm({ flight, fare, selectedSeats, addOns });
    };

    return (
        <Stack gap="xl" className="w-full max-w-6xl mx-auto mt-12 px-8 pb-32">
            <Group>
                <ActionIcon onClick={onBack} variant="subtle" color="gray" size="lg" className="hover:bg-white/5">
                    <ChevronLeft size={24} />
                </ActionIcon>
                <Title order={2} className="text-white font-black italic tracking-tighter uppercase">Customize Trip</Title>
            </Group>

            <Stepper
                active={step}
                onStepClick={setStep}
                color="cyan"
                styles={{
                    stepIcon: { border: '1px solid rgba(34,211,238,0.2)', backgroundColor: 'transparent' },
                    stepLabel: { color: 'white', fontWeight: 900, fontSize: '10px', letterSpacing: '0.1em' },
                    separator: { backgroundColor: 'rgba(255,255,255,0.05)' }
                }}
            >
                <Stepper.Step label="FARE TYPE" />
                <Stepper.Step label="SEAT MAP" />
                <Stepper.Step label="ADD-ONS" />
                <Stepper.Step label="REVIEW" />
            </Stepper>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
                <div className="min-h-[500px]">
                    {step === 0 && <FareSelection fare={fare} setFare={setFare} />}
                    {step === 1 && <SeatSelection selected={selectedSeats} setSelected={setSelectedSeats} />}
                    {step === 2 && <AddOns addOns={addOns} setAddOns={setAddOns} />}
                    {step === 3 && <FinalReview flight={flight} fare={fare} selectedSeats={selectedSeats} addOns={addOns} />}
                </div>

                {/* Price Breakdown Sidebar */}
                <Stack gap="xl" className="sticky top-32 h-fit bg-white/[0.03] backdrop-blur-2xl border border-white/5 rounded-3xl p-8">
                    <Title order={5} className="text-white/40 font-black uppercase tracking-[0.2em] size-xs">Itinerary Summary</Title>

                    <Stack gap="md">
                        <Group justify="space-between">
                            <Text size="sm" fw={800}>{flight.segments[0].from} → {flight.segments[0].to}</Text>
                            <Text size="sm" fw={900}>${flight.price}</Text>
                        </Group>
                        <Group justify="space-between" className="text-cyan-400">
                            <Text size="xs" fw={700} className="uppercase tracking-widest">Fare: {fare}</Text>
                            <Text size="xs" fw={900}>$0</Text>
                        </Group>
                        {selectedSeats.length > 0 && (
                            <Group justify="space-between" className="text-purple-400">
                                <Text size="xs" fw={700} className="uppercase tracking-widest">Seats: {selectedSeats.join(", ")}</Text>
                                <Text size="xs" fw={900}>${selectedSeats.length * 25}</Text>
                            </Group>
                        )}
                        <Divider color="white/5" />
                        <Group justify="space-between">
                            <Text size="lg" fw={900} className="italic text-white">TOTAL</Text>
                            <Text size="xl" fw={900} className="italic text-white underline decoration-cyan-500 decoration-4 underline-offset-8">
                                ${flight.price + (selectedSeats.length * 25)}
                            </Text>
                        </Group>
                    </Stack>

                    <Button
                        fullWidth
                        size="xl"
                        radius="2xl"
                        onClick={() => step < 3 ? setStep(step + 1) : handleConfirm()}
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all font-black uppercase tracking-widest text-xs"
                    >
                        {step === 3 ? "PROCEED TO TRAVELER INFO" : "CONTINUE NEXT"}
                    </Button>
                </Stack>
            </div>
        </Stack>
    );
}

function FareSelection({ fare, setFare }: any) {
    const fares = [
        { id: "basic", label: "BASIC", price: "+$0", icon: <Scale size={18} />, features: ["Personal Bag ONLY", "No Seat Pick", "Non-refundable"] },
        { id: "standard", label: "STANDARD", price: "+$45", icon: <Briefcase size={18} />, features: ["23kg Checked Bag", "Standard Seat Selection", "WiFi (Basic)"] },
        { id: "flex", label: "FLEX", price: "+$120", icon: <ShieldCheck size={18} />, features: ["2x 23kg Bags", "Premium Seats", "Fully Refundable", "Lounge Access"] }
    ];

    return (
        <Stack gap="xl">
            <Title order={3} className="text-white font-black uppercase tracking-tight">Select Fare Type</Title>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {fares.map((f) => (
                    <UnstyledButton
                        key={f.id}
                        onClick={() => setFare(f.id)}
                        className={`p-6 rounded-3xl border transition-all ${fare === f.id
                            ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                            }`}
                    >
                        <Stack gap="md">
                            <Group justify="space-between">
                                <div className={`p-3 rounded-2xl ${fare === f.id ? "bg-cyan-400 text-black" : "bg-white/5 text-white/40"}`}>
                                    {f.icon}
                                </div>
                                <Text size="xl" fw={900} className="italic font-mono">{f.price}</Text>
                            </Group>
                            <Title order={4} className="text-white font-black tracking-widest">{f.label}</Title>
                            <Stack gap={8}>
                                {f.features.map(feat => (
                                    <Group key={feat} gap="xs">
                                        <Check size={12} className={fare === f.id ? "text-cyan-400" : "text-white/20"} />
                                        <Text size="xs" className="text-white/60 font-medium">{feat}</Text>
                                    </Group>
                                ))}
                            </Stack>
                        </Stack>
                    </UnstyledButton>
                ))}
            </div>
        </Stack>
    );
}

function SeatSelection({ selected, setSelected }: any) {
    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const cols = ["A", "B", "C", "D", "E", "F"];

    const toggleSeat = (s: string) => {
        if (selected.includes(s)) setSelected(selected.filter((item: string) => item !== s));
        else setSelected([...selected, s]);
    };

    return (
        <Stack gap="xl" align="center">
            <Stack align="center" gap={5}>
                <Title order={3} className="text-white font-black uppercase tracking-tight">Select your seat</Title>
                <Text size="xs" fw={900} className="text-white/40 tracking-[0.3em] uppercase underline decoration-cyan-500 decoration-2">Airbus A350 Deck Map</Text>
            </Stack>

            <div className="p-8 bg-white/[0.03] border border-white/10 rounded-[4rem] relative">
                {/* Emergency Exits Header */}
                <div className="absolute top-10 left-full ml-4 text-[8px] font-black uppercase tracking-[0.5em] text-red-500/40 vertical-text whitespace-nowrap">EXIT PATHWAY</div>

                <Stack gap="xs">
                    {rows.map(row => (
                        <Group key={row} gap="xl">
                            <Group gap="xs">
                                {cols.slice(0, 3).map(col => (
                                    <Seat
                                        key={`${row}${col}`}
                                        id={`${row}${col}`}
                                        active={selected.includes(`${row}${col}`)}
                                        onClick={() => toggleSeat(`${row}${col}`)}
                                    />
                                ))}
                            </Group>

                            <Text size="xs" fw={900} className="text-white/20 w-4 ta-center">{row}</Text>

                            <Group gap="xs">
                                {cols.slice(3, 6).map(col => (
                                    <Seat
                                        key={`${row}${col}`}
                                        id={`${row}${col}`}
                                        active={selected.includes(`${row}${col}`)}
                                        onClick={() => toggleSeat(`${row}${col}`)}
                                    />
                                ))}
                            </Group>
                        </Group>
                    ))}
                </Stack>
            </div>

            <Group gap="xl">
                <Legend icon={<Armchair size={14} />} label="Available" color="text-white/20" />
                <Legend icon={<Armchair size={14} />} label="Selected" color="text-cyan-400" />
                <Legend icon={<Armchair size={14} />} label="Occupied" color="text-white/5" />
            </Group>
        </Stack>
    );
}

function Seat({ id, active, onClick }: any) {
    return (
        <UnstyledButton
            onClick={onClick}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${active
                ? "bg-cyan-500 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] text-black"
                : "bg-white/5 border-white/5 text-white/20 hover:border-cyan-500/50"
                }`}
        >
            <Armchair size={18} strokeWidth={active ? 3 : 2} />
        </UnstyledButton>
    );
}

function Legend({ icon, label, color }: any) {
    return (
        <Group gap="xs">
            <div className={color}>{icon}</div>
            <Text size="xs" fw={900} className="uppercase tracking-widest text-white/40">{label}</Text>
        </Group>
    );
}

function AddOns({ addOns, setAddOns }: any) {
    const list = [
        { id: "meal", label: "Gourmet Meal", sub: "Chef-curated menu selection", price: "$25", icon: <Coffee /> },
        { id: "lounge", label: "Executive Lounge", sub: "Priority access & premium snacks", price: "$50", icon: <Zap /> },
        { id: "insurance", label: "Travel Shield", sub: "Full coverage for delays & cancellations", price: "$15", icon: <ShieldCheck /> }
    ];

    return (
        <Stack gap="xl">
            <Title order={3} className="text-white font-black uppercase tracking-tight">Enhance Your Experience</Title>
            <Stack gap="md">
                {list.map(item => (
                    <UnstyledButton
                        key={item.id}
                        onClick={() => setAddOns({ ...addOns, [item.id]: !addOns[item.id] as any })}
                        className={`p-6 rounded-3xl border transition-all ${(addOns as any)[item.id]
                            ? "bg-purple-500/10 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                            }`}
                    >
                        <Group justify="space-between">
                            <Group gap="xl">
                                <div className={`p-4 rounded-2xl ${(addOns as any)[item.id] ? "bg-purple-500 text-white" : "bg-white/5 text-white/40"}`}>
                                    {item.icon}
                                </div>
                                <Stack gap={0}>
                                    <Text size="lg" fw={900} className="text-white">{item.label}</Text>
                                    <Text size="xs" className="text-white/40">{item.sub}</Text>
                                </Stack>
                            </Group>
                            <Group gap="xl">
                                <Text size="xl" fw={900} className="italic font-mono text-white">{item.price}</Text>
                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${(addOns as any)[item.id] ? "bg-purple-500 border-purple-400" : "border-white/10"}`}>
                                    {(addOns as any)[item.id] && <Check size={14} className="text-white" />}
                                </div>
                            </Group>
                        </Group>
                    </UnstyledButton>
                ))}
            </Stack>
        </Stack>
    );
}

function FinalReview({ flight, fare, selectedSeats, addOns }: any) {
    return (
        <Stack gap="xl">
            <Title order={3} className="text-white font-black uppercase tracking-tight italic">Review Selection</Title>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Plane size={200} />
                </div>
                <Grid>
                    <Grid.Col span={6}>
                        <Stack gap="xl">
                            <DetailBlock label="FLIGHT" val={`${flight.airline} ${flight.code}`} />
                            <DetailBlock label="FARE" val={fare.toUpperCase()} color="text-cyan-400" />
                            <DetailBlock label="SEATS" val={selectedSeats.join(", ") || "NO SEAT SELECTED"} color="text-purple-400" />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Stack gap="xl">
                            <DetailBlock label="BAGGAGE" val={fare === 'flex' ? '2x 23kg Checked' : 'Standard Carry-on'} />
                            <DetailBlock label="ADD-ONS" val={Object.entries(addOns).filter(([_, v]) => v).map(([k]) => k.toUpperCase()).join(", ") || "NONE"} />
                        </Stack>
                    </Grid.Col>
                </Grid>
            </div>
        </Stack>
    );
}

function DetailBlock({ label, val, color = "text-white" }: any) {
    return (
        <Stack gap={0}>
            <Text size="xs" fw={900} className="text-white/20 tracking-[0.4em] uppercase">{label}</Text>
            <Text size="xl" fw={900} className={`italic tracking-tight ${color}`}>{val}</Text>
        </Stack>
    );
}
