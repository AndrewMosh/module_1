import { create } from 'zustand';

interface SuccessState {
  isSuccess: boolean;
  setSuccess: (value: boolean) => void;
}

export const useSuccessResponseStore = create<SuccessState>((set) => ({
  isSuccess: false,
  setSuccess: (value) => set({ isSuccess: value }),
}));
