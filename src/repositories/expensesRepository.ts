import { db } from '../database';
import { expensesType, updateExpenseType } from '../types/database.type';

export async function fetchExpenseById(id: number) {
  return await db
    .selectFrom('expenses')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

export async function fetchAllExpenses() {
  return await db.selectFrom('expenses').selectAll().executeTakeFirst();
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
