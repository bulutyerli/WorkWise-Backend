import { NextFunction, Request, Response } from 'express';
import {
  addExpense,
  deleteExpensesById,
  expenseCount,
  fetchAllExpenses,
  fetchExpenseById,
  fetchExpenseByMonth,
  fetchExpenseYearly,
  fetchExpensesByCategory,
  fetchExpensesByYear,
  updateExpenseById,
} from '../repositories/expensesRepository';
import { ErrorHandler } from '../utils/ErrorHandler';
import { expensesSchema, updateExpenseSchema } from '../schemas/expensesSchema';
import { FinanceOrderType } from '../types/types';
import { getExpensesCategories } from '../repositories/categoryRepository';

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
    const limit = 15;
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * limit;
    const category = parseInt(req.query.category as string);
    const [{ total }] = await expenseCount(category);
    const totalPages = Math.ceil(total / limit);
    const sortFilter = {
      order: req.query.order as FinanceOrderType,
      direction: req.query.direction as 'asc' | 'desc',
    };

    const categories = await getExpensesCategories();

    const allIncomeData = await fetchAllExpenses(
      offset,
      limit,
      category,
      sortFilter
    );

    const hasMore = page < totalPages;

    res.status(200).json({
      success: true,
      totalPages,
      categories,
      hasMore,
      data: allIncomeData,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllExpensesTotal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const allExpenseData = await fetchExpenseYearly();
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

export async function getExpensesByCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryParam = req.query.category as string | undefined;
    const category = categoryParam || '1';

    const expenseData = await fetchExpensesByCategory(category);
    console.log(expenseData);
    res.status(200).json({ success: true, data: expenseData });
  } catch (error) {
    next(error);
  }
}

export async function getExpensesByYear(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const yearParam = req.query.year as string | undefined;
    const year = yearParam || '2023';
    const expenseData = await fetchExpensesByYear(year);

    res.status(200).json({ success: true, data: expenseData });
  } catch (error) {
    next(error);
  }
}

export async function getExpenseByMonth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const yearParam = req.query.year as string | undefined;
    const categoryParam = req.query.category as number | undefined;
    const year = yearParam || '2023';
    const category = categoryParam || 1;
    const incomeData = await fetchExpenseByMonth(year, category);
    res.status(200).json({ success: true, data: incomeData });
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
