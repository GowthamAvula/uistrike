"use client";

import React, { useState, useEffect } from "react";
import {
    Stack,
    Group,
    Text,
    Title,
    TextInput,
    Select,
    Button,
    ActionIcon,
    Badge,
    Divider,
    Grid,
    UnstyledButton,
    Modal,
    Paper,
    Alert
} from "@mantine/core";
import {
    ChevronLeft,
    User,
    Globe,
    Calendar,
    ShieldCheck,
    CreditCard,
    CheckCircle2,
    Download,
    Share2,
    Lock,
    Tag,
    AlertCircle,
    Plane
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TravelerDetails({ onBack, onConfirm, passengers, userName }: any) {
    const totalCount = (passengers?.adults || 0) + (passengers?.children || 0) + (passengers?.infants || 0) || 1;

    const [travelers, setTravelers] = useState(
        Array.from({ length: totalCount }, (_, i) => ({
            id: i + 1,
            first: i === 0 && userName ? userName.split(' ')[0] : "",
            last: i === 0 && userName ? userName.split(' ').slice(1).join(' ') : "",
            dob: "",
            gender: "male",
            passport: "",
            type: i < (passengers?.adults || 1) ? 'ADULT' : (i < (passengers?.adults || 1) + (passengers?.children || 0) ? 'CHILD' : 'INFANT')
        }))
    );
    const [contact, setContact] = useState({ email: "", phone: "" });
    const [error, setError] = useState<string | null>(null);

    const updateTraveler = (id: number, field: string, value: string) => {
        setTravelers(travelers.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const handleContinue = () => {
        // Validate all travelers
        const incompleteTraveler = travelers.find(t => !t.first || !t.last || !t.dob || !t.passport);
        if (incompleteTraveler) {
            setError(`Please fill all details for Traveler ${incompleteTraveler.id}`);
            return;
        }

        // Validate contact info
        if (!contact.email || !contact.phone) {
            setError("Please fill all contact details");
            return;
        }

        setError(null);
        onConfirm();
    };

    return (
        <Stack gap="xl" className="w-full max-w-4xl mx-auto mt-12 px-8 pb-32">
            <Group>
                <ActionIcon onClick={onBack} variant="subtle" color="gray" size="lg">
                    <ChevronLeft size={24} />
                </ActionIcon>
                <Title order={2} className="text-white font-black italic tracking-tighter uppercase">Traveler Details</Title>
            </Group>

            {error && (
                <Alert icon={<AlertCircle size={16} />} title="Validation Error" color="red" variant="outline" className="rounded-2xl border-red-500/20 bg-red-500/5">
                    {error}
                </Alert>
            )}

            <Stack gap="lg">
                {travelers.map((t, i) => (
                    <Paper key={t.id} shadow="xl" p="xl" className="bg-white/[0.03] border border-white/5 rounded-3xl">
                        <Stack gap="md">
                            <Group justify="space-between">
                                <Text size="xs" fw={900} className="uppercase tracking-[0.3em] text-cyan-400">Traveler {i + 1}</Text>
                                <Badge variant="dot" color={t.type === 'ADULT' ? 'cyan' : 'orange'} size="xs">{t.type}</Badge>
                            </Group>

                            <Grid>
                                <Grid.Col span={6}>
                                    <TInput
                                        label="First Name"
                                        placeholder="e.g. JOHN"
                                        value={t.first}
                                        onChange={(e: any) => updateTraveler(t.id, 'first', e.target.value)}
                                        error={!t.first && error?.includes(`Traveler ${t.id}`)}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <TInput
                                        label="Last Name"
                                        placeholder="e.g. DOE"
                                        value={t.last}
                                        onChange={(e: any) => updateTraveler(t.id, 'last', e.target.value)}
                                        error={!t.last && error?.includes(`Traveler ${t.id}`)}
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <TInput
                                        label="DOB"
                                        placeholder="YYYY-MM-DD"
                                        value={t.dob}
                                        onChange={(e: any) => updateTraveler(t.id, 'dob', e.target.value)}
                                        error={!t.dob && error?.includes(`Traveler ${t.id}`)}
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <Select
                                        label={<Text className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Gender</Text>}
                                        variant="unstyled"
                                        value={t.gender}
                                        onChange={(val) => updateTraveler(t.id, 'gender', val || 'male')}
                                        data={[{ value: 'male', label: 'MALE' }, { value: 'female', label: 'FEMALE' }]}
                                        className="bg-white/5 px-4 rounded-xl border border-white/5"
                                        styles={{ input: { color: 'white', fontWeight: 800, height: '44px' } }}
                                    />
                                </Grid.Col>
                                <Grid.Col span={4}>
                                    <TInput
                                        label="Passport"
                                        placeholder="DOC NUMBER"
                                        value={t.passport}
                                        onChange={(e: any) => updateTraveler(t.id, 'passport', e.target.value)}
                                        error={!t.passport && error?.includes(`Traveler ${t.id}`)}
                                    />
                                </Grid.Col>
                            </Grid>
                        </Stack>
                    </Paper>
                ))}
            </Stack>

            <Stack gap="md">
                <Text size="xs" fw={900} className="uppercase tracking-[0.3em] text-white/30">Contact Information</Text>
                <Grid>
                    <Grid.Col span={6}>
                        <TInput
                            label="Email Address"
                            placeholder="FOR E-TICKET"
                            value={contact.email}
                            onChange={(e: any) => setContact({ ...contact, email: e.target.value })}
                            error={!contact.email && error?.includes("contact details")}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TInput
                            label="Phone Number"
                            placeholder="+91 ..."
                            value={contact.phone}
                            onChange={(e: any) => setContact({ ...contact, phone: e.target.value })}
                            error={!contact.phone && error?.includes("contact details")}
                        />
                    </Grid.Col>
                </Grid>
            </Stack>

            <Button
                size="xl"
                radius="2xl"
                onClick={handleContinue}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 font-black uppercase tracking-widest text-xs h-16 mt-8"
            >
                PROCEED TO SECURE PAYMENT <Lock size={20} className="ml-2" />
            </Button>
        </Stack>
    );
}

export function PaymentConfirmation({ onFinish }: any) {
    const [status, setStatus] = useState<'pay' | 'success'>('pay');
    const [paymentData, setPaymentData] = useState({ card: "", expiry: "", cvc: "" });
    const [promo, setPromo] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handlePay = () => {
        if (!paymentData.card || !paymentData.expiry || !paymentData.cvc) {
            setError("Please fill all payment details");
            return;
        }
        setError(null);
        setStatus('success');
    };

    if (status === 'success') return <SuccessScreen onFinish={onFinish} />;

    return (
        <Stack gap="xl" className="w-full max-w-4xl mx-auto mt-12 px-8 pb-32">
            <Title order={2} className="text-white font-black italic tracking-tighter uppercase">Secure Checkout</Title>

            {error && (
                <Alert icon={<AlertCircle size={16} />} title="Payment Error" color="red" variant="outline" className="rounded-2xl border-red-500/20 bg-red-500/5">
                    {error}
                </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12">
                <Stack gap="xl">
                    <Paper p="xl" className="bg-white/[0.03] border border-white/5 rounded-3xl">
                        <Stack gap="lg">
                            <Group justify="space-between">
                                <Text size="sm" fw={900} className="uppercase tracking-widest text-white">Payment Method</Text>
                                <Group gap="xs">
                                    <CreditCard size={14} className="text-white/20" />
                                    <ShieldCheck size={14} className="text-cyan-400" />
                                </Group>
                            </Group>

                            <Stack gap="md">
                                <TInput
                                    label="Card Number"
                                    placeholder="xxxx xxxx xxxx xxxx"
                                    value={paymentData.card}
                                    onChange={(e: any) => setPaymentData({ ...paymentData, card: e.target.value })}
                                    error={!paymentData.card && !!error}
                                />
                                <Grid>
                                    <Grid.Col span={8}>
                                        <TInput
                                            label="Expiry Date"
                                            placeholder="MM/YY"
                                            value={paymentData.expiry}
                                            onChange={(e: any) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                                            error={!paymentData.expiry && !!error}
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={4}>
                                        <TInput
                                            label="CVC"
                                            placeholder="***"
                                            type="password"
                                            value={paymentData.cvc}
                                            onChange={(e: any) => setPaymentData({ ...paymentData, cvc: e.target.value })}
                                            error={!paymentData.cvc && !!error}
                                        />
                                    </Grid.Col>
                                </Grid>
                            </Stack>
                        </Stack>
                    </Paper>

                    <Alert icon={<AlertCircle size={16} />} title="Important" color="cyan" variant="outline" className="rounded-2xl border-cyan-400/20 bg-cyan-400/5">
                        <Text size="xs">Your booking will be held for 15 minutes. Prices are subject to volatility in the horizon.</Text>
                    </Alert>
                </Stack>

                <Stack gap="xl">
                    <Paper p="xl" className="bg-white/[0.03] border border-white/5 rounded-3xl">
                        <Stack gap="md">
                            <Group justify="space-between">
                                <Text size="xs" fw={900} className="text-white/40 uppercase tracking-widest">Total</Text>
                                <Title order={3} className="text-white font-black">$518</Title>
                            </Group>
                            <Divider color="white/5" />
                            <Stack gap={5}>
                                <Text size="xs" fw={700} className="text-white/20 uppercase">Promo Code</Text>
                                <Group gap="xs">
                                    <TextInput
                                        variant="unstyled"
                                        placeholder="SKY2026"
                                        value={promo}
                                        onChange={(e) => setPromo(e.target.value)}
                                        className="bg-white/5 border border-white/5 rounded-xl px-3 flex-1"
                                        styles={{ input: { color: 'white', fontWeight: 700, fontSize: '12px' } }}
                                    />
                                    <Button size="xs" variant="subtle" color="cyan">APPLY</Button>
                                </Group>
                            </Stack>
                        </Stack>
                    </Paper>

                    <Button
                        fullWidth
                        size="xl"
                        radius="2xl"
                        onClick={handlePay}
                        className="bg-white text-black font-black uppercase tracking-widest text-xs h-16 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        PAY NOW
                    </Button>
                </Stack>
            </div>
        </Stack>
    );
}

function SuccessScreen({ onFinish }: any) {
    return (
        <Stack align="center" justify="center" className="min-h-[80vh] w-full px-4" gap="xl">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 20 }}
                className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)] mb-4"
            >
                <CheckCircle2 size={40} />
            </motion.div>

            <Stack align="center" gap={5}>
                <Title order={1} className="text-4xl md:text-6xl font-black italic tracking-tighter text-white text-center">
                    VOYAGE <span className="text-cyan-400">SECURED</span>
                </Title>
                <Text size="xs" fw={900} className="text-white/20 tracking-[0.5em] uppercase text-center">Protocol TS-8829-QX • Universal Sync Complete</Text>
            </Stack>

            {/* Premium Digital Boarding Pass */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative group perspective-[1000px]"
            >
                <Paper
                    className="relative w-full max-w-[650px] overflow-hidden rounded-[2.5rem] bg-zinc-950 border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
                    style={{ transform: 'rotateX(5deg)' }}
                >
                    {/* Holographic Header */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-transparent to-blue-500 opacity-50" />

                    <div className="flex flex-col md:flex-row h-full">
                        {/* Main Ticket Area */}
                        <div className="flex-1 p-8 md:p-12 border-r border-dashed border-white/10 relative">
                            <Stack gap="xl">
                                <Group justify="space-between">
                                    <Stack gap={0}>
                                        <Text size="xs" fw={900} className="text-cyan-400 tracking-widest uppercase mb-1">Carrier</Text>
                                        <Text size="xl" fw={900} className="italic tracking-tighter">TAMBO SKY</Text>
                                    </Stack>
                                    <Badge variant="outline" color="cyan" radius="xs" className="border-cyan-400/30 animate-pulse">FIRST CLASS</Badge>
                                </Group>

                                <div className="flex justify-between items-center py-6">
                                    <Stack gap={0}>
                                        <Title className="text-5xl font-black tracking-tighter">MAA</Title>
                                        <Text size="xs" fw={800} className="text-white/30 uppercase tracking-widest">Chennai</Text>
                                    </Stack>
                                    <div className="flex flex-col items-center gap-2 flex-1 px-8 opacity-40">
                                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                                        <Plane size={16} className="text-cyan-400 rotate-90" />
                                        <Text fz={8} fw={900} className="uppercase tracking-[0.3em]">Non-Stop</Text>
                                    </div>
                                    <Stack align="flex-end" gap={0}>
                                        <Title className="text-5xl font-black tracking-tighter">DXB</Title>
                                        <Text size="xs" fw={800} className="text-white/30 uppercase tracking-widest text-right">Dubai</Text>
                                    </Stack>
                                </div>

                                <div className="grid grid-cols-3 gap-8 pt-4">
                                    <Stack gap={2}>
                                        <Text fz={10} fw={900} className="text-white/20 uppercase tracking-widest">Gate</Text>
                                        <Text fw={900} className="text-cyan-400">A12</Text>
                                    </Stack>
                                    <Stack gap={2}>
                                        <Text fz={10} fw={900} className="text-white/20 uppercase tracking-widest">Seat</Text>
                                        <Text fw={900} className="text-white">04A</Text>
                                    </Stack>
                                    <Stack gap={2}>
                                        <Text fz={10} fw={900} className="text-white/20 uppercase tracking-widest">Boarding</Text>
                                        <Text fw={900} className="text-white">08:45</Text>
                                    </Stack>
                                </div>
                            </Stack>

                            {/* Ticket Punch Circles */}
                            <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[#020308]" />
                            <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-[#020308]" />
                        </div>

                        {/* Stubs / QR Section */}
                        <div className="w-full md:w-[200px] bg-white/[0.02] p-8 md:p-12 flex flex-col justify-between items-center relative">
                            <Stack align="center" gap="md">
                                <div className="p-2 bg-white rounded-2xl">
                                    <div className="w-24 h-24 bg-zinc-950 rounded-xl grid grid-cols-5 grid-rows-5 gap-1 p-2">
                                        {Array.from({ length: 25 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className={`rounded-[2px] ${Math.random() > 0.4 ? 'bg-cyan-400' : 'bg-transparent'} ${i === 0 || i === 4 || i === 20 || i === 24 ? 'bg-cyan-400' : ''}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <Text fz={10} fw={900} className="text-cyan-400 tracking-[0.2em] font-mono">B-CODE: SK-921</Text>
                            </Stack>

                            <Stack gap={4} align="center">
                                <Text fz={8} fw={900} className="text-white/20 uppercase tracking-[0.4em] mb-2">Digital Pass</Text>
                                <Group gap="xs">
                                    <ActionIcon size="sm" radius="xs" variant="light" color="cyan" className="bg-cyan-400/10 border-cyan-400/20"><Download size={14} /></ActionIcon>
                                    <ActionIcon size="sm" radius="xs" variant="light" color="cyan" className="bg-cyan-400/10 border-cyan-400/20"><Share2 size={14} /></ActionIcon>
                                </Group>
                            </Stack>
                        </div>
                    </div>

                    {/* Ambient Glow */}
                    <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
                </Paper>
            </motion.div>

            <Button
                variant="subtle"
                color="gray"
                onClick={onFinish}
                className="font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors"
                leftSection={<ChevronLeft size={14} />}
            >
                Return to Command Center
            </Button>
        </Stack>
    );
}

function TInput({ label, error, ...props }: any) {
    return (
        <Stack gap={5}>
            <Text className={`text-[10px] font-black uppercase tracking-widest ${error ? 'text-red-400' : 'text-white/30'} ml-1`}>{label}</Text>
            <TextInput
                variant="unstyled"
                className={`bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 hover:bg-white/10 transition-all`}
                styles={{ input: { color: 'white', fontWeight: 800, padding: '12px 0' } }}
                {...props}
            />
        </Stack>
    );
}
