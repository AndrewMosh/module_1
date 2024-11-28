import './ExchangeRates.scss';
import bank from '@assets/svg/bank.svg';
import { formatDate } from '@utils/formatDate';
import { useEffect } from 'react';
import { useCurrencyStore } from '@store/currencyStore/useCurrencyStore';
import {
  baseCurrency,
  requiredCurrencies,
  UPDATE_INTERVAL,
} from '@components/ExchangeRates/currency.consts';

const ExchangeRates = () => {
  const today = formatDate(new Date());
  const { rates, isLoading, error, fetchRates } = useCurrencyStore();

  useEffect(() => {
    fetchRates(baseCurrency, requiredCurrencies);

    const intervalId = setInterval(() => {
      fetchRates(baseCurrency, requiredCurrencies);
    }, UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, [baseCurrency, fetchRates]);

  const placeholderRows = requiredCurrencies.map((currency) => (
    <div
      key={currency}
      className="exchange-rates__row exchange-rates__row--loading"
    >
      <div className="exchange-rates__currency">{currency}:</div>
      <div className="exchange-rates__rate exchange-rates__rate--loading">
        Loading...
      </div>
    </div>
  ));

  return (
    <section className="exchange-rates">
      <div className="exchange-rates__header">
        <h2 className="exchange-rates__title">
          Exchange rate in internet bank
        </h2>
        <span className="exchange-rates__update">
          Update every 15 minutes, {today}
        </span>
      </div>

      {error ? (
        <div className="exchange-rates__error">
          <h3 className="exchange-rates__error-title">Failed to load rates</h3>
          <p className="exchange-rates__error-message">
            {error}. Попробуйте перезагрузить страницу.
          </p>
        </div>
      ) : (
        <>
          <h3 className="exchange-rates__subtitle">Currency</h3>
          <div className="exchange-rates__inner">
            <div className="exchange-rates__table">
              {isLoading || !rates
                ? placeholderRows
                : Object.entries(rates).map(([currency, rate]) => (
                    <div key={currency} className="exchange-rates__row">
                      <div className="exchange-rates__currency">
                        {currency}:
                      </div>
                      <div className="exchange-rates__rate">{rate}</div>
                    </div>
                  ))}
            </div>
            <img className="exchange-rates__bank" src={bank} alt="bank" />
          </div>
          <button className="exchange-rates__all">All courses</button>
        </>
      )}
    </section>
  );
};

export default ExchangeRates;
