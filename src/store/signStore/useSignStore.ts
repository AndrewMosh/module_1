import { create } from 'zustand';
import axios from 'axios';
import { useStepStore } from '@store/updateStep/useStepStore';
import { DocumentState } from './sign.types';


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
    } catch (error) {
	  if (axios.isAxiosError(error)) {
		set({
			isLoading: false,
			error: error.response?.data?.message || 'Something went wrong',
		  });
	  }
     
    }
  },
}));
