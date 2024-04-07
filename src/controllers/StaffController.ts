import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../utils/ErrorHandler';
import { fetchAllStaff, findStaffById } from '../queries/StaffRepository';

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
