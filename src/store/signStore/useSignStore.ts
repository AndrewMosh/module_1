import { create } from 'zustand';
import axios from 'axios';
import { useStepStore } from '@store/updateStep/useStepStore';

interface DocumentState {
  isAgreed: boolean;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  setAgreement: (value: boolean) => void;
  submitAgreement: (api: string, id: string) => Promise<void>;
}

export const useSignStore = create<DocumentState>((set) => ({
  isAgreed: false,
  isLoading: false,
  error: null,
  isSuccess: false,
  setAgreement: (value: boolean) => set({ isAgreed: value }),
  submitAgreement: async (api: string, id: string) => {
    set({ isLoading: true, error: null });
    try {
      const url = `${api}/document/${id}/sign`;
      await axios.post(url, { agreed: true });
      useStepStore.getState().updateStep(id, 'step4');
      set({ isLoading: false, isSuccess: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || 'Something went wrong',
      });
    }
  },
}));
