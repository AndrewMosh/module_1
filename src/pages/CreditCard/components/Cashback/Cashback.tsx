import './Cashback.scss';
import { cashback } from './cashback.consts';
import { Card } from '@shared';
import { evenColor, oddColor_cashback } from '@shared/UI/Card/card.consts';

export const Cashback = () => {
  return (
    <div className="cashback" data-testid="cashback">
      <div className="cashback__container">
        {cashback.map((card) => (
          <Card
		  role="cashback-card"  
		  key={card.id}
            backgroundColor={card.id % 2 === 0 ? oddColor_cashback : evenColor}
            offer={card.title}
            percentage={card.percentage}
            className="cashback__card"
          />
        ))}		
      </div>
    </div>
  );
};
