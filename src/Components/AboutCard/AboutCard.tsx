import { about_cards } from './about-card.consts';
import { Card } from '@components/UI/Card/Card';
import './AboutCard.scss';

export const AboutCard = () => {
  return (
    <div className="about-card">
      <div className="about-card__container">
        {about_cards.map((card) => (
          <Card
            backgroundColor={card.id % 2 === 0 ? '#7F92ACB3' : '#EAECEE'}
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
