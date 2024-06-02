import { NextFunction, Request, Response } from 'express';
import {
  answerAnnualRequest,
  deleteAnnualRequest,
  fetchAnnualLeaves,
  fetchCurrentAnnual,
  fetchEmployeeAnnualRequests,
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

    const annualLeaves = await fetchAnnualLeaves(Number(staffId));

    if (!annualLeaves) {
      return next(new ErrorHandler(404, 'Annual leave not found'));
    }

    if (annualLeaves.length === 0) {
      return res.status(200).json([]);
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

    const annualLeave = await fetchCurrentAnnual(Number(staffId));

    if (!annualLeave) {
      return next(new ErrorHandler(404, 'Annual leave not found'));
    }
    if (annualLeave.length === 0) {
      return res.status(200).json(20);
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
    const { firebase_id, starting_date, end_date, user_id } = req.body;

    const validatedData = annualSchema.parse({
      user_id,
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

export async function deleteRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const requestId = req.query.requestId;

    await deleteAnnualRequest(Number(requestId));

    res.status(204).send();
  } catch (error) {}
}

export async function getStaffAnnualRequests(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const managerId = req.query.managerId;

    const annualRequests = await fetchEmployeeAnnualRequests(Number(managerId));

    if (annualRequests.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(annualRequests);
  } catch (error) {
    next(error);
  }
}

export async function requestAnswer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { requestId, status } = req.body;

    console.log('Started now');
    if (!status || !requestId) {
      return next(new ErrorHandler(400, 'Status or ID not provided'));
    }

    await answerAnnualRequest(Number(requestId), status);

    res.status(200).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
}
