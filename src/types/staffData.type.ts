import { z } from 'zod';
import { staffSchema } from '../schemas/staffSchema';

export type staffType = z.infer<typeof staffSchema>;
