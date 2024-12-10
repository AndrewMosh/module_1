import { InputProps } from './input.types';
import './Input.scss';

export const Input: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  options,
  error,
  register,
  required,
  success,
}) => {
  const handleClassName = (type: string): string => {
    if (error) {
      return `input__wrapper input__${type}--error`;
    }
    if (success) {
      return `input__wrapper input__${type}--success`;
    }
    return `input__wrapper`;
  };
  return (
    <div className="input">
      <label className="input__label">
        {label} <span className="input__required">{required ? '*' : ''}</span>
      </label>
      {type === 'text' && (
        <div className={handleClassName('text')}>
          <input
            {...register}
            type="text"
            placeholder={placeholder}
            className="input__input"
          />
        </div>
      )}
      {type === 'select' && (
        <select {...register} className="input__select input__input">
          <option value="" disabled>
            {placeholder || 'Select an option'}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      {type === 'date' && (
        <div className={handleClassName('date')}>
          <input {...register} type="date" className="input__input" />
        </div>
      )}
      {error && <span className="input__error">{error}</span>}
    </div>
  );
};
