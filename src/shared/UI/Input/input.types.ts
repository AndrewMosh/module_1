export type InputProps = {
  label: string;
  type: 'text' | 'select' | 'date';
  placeholder?: string;
  options?: { label: string; value: number }[];
  error?: string;
  success?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  required?: boolean;
};
