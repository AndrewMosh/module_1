import { AsyncState } from '@shared';

export interface CurrencyState extends AsyncState {
  rates: Record<string, number> | null;
  fetchRates: (baseCurrency: string, currencies: string[]) => Promise<void>;
}
