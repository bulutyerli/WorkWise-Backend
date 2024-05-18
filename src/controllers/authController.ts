import { NextFunction, Response, Request } from 'express';
import { fetchUserRole } from '../repositories/authRepository';
import { ErrorHandler } from '../utils/ErrorHandler';

export async function getUserRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const firebaseId = req.query.firebaseId as string | undefined;
    const admin_roles = [1, 2, 4, 5, 18, 22];

    if (!firebaseId) {
      return next(new ErrorHandler(400, 'Firebase ID is required'));
    }

    const userRole = await fetchUserRole(firebaseId);

    if (!userRole) {
      return next(new ErrorHandler(404, 'User not found'));
    }

    if (admin_roles.includes(userRole.role_id)) {
      res.status(200).json({ isAdmin: true });
    } else {
      res.status(200).json({ isAdmin: false });
    }
  } catch (error) {
    next(error);
  }
}
