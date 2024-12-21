import { Label } from '../Label/Label';
import { InputProps } from './dynamic-input.types';
import './DynamicInput.scss';
import { InputText } from '../Input/InputText/InputText';
import { InputDate } from '../Input/InputDate/InputDate';
import { Select } from '../Select/Select';

export const DynamicInput: React.FC<InputProps> = ({
  label,
  type,
  placeholder,
  options,
  error,
  register,
  required,
  success,
  className
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
    <div className={`input ${className}`}>
      <Label label={label} required={required} />
      {type === 'text' && (
        <div className={handleClassName('text')}>
          <InputText register={register} placeholder={placeholder} />
        </div>
      )}
      {type === 'select' && (
        <Select
          register={register}
          placeholder={placeholder}
          options={options}
        />
      )}
      {type === 'date' && (
        <div className={handleClassName('date')}>
          <InputDate register={register} />
        </div>
      )}
      {error && <span className="input__error">{error}</span>}
    </div>
  );
};
