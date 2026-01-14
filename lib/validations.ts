import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email is too long'),
  phone: z
    .string()
    .regex(/^[\d\s\-\(\)\+]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number is too short')
    .max(20, 'Phone number is too long'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
