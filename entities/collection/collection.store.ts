import { create } from "zustand";
import { CollectionById } from "@/shared/interface";

interface CaseState {
  caseData: CollectionById | null;
  setCaseData: (data: CollectionById) => void;
}

export const useCaseStore = create<CaseState>((set) => ({
  caseData: null,
  setCaseData: (data) => set({ caseData: data }),
}));
