import { SelectProps } from './select.types';

export const Select: React.FC<SelectProps> = ({
  register,
  placeholder,
  options,
  disabled,
}) => {
  return (
    <>
      <select {...register} className="input__select input__input">
        <option value="" disabled={disabled} hidden>
          {placeholder || ''}
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
