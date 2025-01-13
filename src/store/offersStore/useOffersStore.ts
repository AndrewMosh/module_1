import { create } from 'zustand';
import axios from 'axios';
import { OffersStore } from './offers.types';
import { setActiveStep } from '@store/activeStepStore/useActiveStepStore';

export const useOffersStore = create<OffersStore>((set, get) => ({
  selectedOfferId: null,
  success: false,
  loading: false,
  error: false,
  setSelectedOfferId: (id) => {
    set((state) => ({
      selectedOfferId: state.selectedOfferId === id ? null : id,
    }));
  },
  setSuccess: (value) => set({ success: value }),
  submitOffer: async (apiUrl, offers) => {
    set({ loading: true });
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
            set({ success: true });
            set({ error: false });
            set({ loading: false });
			setActiveStep(1)
          } else {
            set({ error: true });
          }
        } catch (error) {
          if (error instanceof Error) {
            set({ error: true });
          }
        } finally {
          localStorage.removeItem('formStore');
        }
      }
    }
  },
}));
