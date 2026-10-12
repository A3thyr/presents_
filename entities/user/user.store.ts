import { User } from "@/shared/interface";
import { create } from "zustand";

export type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (value) => set(() => ({ user: value })),
}));
