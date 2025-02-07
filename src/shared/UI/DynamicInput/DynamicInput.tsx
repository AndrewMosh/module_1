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
  className,
  disabled,
}) => {
  const handleClassName = (inputType: string): string => {
    if (error) {
      return `input__wrapper input__${inputType}--error`;
    }
    if (success) {
      return `input__wrapper input__${inputType}--success`;
    }
    return `input__wrapper`;
  };

  const renderInputField = () => {
    switch (type) {
      case 'text':
        return (
          <div className={handleClassName('text')}>
            <InputText register={register} placeholder={placeholder} />
          </div>
        );
      case 'select':
        return (
          <Select
            register={register}
            placeholder={placeholder}
            options={options}
            disabled={disabled}
          />
        );
      case 'date':
        return (
          <div className={handleClassName('date')}>
            <InputDate register={register} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`input ${className}`}>
      <Label label={label} required={required} />
      {renderInputField()}
      {error && <span className="input__error">{error}</span>}
    </div>
  );
};
