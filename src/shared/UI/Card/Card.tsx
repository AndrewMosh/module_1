import { CardProps } from './card.types';
import './Card.scss';

export const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  backgroundColor = '#EAECEE',
  percentage,
  offer,
  onClick,
  role
}) => {
  return (
    <div className="card" style={{ backgroundColor }} onClick={onClick} role={role}>
      {icon && <img src={icon} alt="icon" />}
      {title && <h2 className="card__title">{title}</h2>}
      {description && <p className="card__description">{description}</p>}
      {offer && <p className="card__offer">{offer}</p>}
      {percentage && <p className="card__percentage">{percentage}</p>}
    </div>
  );
};
