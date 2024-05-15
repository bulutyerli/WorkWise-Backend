import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebaseConfig';
import { ErrorHandler } from '../utils/ErrorHandler';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization?.split(' ')[1];

  try {
    if (!token) {
      return next(new ErrorHandler(404, 'No token provided'));
    }

    const decodedToken = await auth.verifyIdToken(token);

    if (!decodedToken) {
      return next(new ErrorHandler(401, 'Unauthorized'));
    }
    const uid = decodedToken.uid;

    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
