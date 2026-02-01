"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * ModernUniverseBackground
 * 
 * Provides a high-performance, immersive 3D universe background.
 * 
 * Features:
 * - Spherical Starfield: 10,000 stars distributed at a fixed distance (9000 units).
 * - Multi-attribute Points: Each star has unique position, color, size, and twinkle phase.
 * - Custom ShaderMaterial: Handles circular star rendering and asynchronous twinkling on the GPU.
 * - Deep Space Dome: A large sphere with a gradient shader to simulate the space vacuum and nebulosity.
 * - Infinite Parallax: The background group perfectly follows the camera position per frame.
 * 
 * Performance:
 * - Uses BufferAttributes for massive point cloud rendering.
 * - Offloads animations (twinkle) to the vertex/fragment shaders.
 * - Negative renderOrder to ensure background status.
 */
export default function ModernUniverseBackground() {
	const groupRef = useRef<THREE.Group>(null);
	const starMaterialRef = useRef<THREE.ShaderMaterial>(null);

	// 1. Data Generation: Memoized to prevent recalculation on re-renders
	const starsCount = 10000;
	const [starPositions, starColors, starSizes, starPhases] = useMemo(() => {
		const positions = new Float32Array(starsCount * 3);
		const colors = new Float32Array(starsCount * 3);
		const sizes = new Float32Array(starsCount);
		const phases = new Float32Array(starsCount);
		
		const colorObj = new THREE.Color();
		
		for (let i = 0; i < starsCount; i++) {
			// Position: Uniform spherical distribution
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const radius = 9000; 

			positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
			positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
			positions[i * 3 + 2] = radius * Math.cos(phi);

			// Size variety: Between 1.0 and 4.0 pixels (screen-space)
			sizes[i] = 1.0 + Math.random() * 3.0;

			// Twinkle Phase: Random offset for the sine wave oscillation
			phases[i] = Math.random() * Math.PI * 2;

			// Color variety: Based on stellar classification colors
			const mix = Math.random();
			if (mix > 0.9) colorObj.set("#a5f3fc");      // O/B Class (Blueish)
			else if (mix > 0.8) colorObj.set("#fef08a"); // G/K Class (Yellowish)
			else colorObj.set("#ffffff");                // A Class (White)
			
			colors[i * 3] = colorObj.r;
			colors[i * 3 + 1] = colorObj.g;
			colors[i * 3 + 2] = colorObj.b;
		}
		return [positions, colors, sizes, phases];
	}, []);

	// 2. Star GPU Logic: Custom Point Shader
	const starShader = useMemo(() => ({
		uniforms: {
			uTime: { value: 0 },
		},
		vertexShader: `
			attribute float size;
			attribute float phase;
			attribute vec3 color;
			varying vec3 vColor;
			varying float vPhase;
			void main() {
				vColor = color;
				vPhase = phase;
				vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
				// Point size is constant in screen space (sizeAttenuation: false behavior)
				gl_PointSize = size; 
				gl_Position = projectionMatrix * mvPosition;
			}
		`,
		fragmentShader: `
			uniform float uTime;
			varying vec3 vColor;
			varying float vPhase;
			void main() {
				// Circle masking: Discard pixels outside the radius
				float dist = distance(gl_PointCoord, vec2(0.5));
				if (dist > 0.5) discard;

				// Twinkle modulation: 0.6 to 1.0 intensity range
				float twinkle = 0.6 + 0.4 * sin(uTime * 2.5 + vPhase);
				
				// Radial brightness falloff for a soft look
				float strength = 1.0 - smoothstep(0.0, 0.5, dist);
				
				gl_FragColor = vec4(vColor, twinkle * strength);
			}
		`
	}), []);

	// 3. Deep Space Gradient Shader
	const spaceShader = useMemo(() => ({
		uniforms: {
			colorTop: { value: new THREE.Color("#0a0f2b") },
			colorBottom: { value: new THREE.Color("#020617") },
		},
		vertexShader: `
			varying vec3 vViewDir;
			void main() {
				vViewDir = normalize(position);
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
		`,
		fragmentShader: `
			uniform vec3 colorTop;
			uniform vec3 colorBottom;
			varying vec3 vViewDir;
			void main() {
				// Vertical atmosphere feel based on sphere normal
				float height = vViewDir.y;
				float factor = smoothstep(-1.0, 0.8, height);
				gl_FragColor = vec4(mix(colorBottom, colorTop, factor), 1.0);
			}
		`
	}), []);

	/**
	 * Per-frame background anchoring and time updates.
	 * groupRef position copy ensures the background stays at 'infinity' relative to the camera.
	 */
	useFrame((state) => {
		if (groupRef.current) {
			groupRef.current.position.copy(state.camera.position);
		}
		if (starMaterialRef.current) {
			starMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
		}
	});

	return (
		<group ref={groupRef} renderOrder={-100}>
			{/* Deep Space Background Sphere */}
			<mesh frustumCulled={false}>
				<sphereGeometry args={[9500, 32, 32]} />
				<shaderMaterial 
					{...spaceShader} 
					side={THREE.BackSide} 
					depthWrite={false}
					depthTest={false}
				/>
			</mesh>

			{/* Animated Star System */}
			<points frustumCulled={false}>
				<bufferGeometry>
					<bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
					<bufferAttribute attach="attributes-color" args={[starColors, 3]} />
					<bufferAttribute attach="attributes-size" args={[starSizes, 1]} />
					<bufferAttribute attach="attributes-phase" args={[starPhases, 1]} />
				</bufferGeometry>
				<shaderMaterial 
					ref={starMaterialRef}
					{...starShader}
					transparent={true}
					blending={THREE.AdditiveBlending}
					depthWrite={false}
					depthTest={false}
				/>
			</points>
		</group>
	);
}
