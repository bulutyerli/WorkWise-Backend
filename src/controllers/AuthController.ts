import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../utils/ErrorHandler';
import { getCredentialsByEmail } from '../repositories/authRepository';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorHandler(400, 'Please write your email and password.')
      );
    }

    const user = await getCredentialsByEmail(email);
    if (user) {
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        return next(new ErrorHandler(401, 'Username or password is wrong.'));
      }
      const token = jwt.sign(
        { id: user.user_id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );
      res.status(200).json({
        success: true,
        token,
      });
    } else {
      return next(new ErrorHandler(404, 'Email or password is wrong.'));
    }
  } catch (error) {
    next(error);
  }
}
