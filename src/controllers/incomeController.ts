import { NextFunction, Request, Response } from 'express';
import {
  addIncome,
  deleteIncomeById,
  fetchAllIncome,
  fetchIncomeById,
  updateIncomeById,
} from '../repositories/incomeRepository';
import { ErrorHandler } from '../utils/ErrorHandler';
import { incomeSchema, updateIncomeSchema } from '../schemas/incomeSchema';

export async function getIncomeByID(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);

    const income = await fetchIncomeById(id);
    if (!income) {
      return next(
        new ErrorHandler(404, 'There is no record of this income ID')
      );
    }
    res.status(200).json({ success: true, data: income });
  } catch (error) {
    next(error);
  }
}

export async function getAllIncome(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const allIncomeData = await fetchAllIncome();
    if (!allIncomeData) {
      return next(
        new ErrorHandler(404, 'Something went wrong while taking data')
      );
    }

    res.status(200).json({ success: true, data: allIncomeData });
  } catch (error) {
    next(error);
  }
}

export async function addIncomeData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const incomeData = incomeSchema.parse(req.body);

    await addIncome(incomeData);

    res
      .status(200)
      .json({ success: true, message: 'Income data successfully added' });
  } catch (error) {
    next(error);
  }
}

export async function deleteIncomeData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    await deleteIncomeById(id);

    res
      .status(200)
      .json({ success: true, message: 'Income data successfully deleted' });
  } catch (error) {
    next(error);
  }
}

export async function updateIncomeData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const updateData = updateIncomeSchema.parse(req.body);

    await updateIncomeById(id, updateData);

    res
      .status(200)
      .json({ success: true, message: 'Income data successfully updated' });
  } catch (error) {
    next(error);
  }
}
