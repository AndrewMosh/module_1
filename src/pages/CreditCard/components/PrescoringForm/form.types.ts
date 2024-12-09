import { z } from "zod";

export const formSchema = z.object({
  lastName: z.string().min(1, "Enter your last name"),
  firstName: z.string().min(1, "Enter your first name"),
  email: z.string().email("Incorrect email address"), 
  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Incorrect date of birth"), 
  passportSeries: z
    .string()
    .length(4, "The series must be 4 digits") 
    .regex(/^\d{4}$/, "The series must contain only digits"), 
  passportNumber: z
    .string()
    .length(6, "The passport number must be 6 digits") 
    .regex(/^\d{6}$/, "The passport number must contain only digits"),
});

  export type FormData = z.infer<typeof formSchema>;