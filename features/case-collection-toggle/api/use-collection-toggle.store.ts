import { CollectionToggle } from "@/shared/constants";
import { create } from "zustand";

type CollectionToggleStore = {
  collection: CollectionToggle["type"];
  setCollection: (value: CollectionToggleStore["collection"]) => void;
};

export const useCollectionToggleStore = create<CollectionToggleStore>((set) => ({
  collection: "all",
  setCollection: (value) => set({ collection: value }),
}));
