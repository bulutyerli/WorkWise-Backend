import { z } from 'zod';

export const annualSchema = z.object({
  name: z.string().min(3).max(30),
  end_date: z.string().min(1).max(50),
  starting_date: z.string().min(1).max(50),
  user_id: z.number(),
});
