import { UseFormRegisterReturn } from 'react-hook-form';

export type InputProps = {
  label: string;
  type: 'text' | 'select' | 'date';
  placeholder?: string;
  options?: { label: string; value: number | string }[];
  error?: string;
  success?: boolean;
  register: UseFormRegisterReturn;
  required?: boolean;
  className?: string;
};
