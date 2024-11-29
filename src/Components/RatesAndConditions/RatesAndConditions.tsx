import { conditions } from './conditions.consts';
import './RatesAndConditions.scss';
export const RatesAndConditions = () => {
  return (
    <div className="conditions">
      <div className="conditions__container">
        {conditions.map((condition) => (
          <div key={condition.id} className="conditions__item">
            <div className="conditions__title">{condition.title}</div>
            <div className="conditions__description">
              {condition.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
