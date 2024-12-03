import { create } from 'zustand';
import axios from 'axios';
import { CurrencyState } from './useCurrencyStore.types';

const apiKey = import.meta.env.VITE_API_KEY_RATES;
const rates_api = import.meta.env.VITE_RATES_API;

if (!apiKey) {
  console.error('API key отсутствует, проверьте файл .env');
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  rates: null,
  isLoading: false,
  error: null,

  fetchRates: async (baseCurrency: string, currencies: string[]) => {
    const apiUrl = `${rates_api}${apiKey}/latest/${baseCurrency}`;
    set({ isLoading: true, error: null });

    try {
      const { data } = await axios.get(apiUrl);

      const filteredRates = Object.fromEntries(
        Object.entries(data.conversion_rates).filter(([key]) =>
          currencies.includes(key),
        ),
      ) as Record<string, number>;

      set({ rates: filteredRates, isLoading: false });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        set({
          error: error.response?.data?.error || error.message,
          isLoading: false,
        });
      } else {
        set({ error: 'Произошла ошибка', isLoading: false });
      }
    }
  },
}));
