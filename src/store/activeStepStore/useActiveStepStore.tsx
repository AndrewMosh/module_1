import { create } from 'zustand';

interface StepStore {
  activeStep: number;
  setActiveStep: (index: number) => void;
  removeActiveStep: () => void;
}

export const useActiveStepStore = create<StepStore>((set) => ({
  activeStep: Number(localStorage.getItem('activeStep')) || 0,
  setActiveStep: (index) => {
    set({ activeStep: index });
    localStorage.setItem('activeStep', String(index)); 
  },
  removeActiveStep: () => {
    set({ activeStep: 0 }); 
    localStorage.removeItem('activeStep'); 
  },
}));

export const setActiveStep = (index: number) => useActiveStepStore.getState().setActiveStep(index);
export const removeActiveStep =()=>useActiveStepStore.getState().removeActiveStep();