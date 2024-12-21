import { create } from 'zustand';
import axios from 'axios';
import { TOffers } from '@pages/CreditCard/components/Offers/offers.types';

interface OffersStore {
  selectedOfferId: string | null;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  submitOffer: (
    apiUrl: string | undefined,
    offers: TOffers[] | null,
  ) => Promise<void>;
  setSelectedOfferId: (id: string) => void;
  setSuccess: (value: boolean) => void;
}

const useOffersStore = create<OffersStore>((set, get) => ({
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          set({ isError: true });
        } finally {
          localStorage.removeItem('formStore');
        }
      }
    }
  },
}));

export default useOffersStore;
