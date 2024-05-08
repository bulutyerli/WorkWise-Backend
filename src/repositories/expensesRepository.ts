import { sql } from 'kysely';
import { db } from '../database';
import { expensesType, updateExpenseType } from '../types/database.type';
import { getExpensesCategories } from './categoryRepository';
import { FinanceOrderType } from '../types/types';

export async function fetchExpenseById(id: number) {
  return await db
    .selectFrom('expenses')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

export async function fetchAllExpenses(
  offset: number,
  limit: number,
  category?: number,
  sortFilter?: { order: FinanceOrderType; direction: 'asc' | 'desc' }
) {
  let query = db
    .selectFrom('expenses')
    .leftJoin('category_expenses', 'category_expenses.id', 'expenses.category')
    .select([
      'description',
      'amount',
      'date',
      'category_expenses.category as category',
      'expenses.category as category_id',
      'expenses.id',
    ])
    .offset(offset)
    .limit(limit);

  if (sortFilter && sortFilter.order && sortFilter.direction) {
    query = query.orderBy(sortFilter.order, sortFilter.direction);
  } else {
    query.orderBy('description', 'asc');
  }

  if (category) {
    query = query.where('expenses.category', '=', category);
  }

  return await query.execute();
}

export async function fetchExpenseYearly() {
  return await db
    .selectFrom('expenses')
    .leftJoin('category_expenses', 'category_expenses.id', 'expenses.category')
    .select((eb) =>
      eb.fn('date_part', [sql.lit('year'), eb.ref('date')]).as('year')
    )
    .select((eb) => eb.fn.sum<number>('amount').as('amount'))
    .groupBy('year')
    .orderBy('year')
    .execute();
}

export async function fetchExpensesByCategory(category?: string) {
  const categoryData = await getExpensesCategories();

  let query = db
    .selectFrom('expenses')
    .leftJoin('category_expenses', 'category_expenses.id', 'expenses.category')
    .select((eb) =>
      eb.fn('date_part', [sql.lit('year'), eb.ref('date')]).as('year')
    )
    .select((eb) => eb.fn.sum<number>('amount').as('amount'))
    .select('category_expenses.category')
    .select('category_expenses.id')
    .groupBy('year')
    .groupBy('category_expenses.category')
    .groupBy('category_expenses.id')
    .orderBy('year');

  if (category) {
    query = query.where('category_expenses.id', '=', parseInt(category));
  }

  const valuesData = await query.execute();
  return { valuesData, categoryData };
}

export async function fetchExpensesByYear(year?: string) {
  let query = db
    .selectFrom('expenses')
    .leftJoin('category_expenses', 'category_expenses.id', 'expenses.category')
    .select((eb) =>
      eb.fn('date_part', [sql.lit('year'), eb.ref('date')]).as('year')
    )
    .select((eb) => eb.fn.sum<number>('amount').as('amount'))
    .select('category_expenses.category')
    .select('category_expenses.id')
    .groupBy('category_expenses.category')
    .groupBy('category_expenses.id')
    .groupBy('year')
    .orderBy('year');

  if (year) {
    query = query.where(
      (eb) => eb.fn('date_part', [sql.lit('year'), eb.ref('date')]),
      '=',
      parseInt(year)
    );
  }

  return await query.execute();
}

export async function addExpense(expenseData: expensesType) {
  await db.insertInto('expenses').values(expenseData).executeTakeFirst();
}

export async function deleteExpensesById(id: number) {
  return await db
    .deleteFrom('expenses')
    .where('expenses.id', '=', id)
    .executeTakeFirst();
}

export async function updateExpenseById(
  id: number,
  expenseData: updateExpenseType
) {
  return await db
    .updateTable('expenses')
    .set(expenseData)
    .where('id', '=', id)
    .executeTakeFirst();
}

export async function expenseCount(category?: number) {
  let query = db.selectFrom('expenses');

  if (category) {
    query = query.where('category', '=', category);
  }

  return await query
    .select((eb) => eb.fn.count<number>('id').as('total'))
    .execute();
}
