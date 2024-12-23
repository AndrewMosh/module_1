import { ButtonProps } from './button.types';
import './Button.scss';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled,
}) => (
  <button
    className={`button ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
