import { useEffect } from 'react';
import { useNewsStore } from '@store';
import { UPDATE_INTERVAL } from '@pages/Home/components/ExchangeRates/currency.consts';

const useFetchNews = () => {
  const { fetchNews } = useNewsStore();

  useEffect(() => {
    fetchNews();

    const intervalId = setInterval(() => {
      fetchNews();
    }, UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [fetchNews]);
};

export default useFetchNews;
