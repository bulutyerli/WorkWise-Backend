import { NextFunction, Request, Response } from 'express';
import {
  fetchIncomeYearly,
  fetchIncomeById,
  fetchIncomeByCategory,
  fetchIncomeByYear,
  fetchAllIncome,
  incomeCount,
  fetchIncomeByMonth,
} from '../repositories/incomeRepository';
import { ErrorHandler } from '../utils/ErrorHandler';
import { FinanceOrderType } from '../types/types';
import { getIncomeCategories } from '../repositories/categoryRepository';

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
    const limit = 15;
    const page = parseInt(req.query.page as string) || 1;
    const offset = (page - 1) * limit;
    const category = parseInt(req.query.category as string);
    const [{ total }] = await incomeCount(category);
    const totalPages = Math.ceil(total / limit);
    const sortFilter = {
      order: req.query.order as FinanceOrderType,
      direction: req.query.direction as 'asc' | 'desc',
    };

    const categories = await getIncomeCategories();

    if (!categories) {
      return next(new ErrorHandler(404, 'No categories found.'));
    }

    const allIncomeData = await fetchAllIncome(
      offset,
      limit,
      category,
      sortFilter
    );

    if (!allIncomeData) {
      return next(new ErrorHandler(404, 'No income data found.'));
    }

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

export async function getAllIncomeTotal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const allIncomeData = await fetchIncomeYearly();
    if (!allIncomeData) {
      return next(new ErrorHandler(404, 'No income data found.'));
    }

    res.status(200).json({ success: true, data: allIncomeData });
  } catch (error) {
    next(error);
  }
}

export async function getIncomeByCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryParam = req.query.category as string | undefined;
    const category = categoryParam || '1';

    const incomeData = await fetchIncomeByCategory(category);

    if (!incomeData) {
      return next(new ErrorHandler(404, 'No income data found'));
    }

    res.status(200).json({ success: true, data: incomeData });
  } catch (error) {
    next(error);
  }
}

export async function getIncomeByYear(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const yearParam = req.query.year as string | undefined;
    const year = yearParam || '2023';
    const incomeData = await fetchIncomeByYear(year);

    res.status(200).json({ success: true, data: incomeData });
  } catch (error) {
    next(error);
  }
}

export async function getIncomeByMonth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const yearParam = req.query.year as string | undefined;
    const categoryParam = req.query.category as number | undefined;
    const year = yearParam || '2023';
    const category = categoryParam || 1;
    const incomeData = await fetchIncomeByMonth(year, category);

    res.status(200).json({ success: true, data: incomeData });
  } catch (error) {
    next(error);
  }
}
