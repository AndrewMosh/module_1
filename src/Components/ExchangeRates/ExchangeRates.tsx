import { rates } from "./rates.mock";
import "./ExchangeRates.scss";
import bank from "@assets/svg/bank.svg";
import { formatDate } from "@utils/formatDate";

const ExchangeRates = () => {
    const today = formatDate(new Date());

    return (
        <section className="exchange-rates">
            <div className="exchange-rates__header">
                <h2 className="exchange-rates__title">Exchange rate in internet bank</h2>
                <span className="exchange-rates__update">Update every 15 minutes, {today}</span>
            </div>
            <h3 className="exchange-rates__subtitle">Currency</h3>
            <div className="exchange-rates__inner">
                <div className="exchange-rates__table">
                    {rates.map((rate) => (
                        <div key={rate.currency} className="exchange-rates__row">
                            <div className="exchange-rates__currency">{rate.currency}:</div>
                            <div className="exchange-rates__rate">{rate.rate}</div>
                        </div>
                    ))}
                </div>
                <img className="exchange-rates__bank" src={bank} alt="bank" />
            </div>

            <button className="exchange-rates__all">All courses</button>
        </section>
    );
};

export default ExchangeRates;
