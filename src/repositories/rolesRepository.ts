import { db } from '../database';

export async function fetchHierarchy() {
  return await db
    .selectFrom('staff')
    .leftJoin('roles', 'roles.id', 'staff.role')
    .leftJoin('shifts', 'shifts.id', 'staff.shift_id')
    .leftJoin('offices', 'staff.office_id', 'offices.id')
    .leftJoin('departments', 'departments.id', 'staff.department_id')
    .select([
      'staff.id',
      'staff.name as name',
      'staff.surname',
      'roles.name as role_name',
      'staff.manager_id as parentId',
      'shifts.name as shift',
      'offices.name as office',
      'departments.name as department',
    ])
    .execute();
}
