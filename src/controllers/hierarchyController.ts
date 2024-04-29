import { NextFunction, Response, Request } from 'express';
import { fetchHierarchy } from '../repositories/rolesRepository';
import { ErrorHandler } from '../utils/ErrorHandler';

export async function getHierarchy(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hierarchy = await fetchHierarchy();

    if (!hierarchy) {
      return next(new ErrorHandler(404, 'Could not get the hierarchy data'));
    }

    res.status(200).json({ data: hierarchy });
  } catch (error) {
    next(error);
  }
}
