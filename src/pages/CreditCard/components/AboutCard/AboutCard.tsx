import { about_cards } from './about-card.consts';
import { Card } from '@shared';
import './AboutCard.scss';
import { useCardColors } from './hooks/useCardColors';

export const AboutCard = () => {
  return (
    <div className="about-card">
      <div className="about-card__container">
        {about_cards.map((card) => {
          const backgroundColor = useCardColors(card.id);
          return (
            <Card
              backgroundColor={backgroundColor}
              icon={card.icon}
              title={card.title}
              description={card.description}
              key={card.id}
            />
          );
        })}
      </div>
    </div>
  );
};
