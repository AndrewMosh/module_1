import './HowToGet.scss';
import { steps } from './how-to.consts';

export const HowToGet = () => {
  return (
    <div className="how-to-get">
      <div className="how-to-get__container">
        <h2 className="how-to-get__title">How to get a card</h2>
        <div className="how-to-get__list">
          {steps.map((step) => (
            <div key={step.id} className="how-to-get__item">
              <div className="how-to-get__step">
                <span className="how-to-get__number">{step.id}</span>
                <hr className="how-to-get__line" />
              </div>
              <div className="how-to-get__text">{step.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
