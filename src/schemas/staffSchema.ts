import { z } from 'zod';

export const staffSchema = z.object({
  name: z.string().min(3).max(30),
  surname: z.string().min(3).max(30),
  birthday: z.date(),
  phone: z.string().min(1).max(50),
  salary: z.number(),
  join_date: z.date(),
  annual_leave: z.number(),
  sickness_leave: z.number(),
  department_id: z.number(),
  office_id: z.number(),
  role: z.number(),
  shift_id: z.nullable(z.number()),
});
