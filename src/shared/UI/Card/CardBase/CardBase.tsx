import { CardProps } from './card-base.types';
import './CardBase.scss';

export const CardBase: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`card-base ${className}`}>{children}</div>;
};
