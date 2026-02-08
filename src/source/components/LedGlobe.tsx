"use client";
import * as THREE from "three";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

type LedGlobeProps = {
    radius?: number;
    dots?: number;
};

export function LedGlobe({ radius = 1.05, dots = 14000 }: LedGlobeProps) {
    const base = useRef<THREE.Mesh>(null);
    const inst = useRef<THREE.InstancedMesh>(null);

    // Safety check for texture
    const [maskData, setMaskData] = useState<ImageData | null>(null);

    useEffect(() => {
        const loadMask = async () => {
            try {
                const img = new Image();
                img.src = "/textures/world-mask.png";
                await new Promise((res, rej) => {
                    img.onload = res;
                    img.onerror = rej;
                });

                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    setMaskData(ctx.getImageData(0, 0, canvas.width, canvas.height));
                }
            } catch (e) {
                console.warn("LedGlobe: world-mask.png not found. Falling back to uniform distribution.");
                // Set a flag or leave maskData null
            }
        };
        loadMask();
    }, []);

    // Use a PlaneGeometry for the billboard (camera-facing quad)
    const dotGeometry = useMemo(() => new THREE.PlaneGeometry(1, 1), []);

    // Per-instance twinkle phase (0..1)
    const twinkleAttr = useMemo(() => {
        const arr = new Float32Array(dots);
        for (let i = 0; i < dots; i++) arr[i] = Math.random();
        return new THREE.InstancedBufferAttribute(arr, 1);
    }, [dots]);

    // Premium slow shimmer shader with billboard logic
    const dotMaterial = useMemo(() => {
        const mat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color("#7CF7FF") },
                uBaseOpacity: { value: 0.55 },
                uTwinkleAmount: { value: 0.18 },
                uTwinkleSpeed: { value: 0.35 },
            },
            vertexShader: `
        attribute float aTwinkle;
        varying float vTwinkle;
        
        void main() {
          vTwinkle = aTwinkle;
          
          // Standard billboard behavior:
          // 1. Get instance position in view space
          vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
          
          // 2. Add vertex offset (scaled by instance scale)
          // Since we use instanceMatrix for position, the scale is embedded there.
          // But for billboards, we often want to decoupled scale. 
          // Here we rely on the instance matrix scale being uniform.
          
          // To make it face camera, we just add the vertex position relative to view center
          // mapped to view-aligned axes.
          vec2 scale = vec2(length(instanceMatrix[0].xyz), length(instanceMatrix[1].xyz)); 
          // Simplified: assume uniform scale from the matrix
          
          mvPosition.xy += position.xy * scale.x; // Apply vertex position * scale
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uBaseOpacity;
        uniform float uTwinkleAmount;
        uniform float uTwinkleSpeed;
        varying float vTwinkle;
        
        void main() {
          // Circular particle shape
          vec2 uv = gl_PointCoord.xy; // Not available on planes? use vUv if passed, or just position
          // Since it's a plane -0.5 to 0.5
          float dist = length(2.0 * gl_PointCoord - 1.0); // gl_PointCoord works if it's GL_POINTS, but this is mesh.
          // For mesh billboards, we need UVs.
          // Let's use distance from center based on standard PlaneGeometry UVs (0..1)
          
          // Wait, standard PlaneGeometry has UVs. We can use them.
          // But to keep it simple, let's use a simple distance from square center (0.5, 0.5)
          // Actually, let's assume standard UVs are passed.
        
          float shimmer = 1.0 + (sin(uTime * uTwinkleSpeed + vTwinkle * 6.28) * 0.5 + 0.5) * uTwinkleAmount;
          
          float d = length(gl_PointCoord - 0.5) * 2.0; 
          // Wait, gl_PointCoord is only for POINTS. For mesh we need vUv. 
          // Let's rely on circle sdf in fragment or use a texture.
          
          // Hard circle drop-off
          // if (d > 1.0) discard;
          
          // Soft glow
          vec3 col = uColor * shimmer;
          float alpha = uBaseOpacity * shimmer;
          
          // Simple circle via distance from center logic (assumes plane spanning -0.5 to 0.5)
          // We need to pass UVs or coords.
          
          gl_FragColor = vec4(col, alpha);
        }
      `,
        });

        // Fix for the shader: using a circle texture or SDF is safer. 
        // Let's try a simpler approach: stick to spheres if billboards are complex to get right 
        // without proper UV passing in this snippet. 
        // actually, let's stick to the previous sphere geometry but optimizing it.
        // The user asked for billboards, but "Point" material might be easiest.

        // Reverting to optimized low-poly spheres for safety unless we have a specific billboard shader ready.
        // A simple billboard shader needs UVs. 

        return mat;
    }, []);

    // Actually, let's stick to the low-poly spheres but reduce segments further for "billboard-like" performance
    // if true billboards are tricky without a tested shader.
    // The previous implementation used SphereGeometry(0.006, 6, 6).
    // Let's keep it but maybe refine the shader slightly.

    // WAIT: I will strictly follow the user request for "Camera-facing discs".
    // I need to update the shader to handle UVs correctly for the plane.

    const billboardMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color("#7CF7FF") },
                uBaseOpacity: { value: 0.8 }, // higher opacity for crisp dots
                uTwinkleAmount: { value: 0.2 },
                uTwinkleSpeed: { value: 0.4 },
            },
            vertexShader: `
          attribute float aTwinkle;
          varying float vTwinkle;
          varying vec2 vUv;
          
          void main() {
            vTwinkle = aTwinkle;
            vUv = uv;
            
            // Billboard logic:
            vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
            
            // Scale derived from the length of the first column of the instance matrix
            float scale = length(instanceMatrix[0].xyz);
            
            // Offset vertex position by scale, aligned with camera view (billboard)
            mvPosition.xy += position.xy * scale;
            
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
            fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor;
          uniform float uBaseOpacity;
          uniform float uTwinkleAmount;
          uniform float uTwinkleSpeed;
          varying float vTwinkle;
          varying vec2 vUv;
          
          void main() {
            // Circle SDF
            float dist = length(vUv - 0.5) * 2.0;
            if (dist > 1.0) discard;
            
            // Soft edge
            float alphaMask = 1.0 - smoothstep(0.8, 1.0, dist);
            
            float tw = sin(uTime * uTwinkleSpeed + vTwinkle * 6.28);
            float shimmer = 1.0 + (tw * 0.5 + 0.5) * uTwinkleAmount;
            
            vec3 col = uColor * shimmer;
            gl_FragColor = vec4(col, uBaseOpacity * shimmer * alphaMask);
          }
        `
        });
    }, []);

    const tempObj = useMemo(() => new THREE.Object3D(), []);

    const { geometry, material, attr } = useMemo(() => {
        // Re-wrap the logic from previous step to avoid hook errors or just inline it if easier.
        // Wait, I can't put hooks inside useMemo. 
        // I need to structure this correctly.
        return { geometry: dotGeometry, material: billboardMaterial, attr: twinkleAttr };
    }, [dotGeometry, billboardMaterial, twinkleAttr]);


    // Ref for time update
    useFrame((_, delta) => {
        if (base.current) base.current.rotation.y += delta * 0.04;
        if (inst.current) inst.current.rotation.y += delta * 0.04;
        (material.uniforms.uTime.value as number) += delta;
    });

    useEffect(() => {
        if (!inst.current) return;

        inst.current.geometry.setAttribute("aTwinkle", attr);
        let placed = 0;
        const maxInstances = inst.current.count;

        for (let i = 0; i < maxInstances; i++) {
            const u = Math.random();
            const v = Math.random();

            if (maskData) {
                const { width, height, data } = maskData;
                const x = Math.min(width - 1, Math.max(0, Math.floor(u * width)));
                const y = Math.min(height - 1, Math.max(0, Math.floor((1 - v) * height)));
                const idx = (y * width + x) * 4;
                const m = data[idx];
                if (m < 80) {
                    if (Math.random() > 0.02) continue;
                }
            } else {
                // Uniform fallback - fewer dots for speed if no mask
                if (placed >= dots / 3) break;
            }

            const lat = (v - 0.5) * Math.PI;
            const lon = (u - 0.5) * Math.PI * 2;
            const x = radius * Math.cos(lat) * Math.cos(lon);
            const y = radius * Math.sin(lat);
            const z = radius * Math.cos(lat) * Math.sin(lon);

            tempObj.position.set(x, y, z);
            tempObj.lookAt(0, 0, 0);
            tempObj.rotateX(Math.PI);
            const s = 0.85 + Math.random() * 0.6;
            tempObj.scale.setScalar(s * 0.02);
            tempObj.updateMatrix();

            inst.current.setMatrixAt(placed, tempObj.matrix);
            attr.setX(placed, Math.random());
            placed++;
        }

        for (let i = placed; i < maxInstances; i++) {
            tempObj.position.set(0, 0, 0);
            tempObj.scale.setScalar(0);
            tempObj.updateMatrix();
            inst.current.setMatrixAt(i, tempObj.matrix);
            attr.setX(i, 0);
        }
        inst.current.instanceMatrix.needsUpdate = true;
        attr.needsUpdate = true;
    }, [maskData, radius, tempObj, attr, material, dots]);

    useFrame((_, delta) => {
        if (base.current) base.current.rotation.y += delta * 0.08;
        if (inst.current) inst.current.rotation.y += delta * 0.10;
        // advance shader time
        (material.uniforms.uTime.value as number) += delta;
    });

    return (
        <group position={[0.45, -0.05, 0]}>
            <mesh ref={base}>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshStandardMaterial color="#06101c" metalness={0.2} roughness={0.45} emissive="#06101c" emissiveIntensity={0.2} />
            </mesh>
            <instancedMesh ref={inst} args={[geometry, material, dots]} frustumCulled />
            <mesh>
                <sphereGeometry args={[radius * 1.06, 64, 64]} />
                <meshBasicMaterial color="#6ff7ff" transparent opacity={0.05} />
            </mesh>
        </group>
    );
}
