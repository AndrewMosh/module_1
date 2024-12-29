import { create } from 'zustand';
import { apiUrl } from '@shared/api/api.consts';
import { DocumentState } from './document.types';


export const useDocumentStore = create<DocumentState>((set) => ({
  isAgreed: false,
  loading: false,
  error: null,
  isSuccess: false,

  setAgreement: (agreed) => set({ isAgreed: agreed }),

  sendAgreement: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${apiUrl}/document/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agreement: true }),
      });

      if (response.ok) {
        set({ isSuccess: true });
      } else {
        throw new Error('Failed to submit agreement');
      }
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message });
      }
    } finally {
      set({ loading: false });
    }
  },
}));
