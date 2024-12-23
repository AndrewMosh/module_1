import { create } from 'zustand';

interface StepState {
  updateStep: (key: string, stepKey: string) => void;
}

export const useStepStore = create<StepState>(() => ({
  updateStep: (key, stepKey) => {
    try {
      const data = key ? localStorage.getItem(key) : null;
      const parsedData = data ? JSON.parse(data) : {};
      parsedData[stepKey] = true;
      localStorage.setItem(key, JSON.stringify(parsedData));
    } catch (error) {
      console.error('Error updating step:', error);
    }
  },
}));
