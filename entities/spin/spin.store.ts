import { SpinState } from "@/widgets/case-roulette/api/use-spin";
import { create } from "zustand";

export type SpinStoreType = {
  multiplier: number;
  setMultiplier: (num: number) => void;
  spinners: SpinState[];
  setSpinners: (spinners: SpinState[]) => void;
  isSpinning: boolean;
  setIsSpinning: (isSpinning: boolean) => void;
  isSpinEnded: boolean;
  setIsSpinEnded: (isSpinning: boolean) => void;
  isDemo: boolean;
  toggleDemo: () => void;
  currentCaseId: string | null;
  setCurrentCaseId: (caseId: string | null) => void;
};

export const useSpinStore = create<SpinStoreType>((set) => ({
  multiplier: 1,
  isSpinEnded: false,
  spinners: [],
  isSpinning: false,
  isDemo: false,
  currentCaseId: null,
  setSpinners: (value) => set(() => ({ spinners: value })),
  setIsSpinEnded: (value) => set(() => ({ isSpinEnded: value })),
  setIsSpinning: (value) => set(() => ({ isSpinning: value })),
  setMultiplier: (value) => set(() => ({ multiplier: value })),
  toggleDemo: () => set((state) => ({ isDemo: !state.isDemo })),
  setCurrentCaseId: (value) => set(() => ({ currentCaseId: value })),
}));
