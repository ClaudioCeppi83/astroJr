"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useUniverseStore } from "@/lib/store";
import Planet from "./Planet";

/**
 * MainScene component that sets up the Three.js canvas and global environment.
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
          <PerspectiveCamera makeDefault position={[0, 150, 250]} fov={40} />
          
          <OrbitControls 
            ref={controlsRef}
            enableDamping 
            dampingFactor={0.05} 
            minDistance={minZoom} 
            maxDistance={2000}
            makeDefault 
          />

          <SceneContent controlsRef={controlsRef} selectedBody={selectedBody} />

          <Stars radius={400} depth={100} count={30000} factor={6} saturation={0} fade speed={0.5} />
          
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

  useFrame((state: RootState) => {
    if (selectedBody && controlsRef.current) {
      const bodyRef = state.scene.getObjectByName(`body-ref-${selectedBody}`);
      if (bodyRef) {
        const worldPos = new THREE.Vector3();
        bodyRef.getWorldPosition(worldPos);
        
        // 1. Precise Target Following
        controlsRef.current.target.lerp(worldPos, 0.1);

        // 2. Smooth Auto-Zoom
        const cameraPos = state.camera.position;
        const bodyData = universeData[selectedBody];
        const idealDist = (bodyData?.size || 1) * 6;
        const currentDist = cameraPos.distanceTo(worldPos);
        
        if (currentDist > idealDist * 4) {
          const dir = new THREE.Vector3().subVectors(cameraPos, worldPos).normalize();
          const targetCamPos = new THREE.Vector3().addVectors(worldPos, dir.multiplyScalar(idealDist * 2.5));
          cameraPos.lerp(targetCamPos, 0.05);
        }
      }
    } else if (controlsRef.current) {
      controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
    }
  });

  return (
    <>
      {Object.entries(universeData)
        .filter(([_, d]) => !d.parent)
        .map(([name, data]) => {
          // Absolute speed constant
          const speed = name === "Sol" ? 0 : 0.006 / Math.sqrt(data.dist || 1);
          const children = Object.entries(universeData).filter(([_, d]) => d.parent === name);

          return (
            <Planet 
              key={name}
              name={name}
              size={data.size}
              color={data.color}
              distance={data.dist}
              speed={speed}
              model_url={data.model_url}
            >
              {children.map(([cName, cData]) => {
                const cSpeed = 0.05 / Math.sqrt(cData.dist || 1);
                return (
                  <Planet 
                    key={cName}
                    name={cName}
                    size={cData.size}
                    color={cData.color}
                    distance={cData.dist}
                    speed={cSpeed}
                    model_url={cData.model_url}
                  />
                );
              })}
            </Planet>
          );
      })}
    </>
  );
}
