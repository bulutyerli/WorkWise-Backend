import { NextFunction, Request, Response } from 'express';
import {
  addExpense,
  deleteExpensesById,
  fetchExpenseById,
  fetchExpensesByYear,
  updateExpenseById,
} from '../repositories/expensesRepository';
import { ErrorHandler } from '../utils/ErrorHandler';
import { expensesSchema, updateExpenseSchema } from '../schemas/expensesSchema';

export async function getExpenseById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);

    const expense = await fetchExpenseById(id);
    if (!expense) {
      return next(
        new ErrorHandler(404, 'There is no record of this income ID')
      );
    }
    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    next(error);
  }
}

export async function getAllExpenses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const allExpenseData = await fetchExpensesByYear();
    if (!allExpenseData) {
      return next(
        new ErrorHandler(404, 'Something went wrong while taking data')
      );
    }

    res.status(200).json({ success: true, data: allExpenseData });
  } catch (error) {
    next(error);
  }
}

export async function addExpenseData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const expenseData = expensesSchema.parse(req.body);

    await addExpense(expenseData);

    res
      .status(200)
      .json({ success: true, message: 'Expense data successfully added' });
  } catch (error) {
    next(error);
  }
}

export async function deleteExpenseData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    await deleteExpensesById(id);

    res
      .status(200)
      .json({ success: true, message: 'Expense data successfully deleted' });
  } catch (error) {
    next(error);
  }
}

export async function updateExpenseData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const updateData = updateExpenseSchema.parse(req.body);

    await updateExpenseById(id, updateData);

    res
      .status(200)
      .json({ success: true, message: 'Expense data successfully updated' });
  } catch (error) {
    next(error);
  }
}
