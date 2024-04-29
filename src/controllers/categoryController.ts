import { NextFunction, Response, Request } from 'express';
import {
  getDepartments,
  getOffices,
  getRoles,
  getShifts,
} from '../repositories/categoryRepository';

export async function getAllCategories(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const offices = await getOffices();
    const roles = await getRoles();
    const departments = await getDepartments();
    const shifts = await getShifts();

    res.status(200).json({ data: { offices, roles, departments, shifts } });
  } catch (error) {
    next(error);
  }
}
