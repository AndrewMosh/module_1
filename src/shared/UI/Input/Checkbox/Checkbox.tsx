import React from 'react';
import './Checkbox.scss';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  className,
}) => {
  return (
    <div className={`checkbox ${className}`}>
      <input
        type="checkbox"
        id="agreement"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="checkbox__input"
      />
      <label htmlFor="agreement">{label}</label>
    </div>
  );
};

export default Checkbox;
