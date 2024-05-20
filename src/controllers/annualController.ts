import { NextFunction, Request, Response } from 'express';
import {
  fetchAnnualLeaves,
  fetchCurrentAnnual,
} from '../repositories/annualRepository';
import { ErrorHandler } from '../utils/ErrorHandler';
import { totalAnnualLeave } from '../utils/totalAnnualLeave';

export async function getAnnualLeaves(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const staffId = req.params.id;

    if (!staffId) {
      return next(new ErrorHandler(400, 'No id given'));
    }

    const annualLeaves = await fetchAnnualLeaves(Number(staffId));

    if (!annualLeaves) {
      return next(new ErrorHandler(404, 'Annual leave not found'));
    }

    if (annualLeaves.length === 0) {
      return res.status(200).json({ data: [] });
    }

    res.status(200).json({ data: annualLeaves });
  } catch (error) {
    next(error);
  }
}

export async function getCurrentAnnual(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const staffId = req.params.id;
    const allowed_annual = 20;

    if (!staffId) {
      return next(new ErrorHandler(400, 'No id given'));
    }

    const annualLeave = await fetchCurrentAnnual(Number(staffId));

    if (!annualLeave) {
      return next(new ErrorHandler(404, 'Annual leave not found'));
    }
    if (annualLeave.length === 0) {
      return res.status(200).json({ data: [] });
    }

    const totalAnnual = allowed_annual - totalAnnualLeave(annualLeave);

    res.status(200).json({ data: totalAnnual });
  } catch (error) {
    next(error);
  }
}
