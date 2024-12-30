import { create } from 'zustand';
import axios from 'axios';
import { apiUrl } from '@shared';
import { DocumentState } from './document.types';

export const useDocumentStore = create<DocumentState>((set) => ({
  isAgreed: false,
  loading: false,
  error: null,
  success: false,

  setAgreement: (agreed) => set({ isAgreed: agreed }),

  sendAgreement: async (id: string) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post(
        `${apiUrl}/document/${id}`,
        { agreement: true },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (response.status === 200) {
        set({ success: true });
      } else {
        throw new Error('Failed to submit agreement');
      }
    } catch (error) {
      set({
        error:
          axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : 'Unknown error',
      });
    } finally {
      set({ loading: false });
    }
  },
}));
