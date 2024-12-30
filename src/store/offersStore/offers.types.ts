import { TOffers } from '@pages/CreditCard/components/Offers/offers.types';
import { AsyncState } from '@shared';

export interface OffersStore extends AsyncState {
  selectedOfferId: string | null;
  submitOffer: (
    apiUrl: string | undefined,
    offers: TOffers[] | null,
  ) => Promise<void>;
  setSelectedOfferId: (id: string) => void;
  setSuccess: (value: boolean) => void;
}
