import { create } from 'zustand';
import { CodeState } from './code.types';
import { apiUrl } from '@shared/api/api.consts';


export const useCodeStore = create<CodeState>((set, get) => ({
  code: ['', '', '', ''],
  error: null,
  loading: false,
  isSuccess: false,
  setCode: (index, value) =>
    set((state) => {
      const updatedCode = [...state.code];
      updatedCode[index] = value;
      return { code: updatedCode };
    }),
  clearCode: () => set({ code: ['', '', '', ''], isSuccess: false }),
  sendCode: async (id) => {
    
    set({ loading: true, error: null, isSuccess: false });
    const { code } = get();
    const confirmationCode = code.join('');

    try {
       await fetch(`${apiUrl}/document/${id}/sign/code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(confirmationCode), 
      });

      set({ loading: false, isSuccess: true });
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      get().clearCode();
    }
  },
}));
