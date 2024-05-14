import { Request, Response, NextFunction } from 'express';
import { firebase } from '../config/firebaseConfig';

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.authorization?.split(' ')[1];

  try {
    if (!token) {
      throw new Error('Unauthorized');
    }

    const decodedToken = await firebase.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    console.log(uid);

    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};
