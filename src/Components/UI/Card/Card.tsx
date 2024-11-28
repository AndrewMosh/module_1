import { CardProps } from './card.types';
import './Card.scss';

export const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  backgroundColor = '#EAECEE',
  onClick,
}) => {
  return (
    <div className="card" style={{ backgroundColor }} onClick={onClick}>
      <img src={icon} alt="icon" />
      <h2 className="card__title">{title}</h2>
      <p className="card__description">{description}</p>
    </div>
  );
};
