import './CustomizeCard.scss';
import { AmountSlider } from '@pages';
import { useSliderStore } from '@store';
import { formatNumber } from '@utils';

export const CustomizeCard = () => {
  const { value } = useSliderStore();
  return (
    <div className="customize-card">
      <div className="customize-card__inner">
        <div className="customize-card__header">
          <h2 className="customize-card__title">Customize your card</h2>
          <h3 className="customize-card__steps">Step 1 of 5</h3>
        </div>
        <AmountSlider />
      </div>
      <div className="customize-card__amount">
        <h3 className="customize-card__amount-title">
          You have chosen the amount
        </h3>
        <p className="customize-card__value">{formatNumber({ value })} ₽</p>
      </div>
    </div>
  );
};
