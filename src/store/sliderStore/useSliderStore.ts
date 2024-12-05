import { create } from 'zustand';

interface SliderState {
  value: number;
  setValue: (value: number) => void;
}

export const useSliderStore = create<SliderState>((set) => ({
  value: 150000,
  setValue: (value) => set({ value }),
}));
