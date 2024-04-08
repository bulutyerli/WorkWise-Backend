import { db } from '../database';
import { incomeType, updateIncomeType } from '../types/database.type';

export async function fetchIncomeById(id: number) {
  return await db
    .selectFrom('income')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

export async function fetchAllIncome() {
  return await db.selectFrom('income').selectAll().executeTakeFirst();
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
