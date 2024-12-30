import { offers } from './platinum.consts';
import image from '@assets/images/platinum.png';
import './PlatinumCard.scss';
import { Button, Tooltip } from '@shared';
import { scrollToAnchor } from '@utils';
import { usePrescoringStore } from '@store';
import { formName } from '../PrescoringForm/form.consts';

export const PlatinumCard = () => {
  const { forms } = usePrescoringStore();

  const formState = forms[formName] || {
    loading: false,
    success: false,
    error: null,
    data: null,
  };
  const handleScroll = (id: string) => {
    scrollToAnchor(id);
  };
  return (
    <div className="platinum-card">
      <div className="platinum-card__container">
        <div className="platinum-card__inner">
          <h2 className="platinum-card__title">Platinum digital credit card</h2>
          <p className="platinum-card__text">
            Our best credit card. Suitable for everyday spending and shopping.
            Cash withdrawals and transfers without commission and interest.
          </p>
          <div className="platinum-card__offers">
            {offers.map((offer) => (
              <Tooltip content={offer.tooltip} position="bottom" key={offer.id}>
                <p className="platinum-card__offer-title">{offer.offer}</p>
                <p className="platinum-card__offer-percentage">
                  {offer.percentage}
                </p>
              </Tooltip>
            ))}
          </div>
          <Button
            className="platinum-card__button"
            onClick={() => handleScroll('prescoring')}
          >
            {formState.data ? 'Continue application' : ' Apply for card'}
          </Button>
        </div>
        <div className="platinum-card__image">
          <img src={image} alt="card" />
        </div>
      </div>
    </div>
  );
};
