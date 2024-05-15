import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../utils/ErrorHandler';

const errorDev = (err: Error, res: Response) => {
  console.log(err);

  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({
      success: err.success,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err,
    stack: err.stack,
  });
};

const errorProd = (err: Error, res: Response) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({
      success: err.success,
      message: err.message,
    });
  } else {
    console.log('Error', err);
    return res
      .status(500)
      .json({ success: false, message: 'Something went wrong.' });
  }
};

export const globalError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === 'development') {
    errorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    errorProd(err, res);
  }
};
