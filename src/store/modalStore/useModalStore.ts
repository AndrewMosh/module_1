import { apiUrl } from '@shared';
import { create } from 'zustand';
import { ModalState } from './modal.types';


export const useModalStore = create<ModalState>((set) => ({
  showModal: false,
  isSuccess: false,
  loading: false,
  error: null,

  openModal: () => set({ showModal: true }),
  closeModal: () => set({ showModal: false, isSuccess: false, error: null }),

  denyApplication: async (id: string) => {
    set({ loading: true, error: null });

    try {
      const response = await fetch(`${apiUrl}/application/${id}/deny`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to deny application');
      }

      set({ isSuccess: true });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err.message });
      }
    } finally {
      set({ loading: false });
    }
  },
}));
