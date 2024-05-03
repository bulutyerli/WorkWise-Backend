import { sql } from 'kysely';
import { db } from '../database';
import { expensesType, updateExpenseType } from '../types/database.type';
import { getExpensesCategories } from './categoryRepository';
import { ErrorHandler } from '../utils/ErrorHandler';

export async function fetchExpenseById(id: number) {
  return await db
    .selectFrom('expenses')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

export async function fetchExpensesByYear() {
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

export async function fetchExpensesByCategory(filter?: string) {
  const categoryData = await getExpensesCategories();
  const categoryFilter = Number(filter);

  if (
    categoryFilter &&
    !categoryData.find((cat) => cat.id === categoryFilter)
  ) {
    return new ErrorHandler(404, 'Invalid Category');
  }
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

  if (filter) {
    query = query.where('category_expenses.id', '=', +filter);
  }

  const incomeData = await query.execute();
  return { incomeData, categoryData };
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
