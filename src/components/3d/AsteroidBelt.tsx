import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useUniverseStore } from "@/lib/store";

interface AsteroidBeltProps {
	innerRadius: number;
	outerRadius: number;
	count: number;
	color?: string;
	speedFactor?: number;
}

/**
 * AsteroidBelt component creates a particle-based ring system to represent
 * belts like the Main Asteroid Belt or the Kuiper Belt.
 */
export default function AsteroidBelt({ 
	innerRadius, 
	outerRadius, 
	count, 
	color = "#94a3b8",
	speedFactor = 0.005 
}: AsteroidBeltProps) {
	const pointsRef = useRef<THREE.Points>(null);
	const simulationSpeed = useUniverseStore((state) => state.simulationSpeed);

	/**
	 * Generate randomized particle positions within the ring on mount/change.
	 */
	const particles = useMemo(() => {
		const positions = new Float32Array(count * 3);
		
		for (let i = 0; i < count; i++) {
			const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
			const angle = Math.random() * Math.PI * 2;
			
			// Constant vertical dispersion based on belt "thickness"
			const thickness = (outerRadius - innerRadius) * 0.05;
			const y = (Math.random() - 0.5) * thickness;
			
			positions[i * 3] = Math.cos(angle) * radius;
			positions[i * 3 + 1] = y;
			positions[i * 3 + 2] = Math.sin(angle) * radius;
		}

		return positions;
	}, [count, innerRadius, outerRadius]);

	useFrame((state) => {
		if (pointsRef.current) {
			const t = state.clock.getElapsedTime() * simulationSpeed;
			// Subtle rotation of the entire belt
			pointsRef.current.rotation.y = t * speedFactor;
		}
	});

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					args={[particles, 3]}
				/>
			</bufferGeometry>
			<pointsMaterial 
				size={0.2} 
				color={color} 
				transparent 
				opacity={0.4} 
				sizeAttenuation={true} 
				blending={THREE.AdditiveBlending}
				depthWrite={false}
			/>
		</points>
	);
}
