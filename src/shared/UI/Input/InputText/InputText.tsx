import { InputTextProps } from './input-text.types';

export const InputText: React.FC<InputTextProps> = ({
  register,
  placeholder,
}) => {
  return (
    <>
      <input
        {...register}
        type="text"
        placeholder={placeholder}
        className="input__input"
      />
    </>
  );
};
