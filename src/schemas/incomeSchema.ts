import { z } from 'zod';

export const incomeSchema = z.object({
  description: z.string().min(3).max(50),
  amount: z.number().min(1),
  date: z.coerce.date(),
  category: z.number(),
});

export const updateIncomeSchema = z.object({
  description: z.string().min(3).max(50).optional(),
  amount: z.number().min(1).optional(),
  date: z.coerce.date().optional(),
  category: z.number().optional(),
});
