import { CardProps } from './card-base.types';
import './CardBase.scss';

export const CardBase: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return <div className={`card-base ${className}`} onClick={onClick}>{children}</div>;
};
