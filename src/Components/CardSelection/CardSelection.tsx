import { cards } from './Cards';
import './CardSelection.scss';
import Button from '../UI/Button/Button';

export const CardSelection = () => {
  return (
    <section className="cards-selection">
      <div className="cards-selection__container">
        <div className="cards-selection__inner">
          <h2 className="cards-selection__title">
            Choose the design you like and apply for a card right now
          </h2>
          <Button className="cards-selection__button">Choose the card</Button>
        </div>
        <div className="cards-selection__cards">
          {cards.map((card) => (
            <img
              key={card.id}
              src={card.image}
              alt={card.alt}
              title={card.alt}
              className="cards-selection__card"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
