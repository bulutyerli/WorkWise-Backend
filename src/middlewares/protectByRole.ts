import { NextFunction, Response, Request } from 'express';
import { ErrorHandler } from '../utils/ErrorHandler';

export function protectByRole(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(res.locals.user.role)) {
      return next(
        new ErrorHandler(403, 'You do not have permission to do this.')
      );
    }
    next();
  };
}
