import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ModernUniverseBackground
 * 
 * Provides a high-performance, 360-degree immersive starfield and deep space gradient.
 * 
 * Key Features:
 * 1. Spherical Distribution: 5,000 stars generated in a 3D shell.
 * 2. Infinite Depth: The background follows the camera position (0.999 parallax),
 *    ensuring stars always surround the observer without appearing reachable.
 * 3. Shader Gradient: A custom vertex/fragment shader replicates a deep space nebulosity
 *    that is stable regardless of camera orientation.
 */
export default function ModernUniverseBackground() {
	const groupRef = useRef<THREE.Group>(null);

	// 1. Starfield generation: Uniformly distributed stars on a spherical shell
	const starsCount = 5000;
	const starPositions = useMemo(() => {
		const positions = new Float32Array(starsCount * 3);
		for (let i = 0; i < starsCount; i++) {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const radius = 850 + Math.random() * 50; // Distance range for slight depth variety

			positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
			positions[i * 3 + 2] = radius * Math.cos(phi);
		}
		return positions;
	}, []);

	// 2. Custom Shader for the deep space atmospheric gradient
	const deepSpaceShader = useMemo(() => ({
		uniforms: {
			colorTop: { value: new THREE.Color("#020617") },    // Space black-blue
			colorBottom: { value: new THREE.Color("#1e293b") }, // Deep twilight slate
		},
		vertexShader: `
			varying vec3 vPosition;
			void main() {
				vPosition = position;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
		`,
		fragmentShader: `
			uniform vec3 colorTop;
			uniform vec3 colorBottom;
			varying vec3 vPosition;
			void main() {
				// Calculate gradient factor based on the normalized Y position of the sphere
				float heightFactor = normalize(vPosition).y;
				float mixAmount = smoothstep(-1.0, 1.0, heightFactor);
				gl_FragColor = vec4(mix(colorBottom, colorTop, mixAmount), 1.0);
			}
		`
	}), []);

	/**
	 * Per-frame background anchoring.
	 * By following the camera at ~99.9%, the stars remain 'infinitely' distant
	 * while providing a minuscule horizontal/vertical shift (parallax) as the camera orbits.
	 */
	useFrame((state) => {
		if (groupRef.current) {
			// Substantially close to 1.0 ensures they stay with the camera but don't feel 'static'
			groupRef.current.position.copy(state.camera.position).multiplyScalar(0.999);
		}
	});

	return (
		<group ref={groupRef}>
			{/* Deep Space Atmosphere Shell */}
			<mesh frustumCulled={false}>
				<sphereGeometry args={[950, 32, 32]} />
				<shaderMaterial 
					{...deepSpaceShader} 
					side={THREE.BackSide} 
					depthWrite={false}
					depthTest={false}
					transparent={true}
				/>
			</mesh>

			{/* Points-based Starfield */}
			<points frustumCulled={false}>
				<bufferGeometry>
					<bufferAttribute 
						attach="attributes-position" 
						args={[starPositions, 3]} 
					/>
				</bufferGeometry>
				<pointsMaterial 
					size={2.2} 
					sizeAttenuation={true} 
					transparent 
					opacity={0.8} 
					color="#ffffff" 
					blending={THREE.AdditiveBlending}
					depthWrite={false}
					depthTest={false}
				/>
			</points>
		</group>
	);
}
