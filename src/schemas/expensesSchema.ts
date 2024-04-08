import { z } from 'zod';

export const expensesSchema = z.object({
  description: z.string().min(3).max(50),
  amount: z.number().min(1),
  user_id: z.number(),
  date: z.coerce.date(),
  category: z.number(),
});

export const updateExpenseSchema = z.object({
  description: z.string().min(3).max(50).optional(),
  amount: z.number().min(1).optional(),
  user_id: z.number().optional(),
  date: z.coerce.date().optional(),
  category: z.number().optional(),
});
