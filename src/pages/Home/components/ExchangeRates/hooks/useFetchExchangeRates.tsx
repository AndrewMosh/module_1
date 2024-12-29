import { useEffect } from 'react';
import { useCurrencyStore } from '@store';

const useFetchExchangeRates = (
  baseCurrency: string,
  requiredCurrencies: string[],
  updateInterval: number,
) => {
  const { fetchRates } = useCurrencyStore();

  useEffect(() => {
    fetchRates(baseCurrency, requiredCurrencies);

    const intervalId = setInterval(() => {
      fetchRates(baseCurrency, requiredCurrencies);
    }, updateInterval);

    return () => clearInterval(intervalId);
  }, [baseCurrency, fetchRates, requiredCurrencies, updateInterval]);
};

export default useFetchExchangeRates;
