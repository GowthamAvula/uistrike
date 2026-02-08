"use client";
import * as THREE from "three";
import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

type ArcSpec = {
    from: [number, number];
    to: [number, number];
}; // lat, lon

export function FlightArcStrands({ arc }: { arc: ArcSpec }) {
    const curve = useMemo(() => {
        const p0 = latLonToVec3(arc.from[0], arc.from[1], 1.06);
        const p1 = latLonToVec3(arc.to[0], arc.to[1], 1.06);
        const mid = p0.clone().add(p1).multiplyScalar(0.5).normalize().multiplyScalar(1.55);
        return new THREE.CatmullRomCurve3([p0, mid, p1]);
    }, [arc]);

    // Cyan rim is slightly thicker so it “wraps” the gold core
    const geoCyan = useMemo(() => new THREE.TubeGeometry(curve, 140, 0.0085, 8, false), [curve]);
    const geoGoldA = useMemo(() => new THREE.TubeGeometry(curve, 140, 0.0055, 8, false), [curve]);
    const geoGoldB = useMemo(() => new THREE.TubeGeometry(curve, 140, 0.0035, 8, false), [curve]);

    return (
        <group>
            {/* Cyan rim-light */}
            <mesh geometry={geoCyan}>
                <meshStandardMaterial color="#4DEBFF" emissive="#46E6FF" emissiveIntensity={1.25} roughness={0.25} metalness={0.05} transparent opacity={0.30} />
            </mesh>
            {/* Gold core strands */}
            <mesh geometry={geoGoldA}>
                <meshStandardMaterial color="#FFCC66" emissive="#FFB84D" emissiveIntensity={1.25} roughness={0.22} metalness={0.10} transparent opacity={0.75} />
            </mesh>
            <mesh geometry={geoGoldB}>
                <meshStandardMaterial color="#FFF2C6" emissive="#FFE2A3" emissiveIntensity={1.55} roughness={0.18} metalness={0.06} transparent opacity={0.55} />
            </mesh>
            {/* Moving pulses (keep warm, premium) */}
            <Pulse curve={curve} speed={0.17} size={0.028} />
            <Pulse curve={curve} speed={0.12} size={0.02} offset={0.45} />
        </group>
    );
}

function Pulse({ curve, speed, size, offset = 0, }: { curve: THREE.Curve<THREE.Vector3>; speed: number; size: number; offset?: number; }) {
    const m = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (!m.current) return;
        const t = (clock.getElapsedTime() * speed + offset) % 1;
        m.current.position.copy(curve.getPointAt(t));
    });
    return (
        <mesh ref={m}>
            <sphereGeometry args={[size, 18, 18]} />
            <meshBasicMaterial color="#FFF0B8" transparent opacity={0.95} />
        </mesh>
    );
}

function latLonToVec3(lat: number, lon: number, radius: number) {
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon + 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
}
