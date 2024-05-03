import { sql } from 'kysely';
import { db } from '../database';
import { incomeType, updateIncomeType } from '../types/database.type';
import { getIncomeCategories } from './categoryRepository';
import { ErrorHandler } from '../utils/ErrorHandler';

export async function fetchIncomeById(id: number) {
  return await db
    .selectFrom('income')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

export async function fetchIncomeYearly() {
  return await db
    .selectFrom('income')
    .leftJoin('category_income', 'category_income.id', 'income.category')
    .select((eb) =>
      eb.fn('date_part', [sql.lit('year'), eb.ref('date')]).as('year')
    )
    .select((eb) => eb.fn.sum<number>('amount').as('amount'))
    .groupBy('year')
    .orderBy('year')
    .execute();
}

export async function fetchIncomeByCategory(filter?: string) {
  const categoryData = await getIncomeCategories();
  const categoryFilter = Number(filter);

  if (
    categoryFilter &&
    !categoryData.find((cat) => cat.id === categoryFilter)
  ) {
    return new ErrorHandler(404, 'Invalid Category');
  }
  let query = db
    .selectFrom('income')
    .leftJoin('category_income', 'category_income.id', 'income.category')
    .select((eb) =>
      eb.fn('date_part', [sql.lit('year'), eb.ref('date')]).as('year')
    )
    .select((eb) => eb.fn.sum<number>('amount').as('amount'))
    .select('category_income.category')
    .select('category_income.id')
    .groupBy('year')
    .groupBy('category_income.category')
    .groupBy('category_income.id')
    .orderBy('year');

  if (filter) {
    query = query.where('category_income.id', '=', +filter);
  }

  const incomeData = await query.execute();
  return { incomeData, categoryData };
}

export async function addIncome(incomeData: incomeType) {
  await db.insertInto('income').values(incomeData).executeTakeFirst();
}

export async function deleteIncomeById(id: number) {
  return await db
    .deleteFrom('income')
    .where('income.id', '=', id)
    .executeTakeFirst();
}

export async function updateIncomeById(
  id: number,
  incomeData: updateIncomeType
) {
  return await db
    .updateTable('income')
    .set(incomeData)
    .where('id', '=', id)
    .executeTakeFirst();
}
