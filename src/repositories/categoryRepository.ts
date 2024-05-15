import { db } from '../database';

export async function getOffices() {
  return await db.selectFrom('offices').selectAll().execute();
}

export async function getRoles() {
  return await db.selectFrom('roles').selectAll().execute();
}

export async function getShifts() {
  return await db.selectFrom('shifts').selectAll().execute();
}

export async function getDepartments() {
  return await db.selectFrom('departments').selectAll().execute();
}

export async function getIncomeCategories() {
  return await db.selectFrom('category_income').selectAll().execute();
}

export async function getExpensesCategories() {
  return await db.selectFrom('category_expenses').selectAll().execute();
}

export async function getAllManagers() {
  const roles = [1, 2, 3, 4, 5, 9, 12, 19, 20, 21, 22, 23];
  return await db
    .selectFrom('staff')
    .leftJoin('roles', 'roles.id', 'staff.role')
    .leftJoin('shifts', 'shifts.id', 'staff.shift_id')
    .leftJoin('offices', 'offices.id', 'staff.office_id')
    .select([
      'roles.name as role_name',
      'staff.name',
      'staff.surname',
      'staff.id',
      'shifts.name as shift',
      'offices.name as office',
    ])
    .where('staff.role', 'in', roles)
    .orderBy('manager_id', 'desc')
    .execute();
}
