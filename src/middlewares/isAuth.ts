import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebaseConfig';
import { ErrorHandler } from '../utils/ErrorHandler';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
      return next(new ErrorHandler(401, 'Forbidden'));
    }

    const decodedToken = await auth.verifyIdToken(token);
    if (!decodedToken) {
      return next(new ErrorHandler(401, 'Forbidden'));
    }
    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    next(error);
  }
};
