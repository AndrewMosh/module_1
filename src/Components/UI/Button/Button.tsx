import { ButtonProps } from './button.types';
import './Button.scss';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
}) => (
  <button className={`button ${className}`} onClick={onClick}>
    {children}
  </button>
);

export default Button;
