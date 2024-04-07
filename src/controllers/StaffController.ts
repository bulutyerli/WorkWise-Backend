import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../utils/ErrorHandler';
import {
  deleteStaffById,
  fetchAllStaff,
  findStaffById,
  insertStaff,
} from '../repositories/staffRepository';
import { staffSchema } from '../schemas/staffSchema';

export async function getStaffByID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id);

  try {
    const staff = await findStaffById(id);

    if (!staff) {
      return next(new ErrorHandler(404, 'Staff ID Not Found'));
    }
    res.json({ status: 200, data: staff });
  } catch (error) {
    next(error);
  }
}

export async function getAllStaff(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const staff = await fetchAllStaff();

    if (!staff) {
      return next(new ErrorHandler(404, 'Could not get the staff data'));
    }

    res.json({ success: true, data: staff });
  } catch (error) {
    next(error);
  }
}

export async function createNewStaff(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const staffData = staffSchema.parse(req.body);

    await insertStaff(staffData);
    res
      .status(201)
      .json({ success: true, message: 'Staff member created successfully' });
  } catch (error) {
    next(error);
  }
}

export async function deleteStaff(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    console.log('id:', id, 'params:', req.params.id);
    await deleteStaffById(id);
    res
      .status(200)
      .json({ success: true, message: 'Staff member deleted successfully' });
  } catch (error) {
    next(error);
  }
}
