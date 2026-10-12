import { create } from "zustand";

// sell-item.store.ts
type UiStore = {
  // Track open drawers by ID
  openDrawerId: string | null;
  setOpenDrawerId: (id: string | null) => void;

  // Dialog state (now specific to the current drawer)
  isSellDialogOpen: boolean;
  setSellDialogOpen: (open: boolean) => void;

  sellingItem: { id: string; name: string; price: number } | null;
  setSellingItem: (
    item: { id: string; name: string; price: number } | null
  ) => void;

  closeAll: () => void;
};

export const useUiStore = create<UiStore>((set) => ({
  openDrawerId: null,
  setOpenDrawerId: (id) => set({ openDrawerId: id }),

  isSellDialogOpen: false,
  setSellDialogOpen: (open) => set({ isSellDialogOpen: open }),

  sellingItem: null,
  setSellingItem: (item) => set({ sellingItem: item }),

  closeAll: () =>
    set({
      openDrawerId: null,
      isSellDialogOpen: false,
      sellingItem: null,
    }),
}));
