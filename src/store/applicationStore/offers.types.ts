import { TOffers } from "@pages/CreditCard/components/Offers/offers.types";

export interface OffersStore {
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