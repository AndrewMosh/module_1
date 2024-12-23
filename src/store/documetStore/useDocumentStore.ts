import { create } from 'zustand';
import { useStepStore } from '@store/updateStep/useStepStore';

interface DocumentState {
  isAgreed: boolean;
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
  setAgreement: (agreed: boolean) => void;
  sendAgreement: (id: string) => Promise<void>;
}

const apiUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';

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
        useStepStore.getState().updateStep(id, 'step3');
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
