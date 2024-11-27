export interface CurrencyState {
  rates: Record<string, number> | null;
  isLoading: boolean;
  error: string | null;
  fetchRates: (baseCurrency: string, currencies: string[]) => Promise<void>;
}
