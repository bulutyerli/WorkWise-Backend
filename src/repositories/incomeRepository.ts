import { sql } from 'kysely';
import { db } from '../database';
import { incomeType, updateIncomeType } from '../types/database.type';
import { getIncomeCategories } from './categoryRepository';
import { FinanceOrderType } from '../types/types';

export async function fetchIncomeById(id: number) {
  return await db
    .selectFrom('income')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

export async function fetchAllIncome(
  offset: number,
  limit: number,
  category?: number,
  sortFilter?: { order: FinanceOrderType; direction: 'asc' | 'desc' }
) {
  let query = db
    .selectFrom('income')
    .leftJoin('category_income', 'category_income.id', 'income.category')
    .select([
      'description',
      'amount',
      'date',
      'category_income.category as category',
      'income.category as category_id',
      'income.id',
    ])
    .offset(offset)
    .limit(limit);

  if (sortFilter && sortFilter.order && sortFilter.direction) {
    query = query.orderBy(sortFilter.order, sortFilter.direction);
  } else {
    query.orderBy('description', 'asc');
  }

  if (category) {
    query = query.where('income.category', '=', category);
  }

  return await query.execute();
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

export async function fetchIncomeByCategory(category?: string) {
  const categoryData = await getIncomeCategories();

  let query = db
    .selectFrom('income')
    .leftJoin('category_income', 'category_income.id', 'income.category')
    .select([
      (eb) => eb.fn('date_part', [sql.lit('year'), eb.ref('date')]).as('year'),
      (eb) => eb.fn.sum<number>('amount').as('amount'),
      'category_income.category',
      'category_income.id',
    ])
    .groupBy(['year', 'category_income.category', 'category_income.id'])
    .orderBy('year');

  if (category) {
    query = query.where('category_income.id', '=', parseInt(category));
  }

  const valuesData = await query.execute();
  return { valuesData, categoryData };
}

export async function fetchIncomeByYear(year?: string) {
  let query = db
    .selectFrom('income')
    .leftJoin('category_income', 'category_income.id', 'income.category')
    .select([
      (eb) => eb.fn('date_part', [sql.lit('year'), eb.ref('date')]).as('year'),
      (eb) => eb.fn.sum<number>('amount').as('amount'),
      'category_income.category',
      'category_income.id',
    ])
    .groupBy(['category_income.category', 'category_income.id', 'year'])
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

export async function fetchIncomeByMonth(year?: string, category?: number) {
  let query = db
    .selectFrom('income')
    .leftJoin('category_income', 'category_income.id', 'income.category')
    .select([
      (eb) => eb.fn('date_part', [sql.lit('year'), eb.ref('date')]).as('year'),
      (eb) =>
        eb.fn('date_part', [sql.lit('month'), eb.ref('date')]).as('month'),
      'income.amount',
      'category_income.category',
      'category_income.id',
    ])
    .groupBy([
      'category_income.category',
      'category_income.id',
      'month',
      'year',
      'month',
      'amount',
    ])
    .orderBy('year')
    .orderBy('month');

  if (category) {
    query = query.where('income.category', '=', category);
  }

  if (year) {
    query = query.where(
      (eb) => eb.fn('date_part', [sql.lit('year'), eb.ref('date')]),
      '=',
      parseInt(year)
    );
  }

  return await query.execute();
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

export async function incomeCount(category?: number) {
  let query = db.selectFrom('income');

  if (category) {
    query = query.where('category', '=', category);
  }

  return await query
    .select((eb) => eb.fn.count<number>('id').as('total'))
    .execute();
}
