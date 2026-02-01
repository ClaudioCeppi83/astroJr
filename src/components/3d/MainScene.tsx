"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useUniverseStore } from "@/lib/store";
import { usePhysicsEngine } from "@/hooks/usePhysicsEngine";
import { getOrbitPath } from "@/utils/physics";
import Planet from "./Planet";
import AsteroidBelt from "./AsteroidBelt";

/**
 * Constants for simulation behavior
 */
const CAMERA_INITIAL_POS: [number, number, number] = [0, 150, 250];
const CAMERA_FOV = 40;
const MAX_VIEW_DISTANCE = 8000;
const FOLLOW_LERP_FACTOR = 0.1;

/**
 * MainScene component that initializes the Three.js canvas, lighting, and camera.
 */
export default function MainScene() {
  const controlsRef = useRef<any>(null);
  const { selectedBody, universeData } = useUniverseStore();
  
  const currentBody = selectedBody ? universeData[selectedBody] : null;
  const minZoom = currentBody ? Math.max(0.2, (currentBody.size || 1) * 1.5) : 10;

  return (
    <div className="fixed inset-0 z-0 bg-space-950">
      <Canvas shadows gl={{ antialias: true, logarithmicDepthBuffer: true }}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={CAMERA_INITIAL_POS} fov={CAMERA_FOV} far={MAX_VIEW_DISTANCE} />
          
          <OrbitControls 
            ref={controlsRef}
            enableDamping 
            dampingFactor={0.05} 
            minDistance={minZoom} 
            maxDistance={MAX_VIEW_DISTANCE}
            screenSpacePanning={true}
            makeDefault 
          />

          <SceneContent controlsRef={controlsRef} selectedBody={selectedBody} />

          <Stars radius={2000} depth={100} count={30000} factor={6} saturation={0} fade speed={0.5} />
          
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

function SceneContent({ controlsRef, selectedBody }: SceneContentProps) {
  const universeData = useUniverseStore((state) => state.universeData);
  const { distanceScale } = usePhysicsEngine();

  // Memoize orbit paths
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
	 * Follow Logic: Smoothly interpolates the OrbitControls target to the selected body's position.
	 */
	useFrame((state: RootState) => {
		const { isFollowing } = useUniverseStore.getState();

		if (selectedBody && controlsRef.current && isFollowing) {
			const bodyObject = state.scene.getObjectByName(`body-ref-${selectedBody}`);
			if (bodyObject) {
				const worldPos = new THREE.Vector3();
				bodyObject.getWorldPosition(worldPos);
				
				// Smoothly center camera on target
				controlsRef.current.target.lerp(worldPos, FOLLOW_LERP_FACTOR);
			}
		} else if (!selectedBody && controlsRef.current && isFollowing) {
			// Center back to Sun (origin)
			controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
		}
	});

	/**
	 * Recursive render helper to maintain parent-child hierarchy (Planets -> Moons).
	 * This ensures nested coordinate systems work correctly for orbiting satellites.
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
      
      {/* 5. Asteroid Belt (Between Mars and Jupiter) */}
      <AsteroidBelt 
        innerRadius={210} 
        outerRadius={330} 
        count={8000} 
        color="#94a3b8" 
        speedFactor={0.002}
      />

      {/* 6. Kuiper Belt (Beyond Neptune) */}
      <AsteroidBelt 
        innerRadius={3200} 
        outerRadius={4500} 
        count={5000} 
        color="#64748b" 
        speedFactor={0.0005}
      />
    </>
  );
}
