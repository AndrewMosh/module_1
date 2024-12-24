import { TOffers } from "@pages/CreditCard/components/Offers/offers.types";

export interface FormState {
	isLoading: boolean;
	success: boolean;
	error: string | null;
	data: TOffers[] | null;
  }