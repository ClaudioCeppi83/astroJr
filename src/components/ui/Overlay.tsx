"use client";

import { Menu, RotateCcw, X, Info } from "lucide-react";
import { useUniverseStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Overlay component handles the primary UI elements on top of the 3D scene.
 * @returns {JSX.Element}
 */
export default function Overlay() {
  const { selectedBody, isMenuOpen, setSelectedBody, toggleMenu, resetSelection, universeData } = useUniverseStore();
  
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

            <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
              {Object.entries(universeData).filter(([_, d]) => !d.parent).map(([name, data]) => (
                <button 
                  key={name}
                  onClick={() => setSelectedBody(name)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border ${selectedBody === name ? 'bg-cyan-500/10 border-cyan-500' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                >
                  <div className="font-bold text-sm tracking-wide">{name}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-black">{data.type}</div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Panel */}
      <AnimatePresence>
        {selectedBody && currentData && (
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            className="fixed bottom-0 inset-x-0 md:left-auto md:right-0 md:top-24 md:bottom-auto md:w-96 m-4 glass-card pointer-events-auto z-40"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-black italic uppercase tracking-tighter leading-none">{selectedBody}</h2>
                <span className="text-[10px] font-bold text-cyan-400 px-2 py-0.5 bg-cyan-400/10 border border-cyan-400/20 rounded uppercase mt-2 inline-block">
                  {currentData.type}
                </span>
              </div>
              <button 
                onClick={() => setSelectedBody(null)} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {currentData.desc}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                <span className="block text-[8px] text-slate-500 font-black uppercase mb-1">Órbita</span>
                <span className="text-xs font-bold">{currentData.orbit}</span>
              </div>
              <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                <span className="block text-[8px] text-slate-500 font-black uppercase mb-1">Gravedad</span>
                <span className="text-xs font-bold">{currentData.grav}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
              <Info className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-[10px] font-black uppercase text-cyan-400">Curiosidad {currentData.rain !== "Nula" ? "Climática" : ""}</div>
                <div className="text-xs font-bold">Lluvia de {currentData.rain}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
