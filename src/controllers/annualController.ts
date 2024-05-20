import { NextFunction, Request, Response } from 'express';
import {
  fetchAnnualLeaves,
  fetchCurrentAnnual,
  insertAnnualRequest,
} from '../repositories/annualRepository';
import { ErrorHandler } from '../utils/ErrorHandler';
import { totalAnnualLeave } from '../utils/totalAnnualLeave';
import { annualSchema } from '../schemas/annualSchema';

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

    const annualLeaves = await fetchAnnualLeaves(staffId);

    if (!annualLeaves) {
      return next(new ErrorHandler(404, 'Annual leave not found'));
    }

    if (annualLeaves.length === 0) {
      return res.status(200).json({ data: [] });
    }

    res.status(200).json(annualLeaves);
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

    const annualLeave = await fetchCurrentAnnual(staffId);

    if (!annualLeave) {
      return next(new ErrorHandler(404, 'Annual leave not found'));
    }
    if (annualLeave.length === 0) {
      return res.status(200).json({ data: [] });
    }

    const totalAnnual = allowed_annual - totalAnnualLeave(annualLeave);

    res.status(200).json(totalAnnual);
  } catch (error) {
    next(error);
  }
}

export async function makeNewAnnualRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { firebase_id, starting_date, end_date } = req.body;

    console.log(firebase_id, starting_date, end_date);

    const validatedData = annualSchema.parse({
      firebase_id,
      starting_date: new Date(starting_date),
      end_date: new Date(end_date),
      status: 'pending',
    });

    await insertAnnualRequest(validatedData);

    res
      .status(201)
      .json({ success: true, message: 'Annual request created successfully' });
  } catch (error) {
    next(error);
  }
}