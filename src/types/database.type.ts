import { z } from 'zod';
import { staffSchema, staffUpdateSchema } from '../schemas/staffSchema';
import { incomeSchema, updateIncomeSchema } from '../schemas/incomeSchema';
import { expensesSchema, updateExpenseSchema } from '../schemas/expensesSchema';
import { rolesSchema } from '../schemas/rolesSchema';
import { annualSchema } from '../schemas/annualSchema';

export type staffType = z.infer<typeof staffSchema>;
export type updateStaffType = z.infer<typeof staffUpdateSchema>;
export type incomeType = z.infer<typeof incomeSchema>;
export type expensesType = z.infer<typeof expensesSchema>;
export type updateIncomeType = z.infer<typeof updateIncomeSchema>;
export type updateExpenseType = z.infer<typeof updateExpenseSchema>;
export type rolesType = z.infer<typeof rolesSchema>;
export type annualType = z.infer<typeof annualSchema>;
