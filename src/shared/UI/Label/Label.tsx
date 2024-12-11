import { LabelProps } from './label.types';

export const Label: React.FC<LabelProps> = ({ label, required }) => {
  return (
    <label className="input__label">
      {label} <span className="input__required">{required ? '*' : ''}</span>
    </label>
  );
};
