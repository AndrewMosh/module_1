import { validatePassportIssueDate } from '@utils/validatePassportIssueDate';
import { z } from 'zod';

const passportSeriesRegex = /^\d{6}$/;
const innRegex = /^\d{12}$/;
const numericRegex = /^\d*$/;

export const scoreSchema = z.object({
  gender: z.string().refine((value) => value === 'Male' || value === 'Female', {
    message: "Gender must be either 'Male' or 'Female'",
  }),
  maritalStatus: z
    .string()
    .refine(
      (value) =>
        ['Married', 'Divorced', 'Single', 'Widow / Widower'].includes(value),
      {
        message: 'Invalid marital status',
      },
    ),
  dependentAmount: z.string().transform(Number),
  passportIssueDate: z
    .string()
    .refine(
      validatePassportIssueDate,
      'Incorrect date of birth or future date',
    ),
  passportIssueBranch: z
    .string()
    .length(6, 'The series must be 6 digits')
    .regex(passportSeriesRegex, 'The series must contain only digits'),
  employmentStatus: z
    .string()
    .refine(
      (value) =>
        ['Unemployed', 'Self-employed', 'Employed', 'Business owner'].includes(
          value,
        ),
      {
        message: 'Invalid employment status',
      },
    ),
  employerINN: z
    .string()
    .regex(innRegex, 'The series must contain only 12 digits'),
  salary: z.string().regex(numericRegex, 'The series must contain only digits'),
  position: z
    .string()
    .refine(
      (value) =>
        ['Worker', 'Middle manager', 'Top manager', 'Owner'].includes(value),
      {
        message: 'Invalid position',
      },
    ),
  workExperienceTotal: z
    .string()
    .regex(numericRegex, 'The series must contain only digits'),
  workExperienceCurrent: z
    .string()
    .regex(numericRegex, 'The series must contain only digits'),
});

export type scoreData = z.infer<typeof scoreSchema>;

export type TScore = {
  gender: 'MALE' | 'FEMALE';
  maritalStatus: 'MARRIED' | 'DIVORCED' | 'SINGLE' | 'WIDOW_WIDOWER';
  dependentAmount: number;
  passportIssueDate: string | Date;
  passportIssueBranch: string;
  employmentStatus:
    | 'UNEMPLOYED'
    | 'SELF_EMPLOYED'
    | 'EMPLOYED'
    | 'BUSINESS_OWNER';
  employerINN: number;
  salary: number;
  position: 'WORKER' | 'MID_MANAGER' | 'TOP_MANAGER' | 'OWNER';
  workExperienceTotal: number;
  workExperienceCurrent: number;
};
