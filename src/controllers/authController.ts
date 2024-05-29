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
    const admin_roles = [1, 2, 3, 4, 5, 18, 22];
    const manager_roles = [1, 2, 3, 4, 5, 9, 12, 19, 20, 21, 22, 23];

    if (!firebaseId) {
      return next(new ErrorHandler(400, 'Firebase ID is required'));
    }

    const userRole = await fetchUserRole(firebaseId);

    if (!userRole) {
      return next(new ErrorHandler(404, 'User not found'));
    }

    const isAdmin = admin_roles.includes(userRole.role_id);
    const isManager = manager_roles.includes(userRole.role_id);

    res.status(200).json({ isAdmin, isManager, userId: userRole.id });
  } catch (error) {
    next(error);
  }
}
