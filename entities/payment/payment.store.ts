
import {create} from "zustand"

export type TabName = "ton" | "stars"

type TabStore = {
    selectedTab: TabName;
    setSelectedTab: (value: TabName) => void
}

export const usePaymentStore = create<TabStore>()(set => ({
    selectedTab: "ton",
    setSelectedTab: (val) => set({selectedTab: val})
}))