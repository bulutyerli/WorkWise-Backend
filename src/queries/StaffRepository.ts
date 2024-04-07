import { db } from '../database';

export async function findStaffById(id: number) {
  return await db
    .selectFrom('staff')
    .innerJoin('roles', 'staff.role', 'roles.id')
    .where('staff.id', '=', id)
    .select(['staff.id', 'roles.role_name as role'])
    .executeTakeFirst();
}

export async function fetchAllStaff() {
  return await db
    .selectFrom('staff')
    .innerJoin('departments', 'staff.department_id', 'departments.id')
    .innerJoin('offices', 'staff.office_id', 'offices.id')
    .innerJoin('roles', 'staff.role', 'roles.id')
    .innerJoin('shifts', 'staff.shift_id', 'shifts.id')
    .select([
      'staff.id',
      'staff.name',
      'surname',
      'birthday',
      'phone',
      'salary',
      'join_date',
      'annual_leave',
      'sickness_leave',
      'departments.name as department',
      'offices.name as office',
      'roles.role_name as role',
      'shifts.name as shift',
    ])
    .execute();
}
