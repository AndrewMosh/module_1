import { create } from 'zustand';

interface TabsStore {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export const useTabsStore = create<TabsStore>((set) => ({
  activeTab: 0,
  setActiveTab: (index) => set({ activeTab: index }),
}));
