import { NextFunction, Request, Response } from 'express';
import {
  expenseCount,
  fetchAllExpenses,
  fetchExpenseById,
  fetchExpenseByMonth,
  fetchExpenseYearly,
  fetchExpensesByCategory,
  fetchExpensesByYear,
} from '../repositories/expensesRepository';
import { ErrorHandler } from '../utils/ErrorHandler';
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
    const expenseData = await fetchExpenseByMonth(year, category);
    res.status(200).json({ success: true, data: expenseData });
  } catch (error) {
    next(error);
  }
}
