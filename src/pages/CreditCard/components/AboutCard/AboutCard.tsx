import { about_cards } from './about-card.consts';
import { Card } from '@shared/UI/Card/Card';
import './AboutCard.scss';
import { evenColor, oddColor__aboutCards } from '@shared/UI/Card/card.consts';

export const AboutCard = () => {
  return (
    <div className="about-card">
      <div className="about-card__container">
        {about_cards.map((card) => (
          <Card
            backgroundColor={
              card.id % 2 === 0 ? oddColor__aboutCards : evenColor
            }
            icon={card.icon}
            title={card.title}
            description={card.description}
            key={card.id}
          />
        ))}
      </div>
    </div>
  );
};
