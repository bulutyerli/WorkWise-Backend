import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../utils/ErrorHandler';
import {
  countStaff,
  deleteStaffById,
  fetchAllStaff,
  findStaffById,
  insertStaff,
  updateStaffById,
} from '../repositories/staffRepository';
import { staffSchema, staffUpdateSchema } from '../schemas/staffSchema';

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
    res.json(staff);
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
    const filters: Record<string, string | null> = req.query as Record<
      string,
      string | null
    >;
    const limit = 15;
    const page = parseInt(req.query.page as string);
    const offset = (page - 1) * limit;
    const [{ total_staff }] = await countStaff(filters);
    const totalPages = Math.ceil(total_staff / limit);
    const staff = await fetchAllStaff(offset, limit, filters);
    const hasMore = page < totalPages;
    if (!staff) {
      return next(new ErrorHandler(404, 'Could not get the staff data'));
    }

    res.json({
      success: true,
      totalPages,
      totalStaff: total_staff,
      hasMore: hasMore,
      data: staff,
    });
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
    await deleteStaffById(id);
    res
      .status(200)
      .json({ success: true, message: 'Staff member deleted successfully' });
  } catch (error) {
    next(error);
  }
}

export async function updateStaff(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const staffData = staffUpdateSchema.parse(req.body);

    await updateStaffById(id, staffData);
    res
      .status(200)
      .json({ success: true, message: 'Staff member updated successfully' });
  } catch (error) {
    next(error);
  }
}
