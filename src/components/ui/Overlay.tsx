"use client";

import { Menu, RotateCcw, X } from "lucide-react";
import { useUniverseStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import PanelEducativo from "./PanelEducativo";

/**
 * Overlay component handles the primary UI elements on top of the 3D scene.
 * @returns {JSX.Element}
 */
export default function Overlay() {
  const { 
    selectedBody, 
    isMenuOpen, 
    isFollowing,
    setSelectedBody, 
    setFollowing,
    toggleMenu, 
    resetSelection, 
    universeData 
  } = useUniverseStore();
  
  const currentData = selectedBody ? universeData[selectedBody] : null;

  return (
    <div className="relative z-10 pointer-events-none h-full w-full flex flex-col p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => toggleMenu()}
            className="glass p-3 rounded-2xl pointer-events-auto hover:scale-105 active:scale-95 transition-all text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="glass px-6 py-2 rounded-2xl pointer-events-auto">
            <h1 className="text-xl font-black italic tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-cyan-300 uppercase">
              AstroJr
            </h1>
          </div>
        </div>

        <button 
          onClick={resetSelection}
          className="glass p-3 rounded-2xl pointer-events-auto hover:rotate-180 transition-transform duration-500 text-white"
        >
          <RotateCcw className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      {/* Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-72 glass-card m-4 pointer-events-auto z-50 flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black italic">EXPLORADOR</h2>
              <button onClick={() => toggleMenu(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar space-y-2 pr-2">
              {Object.entries(universeData)
                .filter(([_, d]) => !d.parent) // Get all main bodies (Planets/Sun)
                .sort((a, b) => (a[1].dist || 0) - (b[1].dist || 0)) // Sort by distance
                .map(([id, data]) => (
                  <div key={id} className="space-y-1">
                    <button 
                      onClick={() => {
                        setSelectedBody(id);
                        toggleMenu(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between group ${selectedBody === id ? 'bg-cyan-500/20 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl group-hover:scale-110 transition-transform">{(data as any).simbolo || "🪐"}</span>
                        <div>
                          <div className={`font-bold text-sm tracking-wide ${selectedBody === id ? 'text-cyan-300' : 'text-white'}`}>{data.name}</div>
                          <div className="text-[9px] text-slate-400 uppercase font-black tracking-tighter opacity-70">{data.type}</div>
                        </div>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${selectedBody === id ? 'bg-cyan-500 animate-pulse' : 'bg-white/10'}`} />
                    </button>

                    {/* Show satellites (Moons) indented */}
                    {Object.entries(universeData)
                      .filter(([_, d]) => d.parent === id)
                      .sort((a, b) => (a[1].dist || 0) - (b[1].dist || 0))
                      .map(([moonId, moonData]) => (
                        <button 
                          key={moonId}
                          onClick={() => {
                            setSelectedBody(moonId);
                            toggleMenu(false);
                          }}
                          className={`w-[90%] ml-auto text-left p-2 rounded-lg transition-all border flex items-center gap-3 group/moon ${selectedBody === moonId ? 'bg-purple-500/20 border-purple-500/50' : 'bg-white/0 border-transparent hover:bg-white/5'}`}
                        >
                          <span className="text-sm opacity-60 group-hover/moon:opacity-100 transition-opacity">{(moonData as any).simbolo || "🌑"}</span>
                          <div className={`font-bold text-xs ${selectedBody === moonId ? 'text-purple-300' : 'text-slate-400'}`}>{moonData.name}</div>
                        </button>
                      ))}
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Camera Controls (Follow/Detach) */}
      {selectedBody && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-auto z-40"
        >
          <button 
            onClick={() => setFollowing(!isFollowing)}
            className={`glass px-6 py-3 rounded-2xl flex items-center gap-3 font-bold text-xs uppercase tracking-widest transition-all ${isFollowing ? 'border-cyan-500 text-cyan-400' : 'text-slate-400'}`}
          >
            <div className={`w-2 h-2 rounded-full ${isFollowing ? 'bg-cyan-500 animate-pulse' : 'bg-slate-600'}`} />
            {isFollowing ? 'Siguiendo' : 'Cámara Libre'}
          </button>
          
          <button 
            onClick={resetSelection}
            className="glass px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
          >
            Despegar
          </button>
        </motion.div>
      )}


      {/* Panel Educativo Mejorado */}
      <PanelEducativo />


      {/* Bottom Hint */}
      {!selectedBody && !isMenuOpen && (
        <div className="mt-auto w-full flex justify-center pb-4">
          <div className="glass px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-400 animate-pulse">
            Toca un planeta para explorar
          </div>
        </div>
      )}
    </div>
  );
}
