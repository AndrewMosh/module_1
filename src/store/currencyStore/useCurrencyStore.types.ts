import { AsyncState } from '@shared';

export interface CurrencyState extends AsyncState {
  code: string[];
  rates: Record<string, number> | null;
  fetchRates: (baseCurrency: string, currencies: string[]) => Promise<void>;
}
