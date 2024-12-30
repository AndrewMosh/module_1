import { create } from 'zustand';
import axios from 'axios';
import { CurrencyState } from './useCurrencyStore.types';
import { rates_api, ratesKey } from '@shared';

export const useCurrencyStore = create<CurrencyState>((set) => ({
  rates: null,
  loading: false,
  error: null,

  fetchRates: async (baseCurrency: string, currencies: string[]) => {
    const apiUrl = `${rates_api}${ratesKey}/latest/${baseCurrency}`;
    set({ loading: true, error: null });

    try {
      const { data } = await axios.get(apiUrl);

      const filteredRates = Object.fromEntries(
        Object.entries(data.conversion_rates).filter(([key]) =>
          currencies.includes(key),
        ),
      ) as Record<string, number>;

      set({ rates: filteredRates, loading: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          error: error.response?.data?.error || error.message,
          loading: false,
        });
      } else {
        set({ error: 'Произошла ошибка', loading: false });
      }
    }
  },
}));
