import { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Html } from "@react-three/drei";
import Model3D from "./Model3D";
import { useUniverseStore } from "@/lib/store";
import { calculateOrbitalPosition, OrbitalElements } from "@/utils/physics";
import CometTail from "./CometTail";

/**
 * Constants for simulation behavior
 */
const DISTANCE_SCALE = 100;
const DEG_TO_RAD = Math.PI / 180;
const LERP_FACTOR = 0.1;

interface PlanetProps {
  id: string; // doc id
  name: string;
  size: number;
  color: number;
  orbitalElements?: OrbitalElements;
  orbitPath?: THREE.Vector3[];
  model_url?: string;
  parent?: string;
  type?: string;
  children?: React.ReactNode;
}

/**
 * Planet component handles celestial body rendering, including orbital physics,
 * axial rotation, axial tilt, and Level of Detail (LOD) for orbital lines.
 */
export default function Planet({ 
	id, 
	name, 
	size, 
	color, 
	orbitalElements, 
	orbitPath, 
	model_url, 
	parent, 
	type, 
	children 
}: PlanetProps) {
	// Refs for 3D objects and materials
	const bodyGroupRef = useRef<THREE.Group>(null);
	const equatorialGroupRef = useRef<THREE.Group>(null);
	const meshRef = useRef<THREE.Group>(null);
	const orbitLineRef = useRef<THREE.LineBasicMaterial>(null);
	
	const [isHovered, setIsHovered] = useState(false);
	const { camera } = useThree();
	
	// Global Store State
	const selectedBody = useUniverseStore((state) => state.selectedBody);
	const setSelectedBody = useUniverseStore((state) => state.setSelectedBody);
	const simulationSpeed = useUniverseStore((state) => state.simulationSpeed);
	
	const isSelected = selectedBody === id;
	const isMinorBody = !!parent;

	/**
	 * Unique shape definitions (e.g., Haumea's ellipsoidal shape)
	 */
	const baseScale = useMemo<[number, number, number]>(() => {
		if (id === 'haumea') return [1.4, 0.9, 0.8]; 
		return [1, 1, 1];
	}, [id]);

	/**
	 * Per-frame animation logic
	 */
	useFrame((state) => {
		const time = state.clock.getElapsedTime() * simulationSpeed;
		
		// 1. Orbital Position Updating
		if (bodyGroupRef.current && orbitalElements && id !== 'sol') {
			const pos = calculateOrbitalPosition(orbitalElements, time, DISTANCE_SCALE);
			bodyGroupRef.current.position.copy(pos);
		}

		// 2. Equatorial Plane Orientation (Axial Tilt)
		if (equatorialGroupRef.current) {
			const tiltRad = (orbitalElements?.inclinacionAxial || 0) * DEG_TO_RAD;
			equatorialGroupRef.current.rotation.z = tiltRad;
		}

		// 3. Body Self-Rotation and Scale Animation
		if (meshRef.current) {
			const rotationPeriodHours = orbitalElements?.rotationPeriodHours || 24;
			let rotationSpeed = (Math.PI * 2) * (24 / rotationPeriodHours);
			
			// Visual stabilization for extremely fast rotation (Haumea)
			if (rotationPeriodHours < 10) rotationSpeed *= 0.35; 
			
			meshRef.current.rotation.y = time * rotationSpeed;
			
			// Smoothly interpolate scale for hover effect
			const targetHoverScale = isHovered ? 1.1 : 1;
			meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetHoverScale * baseScale[0], LERP_FACTOR);
			meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetHoverScale * baseScale[1], LERP_FACTOR);
			meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetHoverScale * baseScale[2], LERP_FACTOR);
		}

		// 4. Orbit Line Level of Detail (Fading based on distance)
		if (orbitLineRef.current && id !== 'sol') {
			const worldPos = new THREE.Vector3();
			bodyGroupRef.current?.getWorldPosition(worldPos);
			const distToCamera = camera.position.distanceTo(worldPos);
			
			// Base opacity based on selection or focus
			let targetOpacity = isSelected || isHovered ? 0.9 : 0.25;
			
			// Fade out minor bodies (moons) when camera is too far
			if (isMinorBody) {
				const fadeStart = 50;
				const fadeEnd = 70;
				
				if (distToCamera > fadeEnd) {
					targetOpacity = 0;
				} else if (distToCamera > fadeStart) {
					const factor = 1 - (distToCamera - fadeStart) / (fadeEnd - fadeStart);
					targetOpacity *= factor;
				}
			}
			
			// Apply linear interpolation for smooth opacity transitions
			orbitLineRef.current.opacity = THREE.MathUtils.lerp(orbitLineRef.current.opacity, targetOpacity, 0.05);
			orbitLineRef.current.visible = orbitLineRef.current.opacity > 0.001;
		}
	});

	return (
		<group>
			{/* 1. Orbit Path (World context) */}
			{orbitPath && orbitPath.length > 0 && id !== 'sol' && (
				<lineLoop>
					<bufferGeometry>
						<float32BufferAttribute
							attach="attributes-position"
							args={[new Float32Array(orbitPath.flatMap(p => [p.x, p.y, p.z])), 3]}
						/>
					</bufferGeometry>
					<lineBasicMaterial 
						ref={orbitLineRef}
						attach="material" 
						color={isSelected ? "#4ade80" : (isMinorBody ? "#94a3b8" : "#cbd5e1")} 
						transparent 
						opacity={0} 
						depthWrite={false}
						blending={THREE.AdditiveBlending}
						linewidth={1}
					/>
				</lineLoop>
			)}

			{/* 2. Body Group (Translation) */}
			<group ref={bodyGroupRef}>
				{/* 3. Equatorial Group (Tilt / Obliquity) */}
				<group ref={equatorialGroupRef}>
					<Float speed={isSelected || isHovered ? 2 : 0} rotationIntensity={0.1} floatIntensity={0.2}>
						<group 
							ref={meshRef} 
							name={`body-ref-${id}`}
							onClick={(e) => {
								e.stopPropagation();
								setSelectedBody(id);
							}}
							onPointerOver={(e) => {
								e.stopPropagation();
								setIsHovered(true);
								document.body.style.cursor = "pointer";
							}}
							onPointerOut={() => {
								setIsHovered(false);
								document.body.style.cursor = "auto";
							}}
						>
							{model_url ? (
								<group>
									<Model3D url={model_url} size={size} />
								</group>
							) : (
								<mesh castShadow receiveShadow>
									<sphereGeometry args={[size, 64, 64]} />
									<meshPhongMaterial 
										color={color} 
										emissive={id === 'sol' || id === 'Sol' ? color : (isSelected || isHovered ? color : 0x000000)}
										emissiveIntensity={id === 'sol' || id === 'Sol' ? 2 : (isSelected || isHovered ? 0.4 : 0)}
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
								<div className={`px-2 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[8px] font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 pointer-events-none select-none ${isSelected || isHovered ? 'opacity-100 scale-125 border-green-500 text-green-400' : 'opacity-0 scale-50'}`}>
									{name}
								</div>
							</Html>

							{/* 5. Comet Tail (Only for comets) */}
							{type === 'comet' && <CometTail size={size} />}
						</group>
					</Float>

					{/* 4. Sub-System (Moons) - Orbiting in the Equatorial Plane */}
					{children}
				</group>
			</group>
		</group>
	);
}
