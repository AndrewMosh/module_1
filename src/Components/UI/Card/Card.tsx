import { CardProps } from './card.types';
import './Card.scss';

export const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  backgroundColor = '#EAECEE',
  percentage,
  offer,
  onClick
}) => {
  return (
    <div className="card" style={{ backgroundColor }} onClick={onClick}>
     {icon? <img src={icon} alt="icon" />: null} 
     {title ? <h2 className="card__title">{title}</h2>: null} 
	 {description ? <p className="card__description">{description}</p>: null}
	 {offer ? <p className="card__offer">{offer}</p>: null}
	 {percentage ? <p className="card__percentage">{percentage}</p>: null}
    </div>
  );
};
