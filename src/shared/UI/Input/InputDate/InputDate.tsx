import { InputDateProps } from './input-date.types';

export const InputDate: React.FC<InputDateProps> = ({ register }) => {
  return (
    <>
      <input {...register} type="date" className="input__input" placeholder="Select Date and Time" 
      onFocus={(e) => e.target.type = 'date'}
      onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }} />
    </>
  );
};
