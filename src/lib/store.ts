import { create } from "zustand";
import { CelestialBody } from "./constants";

interface UniverseState {
  selectedBody: string | null;
  isMenuOpen: boolean;
  universeData: Record<string, CelestialBody>;
  isLoading: boolean;
  
  setSelectedBody: (name: string | null) => void;
  setUniverseData: (data: Record<string, CelestialBody>) => void;
  setLoading: (loading: boolean) => void;
  toggleMenu: (force?: boolean) => void;
  resetSelection: () => void;
}

/**
 * Global state store for AstroJr using Zustand.
 * Manages UI state, 3D scene focus, and fetched data.
 */
export const useUniverseStore = create<UniverseState>((set) => ({
  selectedBody: null,
  isMenuOpen: false,
  universeData: {},
  isLoading: true,

  setSelectedBody: (name) => set({ selectedBody: name, isMenuOpen: false }),
  
  setUniverseData: (data) => set({ universeData: data, isLoading: false }),
  
  setLoading: (loading) => set({ isLoading: loading }),

  toggleMenu: (force) => set((state) => ({ 
    isMenuOpen: force !== undefined ? force : !state.isMenuOpen 
  })),

  resetSelection: () => set({ selectedBody: null }),
}));
