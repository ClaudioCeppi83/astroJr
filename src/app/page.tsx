"use client";

import { useEffect } from "react";
import MainScene from "@/components/3d/MainScene";
import Overlay from "@/components/ui/Overlay";
import { useCelestialBodies } from "@/hooks/useCelestialBodies";
import { useUniverseStore } from "@/lib/store";
import { Loader2 } from "lucide-react";

/**
 * HomePage of AstroJr.
 * Renders the 3D Cosmic Scene and the UI Interaction Layer.
 */
export default function Home() {
  const { bodies, loading } = useCelestialBodies();
  const setUniverseData = useUniverseStore((state) => state.setUniverseData);

  useEffect(() => {
    if (!loading && Object.keys(bodies).length > 0) {
      setUniverseData(bodies);
    }
  }, [bodies, loading, setUniverseData]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-950 text-white p-8">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-4" />
        <h2 className="text-xl font-black italic uppercase tracking-tighter animate-pulse">
          Cargando Universo...
        </h2>
      </div>
    );
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-slate-950 text-white font-sans">
      {/* 3D Background Layer */}
      <MainScene />

      {/* Interface Layer */}
      <Overlay />
    </main>
  );
}
