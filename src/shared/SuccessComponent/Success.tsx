import { TSuccess } from './success.types';
import './success.scss';

export const Success = ({ title, text, className }: TSuccess) => {
  return (
    <div className={`success ${className}`}>
      <h2 className="success__title">{title}</h2>
      <p className="success__text">{text}</p>
    </div>
  );
};
