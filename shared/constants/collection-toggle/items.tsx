export type CollectionToggle = {
  id: number;
  type: "all" | "free" | "limited" | "allin";
  name: string;
};

export const COLLECTION_TOGGLE_DATA: CollectionToggle[] = [
  {
    id: 1,
    type: "all",
    name: "all",
  },
  {
    id: 2,
    type: "free",
    name: "free",
  },
  {
    id: 3,
    type: "limited",
    name: "limited",
  },
  {
    id: 4,
    type: "allin",
    name: "allin",
  },
];
