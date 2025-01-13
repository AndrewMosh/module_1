import { create } from 'zustand';
import axios from 'axios';
import { DocumentState } from './sign.types';
import { setActiveStep } from '@store/activeStepStore/useActiveStepStore';

export const useSignStore = create<DocumentState>((set) => ({
  isAgreed: false,
  loading: false,
  error: null,
  success: false,
  setAgreement: (value: boolean) => set({ isAgreed: value }),
  submitAgreement: async (api: string, id: string) => {
    set({ loading: true, error: null });
    try {
      const url = `${api}/document/${id}/sign`;
      await axios.post(url, { agreed: true });
      set({ loading: false, success: true });
	  setActiveStep(4)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          loading: false,
          error: error.response?.data?.message || 'Something went wrong',
        });
      }
    }
  },
}));
