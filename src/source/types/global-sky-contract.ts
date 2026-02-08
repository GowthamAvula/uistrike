/**
 * Global Sky Technical Contract
 * This defines the state machine structure and real-time event schema
 * for the "Full Product" flight booking application.
 */

export interface GlobalSkyState {
    view: 'COMMAND_CENTER' | 'MARKETPLACE' | 'STEPPER' | 'PASS';
    user: {
        name: string;
        tier: 'GOLD' | 'SILVER' | 'BRONZE';
        verified: boolean;
        homeBase: string;
    };
    activeTrips: FlightTrip[];
    marketplace?: {
        searchQuery: FlightSearchQuery;
        results: FlightResult[];
        selectedFlightId?: string;
    };
    currentFlow?: {
        step: 'REVIEW' | 'PASSENGER' | 'SEATS' | 'EXTRAS' | 'PAY';
        passengerData: object;
        selectedSeats: string[];
        extras: string[];
    };
}

export interface FlightTrip {
    id: string;
    type: 'DOMESTIC' | 'INTERNATIONAL';
    flightNo: string;
    airline: string;
    route: string[];
    schedule: {
        departure: string;
        arrival: string;
    };
    ops: {
        status: 'ON_TIME' | 'DELAYED' | 'BOARDING' | 'CANCELLED';
        terminal: string;
        gate: string;
        delayMinutes: number;
    };
    docsPack: {
        completion: number; // 0-100
        items: DocItem[];
    };
}

export interface DocItem {
    id: string;
    label: string;
    status: 'PENDING' | 'VERIFIED' | 'REQUIRED';
    value?: string;
}

export interface FlightSearchQuery {
    origin: string;
    destination: string;
    date: string;
    cabin: string;
    pax: number;
}

export interface FlightResult {
    id: string;
    airline: string;
    price: number;
    duration: string;
    stops: number;
    tags: string[];
}

/**
 * Real-time Event Schema
 * Use these events to trigger UI state changes and animations
 */
export type GlobalSkyEvent =
    | { type: 'GATE_CHANGED'; tripId: string; newGate: string }
    | { type: 'DELAY_DETECTED'; tripId: string; minutes: number }
    | { type: 'BOARDING_STARTED'; tripId: string }
    | { type: 'DOC_VERIFIED'; tripId: string; itemId: string; value: string }
    | { type: 'VIEW_SWITCH'; target: GlobalSkyState['view'] }
    | { type: 'TIGHT_CONNECTION_ALERT'; tripId: string; bufferMinutes: number };

/**
 * Sample Initial State for BOM -> LHR Flow
 */
export const INITIAL_PRODUCT_STATE: GlobalSkyState = {
    view: 'COMMAND_CENTER',
    user: {
        name: 'Alex Sky',
        tier: 'GOLD',
        verified: true,
        homeBase: 'BOM',
    },
    activeTrips: [
        {
            id: 'trip_001',
            type: 'INTERNATIONAL',
            flightNo: 'EK 501',
            airline: 'Emirates',
            route: ['BOM', 'DXB'],
            schedule: {
                departure: '2026-02-09T02:15:00',
                arrival: '2026-02-09T04:00:00',
            },
            ops: {
                status: 'ON_TIME',
                terminal: 'T2',
                gate: 'A7',
                delayMinutes: 0,
            },
            docsPack: {
                completion: 100,
                items: [
                    { id: 'passport', label: 'Passport', status: 'VERIFIED', value: 'Exp 2030' },
                    { id: 'visa', label: 'UAE Visa', status: 'VERIFIED', value: 'UAE-0987654321' },
                    { id: 'insurance', label: 'Travel Insurance', status: 'VERIFIED', value: 'POL-887766' },
                ],
            },
        },
    ],
};
