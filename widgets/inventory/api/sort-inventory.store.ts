import { mockInventory } from "@/shared/constants";
import { Inventory, Item } from "@/shared/interface";
import { create } from "zustand";

type SortState = {
  view: "grid" | "full";
  inventoryItems: Inventory["items"];
  filteredItems: Inventory["items"];
  searchValue: string;
  setView: (value: SortState["view"]) => void;
  setSearchValue: (value: SortState["searchValue"]) => void;
  setInventoryItems: (value: SortState["inventoryItems"]) => void;
  filterByName: (searchValue: string) => void;
};

export const useSortInventory = create<SortState>((set, get) => ({
  view: "full",
  //с реквеста, пока что мок
  inventoryItems: mockInventory.items, //должно быть: inventoryItems: [],
  filteredItems: mockInventory.items,
  searchValue: "",
  setView: (value) => set({ view: value }),
  setSearchValue: (value) => set({ searchValue: value }),
  setInventoryItems: (value) => set({ inventoryItems: value }),
  filterByName: (searchValue) => {
    const { inventoryItems } = get();

    if (searchValue === "") {
      set({ filteredItems: inventoryItems });
    } else {
      const filtered = inventoryItems.filter((item: Item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      set({ filteredItems: filtered });
    }
  },
}));
