import { z } from 'zod';

export const rolesSchema = z.object({
  name: z.string(),
});
