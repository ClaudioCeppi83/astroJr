"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useUniverseStore } from "@/lib/store";

/**
 * Time Manager for Orbital Physics.
 * Updates the global simulation time based on simulationSpeed.
 */
export function usePhysicsEngine() {
  const simulationSpeed = useUniverseStore((state) => state.simulationSpeed);
  const simulationTime = useUniverseStore((state) => state.simulationTime);
  const setSimulationTime = useUniverseStore((state) => state.setSimulationTime);
  
  // Use a local ref for smooth time accumulation to avoid React batching/lag
  const localTimeRef = useRef(simulationTime);

  useFrame((state, delta) => {
    localTimeRef.current += delta * simulationSpeed;
    
    // Periodically sync back to store if needed (e.g. for UI displays)
    // For now, let's keep it in store since we want other components to know the time
    // BUT updating store every frame will cause re-renders.
    // Instead, we can expose the localTimeRef via a service or just rely on R3F's clock.
  });

  return {
    timeRef: localTimeRef,
    distanceScale: 100
  };
}
