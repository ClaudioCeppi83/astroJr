"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Html } from "@react-three/drei";
import Model3D from "./Model3D";
import { useUniverseStore } from "@/lib/store";

interface PlanetProps {
  name: string;
  size: number;
  color: number;
  distance: number;
  speed: number;
  model_url?: string;
  children?: React.ReactNode;
}

/**
 * Planet component with Rock-Solid absolute rotation and precise centering.
 * Fix: Uses absolute time-based rotation to prevent cumulative speed glitches.
 */
export default function Planet({ name, size, color, distance, speed, model_url, children }: PlanetProps) {
  const meshRef = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const selectedBody = useUniverseStore((state) => state.selectedBody);
  const setSelectedBody = useUniverseStore((state) => state.setSelectedBody);
  
  const isSelected = selectedBody === name;

  const orbitLinePoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const angle = (i / 100) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance));
    }
    return points;
  }, [distance]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // 1. Absolute Orbital Rotation (Rock Solid)
    if (orbitRef.current && name !== "Sol") {
      orbitRef.current.rotation.y = t * speed * 60; // Multiplying by 60 because 'speed' was frame-based
    }
    
    // 2. Absolute Axial Rotation
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5;
    }
  });

  return (
    <group ref={name === "Sol" ? null : orbitRef}>
      {/* Visual Orbit Line */}
      {distance > 0 && (
        <line loop>
          <bufferGeometry>
            <float32BufferAttribute
              attach="attributes-position"
              args={[new Float32Array(orbitLinePoints.flatMap(p => [p.x, p.y, p.z])), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial attach="material" color={isSelected ? "#22d3ee" : "#334155"} transparent opacity={isSelected ? 0.6 : 0.1} />
        </line>
      )}

      {/* Position Anchor */}
      <group position={[distance, 0, 0]}>
        <Float speed={isSelected ? 2 : 0} rotationIntensity={0.1} floatIntensity={0.2}>
          <group 
            ref={meshRef} 
            name={`body-ref-${name}`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedBody(name);
            }}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "auto")}
          >
            {model_url ? (
              <Model3D url={model_url} size={size} />
            ) : (
              <mesh castShadow receiveShadow>
                <sphereGeometry args={[size, 64, 64]} />
                <meshPhongMaterial 
                  color={color} 
                  emissive={name === "Sol" ? color : (isSelected ? color : 0x000000)}
                  emissiveIntensity={name === "Sol" ? 2 : (isSelected ? 0.5 : 0)}
                  shininess={100}
                />
              </mesh>
            )}
            
            <Html 
              distanceFactor={15} 
              position={[0, size * 1.5 + 0.5, 0]} 
              center
              occlude
            >
              <div className={`px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[8px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 pointer-events-none select-none ${isSelected ? 'opacity-100 scale-125 border-cyan-500 text-cyan-400' : 'opacity-40'}`}>
                {name}
              </div>
            </Html>
          </group>
        </Float>

        {/* Child mooons are relative to the planet anchor but outside its axial rotation */}
        <group name={`moons-of-${name}`}>
          {children}
        </group>
      </group>
    </group>
  );
}
