import { create } from 'zustand';
import axios from 'axios';
import { ModalState } from './modal.types';
import { apiUrl } from '@shared';

export const useModalStore = create<ModalState>((set) => ({
  showModal: false,
  success: false,
  loading: false,
  error: null,

  openModal: () => set({ showModal: true }),
  closeModal: () => set({ showModal: false, success: false, error: null }),

  denyApplication: async (id: string) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post(
        `${apiUrl}/application/${id}/deny`,
        null,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (response.status !== 200) {
        throw new Error('Failed to deny application');
      }

      set({ success: true });
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
