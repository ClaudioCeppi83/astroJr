import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useUniverseStore } from "@/lib/store";
import { usePhysicsEngine } from "@/hooks/usePhysicsEngine";
import { getOrbitPath } from "@/utils/physics";
import Planet from "./Planet";
import ModernUniverseBackground from "./ModernUniverseBackground";

/**
 * Global Constants
 */
const CAMERA_INITIAL_POS: [number, number, number] = [0, 150, 250];
const CAMERA_FOV = 40;
const MAX_VIEW_DISTANCE = 20000;
const FOLLOW_LERP_FACTOR = 0.1;

/**
 * MainScene Component
 * 
 * Sets up the 3D environment including the Canvas, Camera, OrbitControls, 
 * Lighting, and the dynamic Universe background.
 */
export default function MainScene() {
	const controlsRef = useRef<any>(null);
	const { selectedBody, universeData } = useUniverseStore();
	
	const currentBody = selectedBody ? universeData[selectedBody] : null;
	const minZoom = currentBody ? Math.max(0.2, (currentBody.size || 1) * 1.5) : 10;

	return (
		<div className="fixed inset-0 z-0">
			<Canvas 
				shadows 
				gl={{ antialias: true, logarithmicDepthBuffer: true }}
			>
				<Suspense fallback={null}>
					<PerspectiveCamera 
						makeDefault 
						position={CAMERA_INITIAL_POS} 
						fov={CAMERA_FOV} 
						far={MAX_VIEW_DISTANCE} 
						near={1} 
					/>
					
					<OrbitControls 
						ref={controlsRef}
						enableDamping 
						dampingFactor={0.05} 
						minDistance={minZoom} 
						maxDistance={MAX_VIEW_DISTANCE * 0.9}
						screenSpacePanning={true}
						makeDefault 
					/>

					{/* 3D Background Layer */}
					<ModernUniverseBackground />

					{/* Celestial Bodies Layer */}
					<SceneContent 
						controlsRef={controlsRef} 
						selectedBody={selectedBody} 
					/>

					{/* Global Lighting */}
					<ambientLight intensity={1} />
					<pointLight position={[0, 0, 0]} intensity={4} color="#fff1dc" castShadow />
					<pointLight position={[100, 100, 100]} intensity={0.2} />
				</Suspense>
			</Canvas>
		</div>
	);
}

interface SceneContentProps {
	controlsRef: React.RefObject<any>;
	selectedBody: string | null;
}

/**
 * SceneContent Component
 * 
 * Manages the logic for following celestial bodies and recursive rendering 
 * of the solar system hierarchy.
 */
function SceneContent({ controlsRef, selectedBody }: SceneContentProps) {
	const universeData = useUniverseStore((state) => state.universeData);
	const { distanceScale } = usePhysicsEngine();

	// Pre-calculate and memoize orbital paths for better performance
	const orbitPaths = useMemo(() => {
		const paths: Record<string, THREE.Vector3[]> = {};
		Object.entries(universeData).forEach(([id, body]) => {
			if (body.orbitalElements && id !== 'sol') {
				paths[id] = getOrbitPath(body.orbitalElements, distanceScale);
			}
		});
		return paths;
	}, [universeData, distanceScale]);

	/**
	 * Follow Logic: Smoothly interpolates the OrbitControls target to the selected body's world position.
	 */
	useFrame((state: RootState) => {
		const { isFollowing } = useUniverseStore.getState();

		if (selectedBody && controlsRef.current && isFollowing) {
			const bodyObject = state.scene.getObjectByName(`body-ref-${selectedBody}`);
			if (bodyObject) {
				const worldPos = new THREE.Vector3();
				bodyObject.getWorldPosition(worldPos);
				
				// Lerp target to body world position
				controlsRef.current.target.lerp(worldPos, FOLLOW_LERP_FACTOR);
			}
		} else if (!selectedBody && controlsRef.current && isFollowing) {
			// Center back to Sun (origin) when no body is selected
			controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
		}
	});

	/**
	 * Recursive render helper to maintain parent-child hierarchy (Planets -> Moons).
	 */
	const renderBodies = (parentId: string | null = null) => {
		return Object.entries(universeData)
			.filter(([_, data]) => (parentId === null ? !data.parent : data.parent === parentId))
			.map(([id, data]) => (
				<Planet 
					key={id}
					id={id}
					name={data.name || id}
					size={data.size}
					color={data.color}
					orbitalElements={data.orbitalElements}
					orbitPath={orbitPaths[id]}
					model_url={data.model_url}
					type={data.type}
					parent={data.parent}
				>
					{renderBodies(id)}
				</Planet>
			));
	};

	return (
		<>
			{renderBodies()}
		</>
	);
}
