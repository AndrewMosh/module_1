import { UseFormRegisterReturn } from 'react-hook-form';

export type InputProps = {
  label: string;
  type: 'text' | 'select' | 'date';
  placeholder?: string;
  options?: { label: string; value: number }[];
  error?: string;
  success?: boolean;
  register: UseFormRegisterReturn;
  required?: boolean;
};
