import './Cashback.scss';
import { cashback } from './cashback.consts';
import { Card } from '@components/UI/Card/Card';
import { evenColor, oddColor_cashback } from '@components/UI/Card/card.consts';

export const Cashback = () => {
  return (
    <div className="cashback">
      <div className="cashback__container">
        {cashback.map((card) => (
          <Card
            backgroundColor={card.id % 2 === 0 ? oddColor_cashback : evenColor}
            offer={card.title}
            percentage={card.percentage}
            key={card.id}
            className="cashback__card"
          />
        ))}
      </div>
    </div>
  );
};
