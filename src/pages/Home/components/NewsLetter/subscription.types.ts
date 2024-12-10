import { z } from 'zod';

export const subscriptionSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
});

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>;
