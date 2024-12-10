import { isOlderThan18 } from '@utils/ageValidation';
import { z } from 'zod';

export const formSchema = z.object({
  lastName: z.string().min(1, 'Enter your last name'),
  firstName: z.string().min(1, 'Enter your first name'),
  middleName: z.string().optional(),
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
	term:z.string(),
});

export type FormData = z.infer<typeof formSchema>;
