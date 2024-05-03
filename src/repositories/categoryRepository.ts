import { db } from '../database';

export async function getOffices() {
  return await db.selectFrom('offices').select('name').execute();
}

export async function getRoles() {
  return await db.selectFrom('roles').select('name').execute();
}

export async function getShifts() {
  return await db.selectFrom('shifts').select('name').execute();
}

export async function getDepartments() {
  return await db.selectFrom('departments').select('name').execute();
}

export async function getIncomeCategories() {
  return await db.selectFrom('category_income').selectAll().execute();
}

export async function getExpensesCategories() {
  return await db.selectFrom('category_expenses').selectAll().execute();
}
