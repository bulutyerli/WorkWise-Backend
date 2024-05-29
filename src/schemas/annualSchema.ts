import { z } from 'zod';

export const annualSchema = z.object({
  end_date: z.date(),
  starting_date: z.date(),
  user_id: z.number(),
  firebase_id: z.string(),
  status: z.string(),
  id: z.number().optional(),
});
