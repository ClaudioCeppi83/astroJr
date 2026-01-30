"use client";

import { useGLTF } from "@react-three/drei";
import { Suspense, useLayoutEffect, useRef, useMemo } from "react";
import * as THREE from "three";

interface Model3DProps {
  url: string;
  size: number;
}

/**
 * Loads and displays a GLB model with aggressive centering and scaling.
 * Fix: Ensures the model is exactly at [0,0,0] relative to its parent.
 */
export default function Model3D({ url, size }: Model3DProps) {
  const { scene } = useGLTF(url);
  
  // Clone the scene and wipe any pre-existing transformations from the GLTF root
  const clonedScene = useMemo(() => {
    const s = scene.clone();
    s.position.set(0, 0, 0);
    s.rotation.set(0, 0, 0);
    s.scale.set(1, 1, 1);
    return s;
  }, [scene]);

  const outerGroupRef = useRef<THREE.Group>(null);

  useLayoutEffect(() => {
    if (clonedScene && outerGroupRef.current) {
      // 1. Force the scene to update its matrices so we can get accurate bounds
      clonedScene.updateMatrixWorld(true);
      
      // 2. Calculate the bounding box in its current (reset) state
      const box = new THREE.Box3().setFromObject(clonedScene);
      const center = new THREE.Vector3();
      const modelSize = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(modelSize);

      // 3. Apply the centering offset directly to the children of the cloned scene
      // This is more robust than moving the group itself if there are nested transformations.
      clonedScene.position.sub(center);

      // 4. Normalize scale
      // Goal: The model's longest side fits within the diameter (size * 2)
      const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
      const scaleFactor = (size * 2) / (maxDim || 1);
      
      // Apply scale to the outer group so we don't interfere with internal model scale
      outerGroupRef.current.scale.setScalar(scaleFactor);
      
      console.log(`[MODEL DEBUG] ${url} scaled by ${scaleFactor}, centered from`, center);
    }
  }, [clonedScene, size, url]);

  return (
    <Suspense fallback={<mesh><sphereGeometry args={[size, 16, 16]} /><meshBasicMaterial wireframe /></mesh>}>
      <group ref={outerGroupRef}>
        <primitive object={clonedScene} />
      </group>
    </Suspense>
  );
}
