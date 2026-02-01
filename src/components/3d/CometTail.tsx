import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CometTailProps {
	size: number;
}

/**
 * CometTail component renders a dynamic, dual-layered tail (dust and ion)
 * that always points away from the Sun (origin [0, 0, 0]).
 * The tail scales in length and intensity based on its distance to the Sun.
 */
export default function CometTail({ size }: CometTailProps) {
	const tailRef = useRef<THREE.Group>(null);
	const dustTailRef = useRef<THREE.Mesh>(null);
	const ionTailRef = useRef<THREE.Mesh>(null);

	useFrame(() => {
		const tail = tailRef.current;
		if (tail) {
			// 1. Get world position and calculate directional vectors
			const cometWorldPos = new THREE.Vector3();
			tail.getWorldPosition(cometWorldPos);
			
			const sunPosition = new THREE.Vector3(0, 0, 0);
			const distanceToSun = cometWorldPos.distanceTo(sunPosition);
			const directionAwayFromSun = cometWorldPos.clone().normalize();
			
			// 2. Determine visibility (simulating sublimation near Sun)
			// Neptune is at ~180 units; tail becomes visible within 100 units.
			const intensity = Math.max(0, 1 - (distanceToSun / 100));
			
			if (intensity > 0) {
				tail.visible = true;
				
				// Align tail to point away from the origin
				const lookTarget = cometWorldPos.clone().add(directionAwayFromSun);
				tail.lookAt(lookTarget);
				
				// 3. Dynamic Scaling based on proximity to the Sun
				const tailLength = (1 / (distanceToSun + 0.1)) * 500 * intensity;
				
				if (ionTailRef.current) {
					ionTailRef.current.scale.z = tailLength * 1.2;
					ionTailRef.current.position.z = (tailLength * 1.2) / 2;
					const ionMaterial = ionTailRef.current.material as THREE.MeshBasicMaterial;
					ionMaterial.opacity = 0.3 * intensity;
				}

				if (dustTailRef.current) {
					dustTailRef.current.scale.z = tailLength;
					dustTailRef.current.position.z = tailLength / 2;
					const dustMaterial = dustTailRef.current.material as THREE.MeshBasicMaterial;
					dustMaterial.opacity = 0.5 * intensity;
				}
			} else {
				tail.visible = false;
			}
		}
	});

	return (
		<group ref={tailRef}>
			{/* Dust Tail (Yellowish/White) */}
			<mesh ref={dustTailRef} rotation={[Math.PI / 2, 0, 0]}>
				<cylinderGeometry args={[size * 0.5, size * 2, 1, 16, 1, true]} />
				<meshBasicMaterial 
					color="#fff9e6" 
					transparent 
					opacity={0.5} 
					depthWrite={false}
					blending={THREE.AdditiveBlending}
					side={THREE.DoubleSide}
				/>
			</mesh>

			{/* Ion Tail (Bluish, straight) */}
			<mesh ref={ionTailRef} rotation={[Math.PI / 2 + 0.05, 0, 0]}>
				<cylinderGeometry args={[size * 0.2, size * 1, 1, 16, 1, true]} />
				<meshBasicMaterial 
					color="#80ccff" 
					transparent 
					opacity={0.3} 
					depthWrite={false}
					blending={THREE.AdditiveBlending}
					side={THREE.DoubleSide}
				/>
			</mesh>
		</group>
	);
}
