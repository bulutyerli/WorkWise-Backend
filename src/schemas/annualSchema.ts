import { z } from 'zod';

export const annualSchema = z.object({
  end_date: z.date(),
  starting_date: z.date(),
  firebase_id: z.string(),
  status: z.string(),
});
