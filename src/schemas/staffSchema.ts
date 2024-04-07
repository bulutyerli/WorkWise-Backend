import { z } from 'zod';

export const staffSchema = z.object({
  name: z.string().min(3).max(30),
  surname: z.string().min(3).max(30),
  birthday: z.coerce.date(),
  phone: z.string().min(1).max(50),
  salary: z.number().positive(),
  join_date: z.coerce.date(),
  annual_leave: z.number().default(20),
  sickness_leave: z.number().default(10),
  department_id: z.number(),
  office_id: z.number(),
  role: z.number(),
  shift_id: z.nullable(z.number()),
});
