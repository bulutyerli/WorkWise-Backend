import { NextFunction, Request, Response } from 'express';
import { findStaffById } from '../repositories/staffRepository';
import { ErrorHandler } from '../utils/ErrorHandler';
import jwt from 'jsonwebtoken';
import { decodedType } from '../types/decoded.type';

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

    if (!isUser) {
      return next(new ErrorHandler(401, 'Access Denied. USER'));
    }

    res.locals.user = isUser;

    next();
  } catch (error) {
    next(error);
  }
}
