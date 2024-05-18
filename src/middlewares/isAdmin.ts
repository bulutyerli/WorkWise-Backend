import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebaseConfig';
import { ErrorHandler } from '../utils/ErrorHandler';
import { fetchUserRole } from '../repositories/authRepository';

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization?.split(' ')[1];
  const admin_roles = [1, 2, 4, 5, 18, 22];

  try {
    if (!token) {
      return next(new ErrorHandler(404, 'No token provided'));
    }

    const decodedToken = await auth.verifyIdToken(token);

    if (!decodedToken) {
      return next(new ErrorHandler(401, 'Unauthorized'));
    }
    const uid = decodedToken.uid;
    const userRole = await fetchUserRole(uid);

    if (userRole && admin_roles.includes(userRole.role_id)) {
      next();
    } else {
      return next(new ErrorHandler(401, 'Unauthorized'));
    }
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
