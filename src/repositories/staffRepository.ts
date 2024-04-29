import { db } from '../database';
import { staffType, updateStaffType } from '../types/database.type';

export async function findStaffById(id: number) {
  return await db
    .selectFrom('staff')
    .leftJoin('departments', 'staff.department_id', 'departments.id')
    .leftJoin('offices', 'staff.office_id', 'offices.id')
    .leftJoin('roles', 'staff.role', 'roles.id')
    .leftJoin('shifts', 'staff.shift_id', 'shifts.id')
    .leftJoin('credentials', 'credentials.user_id', 'staff.id')
    .where('staff.id', '=', id)
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
      'roles.name as role',
      'shifts.name as shift',
      'credentials.email as email',
    ])
    .executeTakeFirst();
}

export async function fetchAllStaff(
  offset: number,
  limit: number,
  filters?: Record<string, string | null>
) {
  let query = db
    .selectFrom('staff')
    .leftJoin('departments', 'staff.department_id', 'departments.id')
    .leftJoin('offices', 'staff.office_id', 'offices.id')
    .leftJoin('roles', 'staff.role', 'roles.id')
    .leftJoin('shifts', 'staff.shift_id', 'shifts.id')
    .leftJoin('credentials', 'credentials.user_id', 'staff.id')
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
      'roles.name as role',
      'shifts.name as shift',
      'credentials.email as email',
    ])
    .limit(limit)
    .offset(offset);

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'All') {
        if (key === 'offices') {
          query = query.where('offices.name', '=', value);
        } else if (key === 'roles') {
          query = query.where('roles.name', '=', value);
        } else if (key === 'departments') {
          query = query.where('departments.name', '=', value);
        } else if (key === 'shifts') {
          query = query.where('shifts.name', '=', value);
        }
      }
    });
  }

  return await query.execute();
}

export async function countStaff(filters?: Record<string, string | null>) {
  let query = db
    .selectFrom('staff')
    .leftJoin('departments', 'staff.department_id', 'departments.id')
    .leftJoin('offices', 'staff.office_id', 'offices.id')
    .leftJoin('roles', 'staff.role', 'roles.id')
    .leftJoin('shifts', 'staff.shift_id', 'shifts.id');
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'All') {
        if (key === 'offices') {
          query = query.where('offices.name', '=', value);
        } else if (key === 'roles') {
          query = query.where('roles.name', '=', value);
        } else if (key === 'departments') {
          query = query.where('departments.name', '=', value);
        } else if (key === 'shifts') {
          query = query.where('shifts.name', '=', value);
        }
      }
    });
  }

  return await query
    .select((eb) => eb.fn.count<number>('staff.id').as('total_staff'))
    .execute();
}

export async function insertStaff(staffData: staffType) {
  await db.insertInto('staff').values(staffData).executeTakeFirst();
}

export async function deleteStaffById(id: number) {
  return await db
    .deleteFrom('staff')
    .where('staff.id', '=', id)
    .executeTakeFirst();
}

export async function updateStaffById(id: number, staffData: updateStaffType) {
  return await db
    .updateTable('staff')
    .set(staffData)
    .where('id', '=', id)
    .executeTakeFirst();
}
