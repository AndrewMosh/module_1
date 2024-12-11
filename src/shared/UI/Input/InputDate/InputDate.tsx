import { InputDateProps } from './input-date.types';

export const InputDate: React.FC<InputDateProps> = ({ register }) => {
  return (
    <>
      <input {...register} type="date" className="input__input" />
    </>
  );
};
