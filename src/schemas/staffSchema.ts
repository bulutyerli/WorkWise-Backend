import { z } from 'zod';

export const staffSchema = z.object({
  name: z.string().min(3).max(30),
  surname: z.string().min(3).max(30),
  birthday: z.coerce.date(),
  phone: z.string().min(1).max(50),
  salary: z.number().positive(),
  join_date: z.coerce.date(),
  sickness_leave: z.number().default(0),
  department_id: z.number(),
  office_id: z.number(),
  role_id: z.number(),
  shift_id: z.nullable(z.number()),
  manager_id: z.nullable(z.number()),
  firebase_id: z.string(),
  email: z.string().min(1).max(100),
});

export const staffUpdateSchema = z.object({
  name: z.string().min(3).max(30).optional(),
  surname: z.string().min(3).max(30).optional(),
  birthday: z.coerce.date().optional(),
  phone: z.string().min(1).max(50).optional(),
  salary: z.number().positive().optional(),
  join_date: z.coerce.date().optional(),
  sickness_leave: z.number().default(10).optional(),
  department_id: z.number().optional(),
  office_id: z.number().optional(),
  role_id: z.number().optional(),
  shift_id: z.nullable(z.number()).optional(),
  manager_id: z.nullable(z.number()),
});
