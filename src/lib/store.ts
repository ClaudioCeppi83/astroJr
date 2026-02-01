import { create } from "zustand";
import { CelestialBody } from "./constants";

interface UniverseState {
  selectedBody: string | null;
  isMenuOpen: boolean;
  universeData: Record<string, CelestialBody>;
  isLoading: boolean;
  simulationTime: number;
  simulationSpeed: number; // 1 = normal (1 day/sec)
  
  isFollowing: boolean;
  
  setSelectedBody: (name: string | null) => void;
  setFollowing: (following: boolean) => void;
  setUniverseData: (data: Record<string, CelestialBody>) => void;
  setLoading: (loading: boolean) => void;
  setSimulationTime: (time: number) => void;
  setSimulationSpeed: (speed: number) => void;
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
  simulationTime: 0,
  simulationSpeed: 1,
  isFollowing: true,

  setSelectedBody: (name) => set({ 
    selectedBody: name, 
    isMenuOpen: false, 
    isFollowing: !!name 
  }),
  setFollowing: (following) => set({ isFollowing: following }),
  setUniverseData: (data) => set({ universeData: data, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  setSimulationTime: (time) => set({ simulationTime: time }),
  setSimulationSpeed: (speed) => set({ simulationSpeed: speed }),

  toggleMenu: (force) => set((state) => ({ 
    isMenuOpen: force !== undefined ? force : !state.isMenuOpen 
    })),
  resetSelection: () => set({ selectedBody: null, isFollowing: false }),
}));
