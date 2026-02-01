"use client";

import MainScene from "@/components/3d/MainScene";
import Overlay from "@/components/ui/Overlay";
import { useSistemaSolarCompleto } from "@/hooks/useSistemaSolarCompleto";
import { useUniverseStore } from "@/lib/store";
import { Loader2 } from "lucide-react";

/**
 * HomePage of AstroJr.
 * Renders the 3D Cosmic Scene and the UI Interaction Layer.
 */
export default function Home() {
  const { error } = useSistemaSolarCompleto();
  const isLoading = useUniverseStore((state) => state.isLoading);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-950 text-white p-8">
        <Loader2 className="w-12 h-12 text-cyan-500 animate-spin mb-4" />
        <h2 className="text-xl font-black italic uppercase tracking-tighter animate-pulse">
          Cargando Universo...
        </h2>
      </div>
    );
  }

  if (error) {
     return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-red-950 text-white p-8">
            <h2 className="text-2xl font-bold mb-4">¡Houston, tenemos un problema!</h2>
            <p className="text-red-200">{error}</p>
        </div>
     )
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
