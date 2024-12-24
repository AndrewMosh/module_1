import { isOlderThan18 } from '@utils/ageValidation';
import { z } from 'zod';

export const formSchema = z.object({
  lastName: z
    .string()
    .min(1, 'Enter your last name')
    .regex(/^[A-Za-z]+$/, 'Last name should contain Latin letters'),
  firstName: z
    .string()
    .min(1, 'Enter your first name')
    .regex(/^[A-Za-z]+$/, 'First name should contain Latin letters'),
  middleName: z
    .string()
    .regex(/^[A-Za-z]*$/, 'Patronymic should contain Latin letters'),
  email: z.string().email('Incorrect email address'),
  birthdate: z
    .string()
    .refine((val) => {
      const dateParts = val.split('-');
      const formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
      return /^\d{2}\.\d{2}\.\d{4}$/.test(formattedDate);
    }, 'Incorrect date of birth')
    .refine(isOlderThan18, {
      message: 'You must be 18 or older',
    }),
  passportSeries: z
    .string()
    .length(4, 'The series must be 4 digits')
    .regex(/^\d{4}$/, 'The series must contain only digits'),
  passportNumber: z
    .string()
    .length(6, 'The passport number must be 6 digits')
    .regex(/^\d{6}$/, 'The passport number must contain only digits'),
  term: z.union([z.string(), z.number()]),
});

export type FormData = z.infer<typeof formSchema>;

export type TData = {
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  birthdate: string | Date;
  passportSeries: string;
  passportNumber: string;
  term: number | string;
  amount: number;
  account?: string;
};
