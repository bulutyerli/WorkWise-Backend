import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../utils/ErrorHandler';
import { getCredentialsByEmail } from '../repositories/authRepository';
import { findStaffById } from '../repositories/staffRepository';

interface decodedType {
  id: number;
  iat: number;
  exp: number;
}

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

export async function protect(req: Request, res: Response, next: NextFunction) {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new ErrorHandler(401, 'Access Denied.'));
    }

    const secret = process.env.JWT_SECRET;
    // promisify token, secret
    const jwtVerifyPromisified = async (token: string, secret: string) => {
      return new Promise((resolve, reject) => {
        jwt.verify(token, secret, {}, (err, payload) => {
          if (err) {
            reject(err);
          } else {
            resolve(payload);
          }
        });
      });
    };

    const decoded = (await jwtVerifyPromisified(
      token,
      secret as string
    )) as decodedType;

    const isUser = await findStaffById(decoded.id); // check user still exist
    console.log(isUser);

    if (!isUser) {
      return next(new ErrorHandler(401, 'Access Denied. USER'));
    }

    res.locals.user = isUser;
    next();
  } catch (error) {
    next(error);
  }
}

export async function protectRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(res.locals.user.role)) {
      return next(
        new ErrorHandler(403, 'You do not have permission to do this.')
      );
    }
  };
}
