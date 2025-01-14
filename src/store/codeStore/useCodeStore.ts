import { create } from 'zustand';
import axios from 'axios';
import { CodeState } from './code.types';
import { apiUrl } from '@shared';

export const useCodeStore = create<CodeState>((set, get) => ({
  code: ['', '', '', ''],
  error: null,
  loading: false,
  success: false,
  setCode: (index, value) =>
    set((state) => {
      const updatedCode = [...state.code];
      updatedCode[index] = value;
      return { code: updatedCode };
    }),
  clearCode: () => set({ code: ['', '', '', ''], success: false }),
  sendCode: async (id) => {
    set({ loading: true, error: null, success: false });
    const { code } = get();
    const confirmationCode = code.join('');

    try {
      const response = await axios.post(
        `${apiUrl}/document/${id}/sign/code`,
        confirmationCode,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status !== 200) {
        throw new Error('Invalid confirmation code');
      }

      set({ loading: false, success: true });
    } catch (error) {
      set({
        loading: false,
        error:
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : 'Invalid confirmation code',
      });
      get().clearCode();
    }
  },
}));
