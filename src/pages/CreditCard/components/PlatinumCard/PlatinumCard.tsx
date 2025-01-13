import { offers } from './platinum.consts';
import image from '@assets/images/platinum.png';
import './PlatinumCard.scss';
import { Button, Tooltip } from '@shared';
import { scrollToAnchor } from '@utils';
import { useActiveStepStore, usePrescoringStore } from '@store';
import { formName } from '../PrescoringForm/form.consts';
import { useNavigate } from 'react-router-dom';

export const PlatinumCard = () => {
  const { forms } = usePrescoringStore();
  const { activeStep } = useActiveStepStore();
  const navigate = useNavigate();
 const applicationId = localStorage.getItem('currentId')
 

  const formState = forms[formName] || {
    loading: false,
    success: false,
    error: null,
    data: null,
  };

  const navigateToStep = (step: number) => {
    const stepRoutes: { [key: number]: string } = {
      1: `/loan/${applicationId}`,
      2: `/loan/${applicationId}/document`,
      3: `/loan/${applicationId}/document/sign`,
      4: `/loan/${applicationId}/code`,
    };

    if (stepRoutes[step]) {
      navigate(stepRoutes[step]);
    } else {
      scrollToAnchor('prescoring');
    }
  };

  const handleButtonClick = () => {
    navigateToStep(activeStep);
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
            {offers.map(({ id, tooltip, offer, percentage }) => (
              <Tooltip content={tooltip} position="bottom" key={id}>
                <p className="platinum-card__offer-title">{offer}</p>
                <p className="platinum-card__offer-percentage">{percentage}</p>
              </Tooltip>
            ))}
          </div>
          <Button
            className="platinum-card__button"
            onClick={handleButtonClick}
          >
            {applicationId || formState.data ? 'Continue application' : 'Apply for card'}
          </Button>
        </div>
        <div className="platinum-card__image">
          <img src={image} alt="card" />
        </div>
      </div>
    </div>
  );
};
