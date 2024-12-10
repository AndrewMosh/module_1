import { CardProps } from './card-base.types';
import './CardBase.scss';

export const CardBase: React.FC<CardProps> = ({ children }) => {
  return <div className="card-base">{children}</div>;
};
