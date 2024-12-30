import { TOffers } from '@pages/CreditCard/components/Offers/offers.types';
import { AsyncState } from '@shared';
import { TScore } from '@pages/ScoringStep/components/ScoringForm/form.types';

export interface FormState extends AsyncState<TOffers[] | TScore | null> {
  data: TOffers[] | TScore | null;
}
