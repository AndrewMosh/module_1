import { create } from 'zustand';
import axios from 'axios';
import { OffersStore } from './offers.types';

export const useOffersStore = create<OffersStore>((set, get) => ({
  selectedOfferId: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  setSelectedOfferId: (id) => {
    set((state) => ({
      selectedOfferId: state.selectedOfferId === id ? null : id,
    }));
  },
  setSuccess: (value) => set({ isSuccess: value }),
  submitOffer: async (apiUrl, offers) => {
    set({ isLoading: true });
    const { selectedOfferId } = get();
    if (selectedOfferId && offers) {
      const selectedOffer = offers?.find(
        (offer) => offer.uniqueId === selectedOfferId,
      );
      if (selectedOffer) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { uniqueId, ...offerToSend } = selectedOffer;
        try {
          const response = await axios.post(
            `${apiUrl}/application/apply`,
            offerToSend,
          );
          if (response.status === 200) {
            set({ isSuccess: true });
            set({ isError: false });
            set({ isLoading: false });
          } else {
            set({ isError: true });
          }
        } catch (error) {
          if (error instanceof Error) {
            set({ isError: true });
          }
        } finally {
          localStorage.removeItem('formStore');
        }
      }
    }
  },
}));

