import { sql } from 'kysely';
import { db } from '../database';
import { staffType, updateStaffType } from '../types/database.type';
import { OrderType, StaffDatesTable } from '../types/types';

export async function findStaffById(id: number) {
  return await db
    .selectFrom('staff')
    .leftJoin('departments', 'staff.department_id', 'departments.id')
    .leftJoin('offices', 'staff.office_id', 'offices.id')
    .leftJoin('roles', 'staff.role_id', 'roles.id')
    .leftJoin('shifts', 'staff.shift_id', 'shifts.id')
    .where('staff.id', '=', id)
    .select([
      'staff.id',
      'staff.name',
      'surname',
      'birthday',
      'phone',
      'salary',
      'join_date',
      'departments.name as department',
      'department_id as department_id',
      'offices.name as office',
      'office_id as office_id',
      'roles.name as role',
      'roles.id as role_id',
      'shifts.name as shift',
      'shifts.id as shift_id',
      'manager_id as manager_id',
      'email',
    ])
    .executeTakeFirst();
}

export async function fetchAllStaff(
  offset: number,
  limit: number,
  filters?: Record<string, string | null>,
  sortFilter?: { order: OrderType; direction: 'asc' | 'desc' }
) {
  let query = db
    .selectFrom('staff')
    .leftJoin('departments', 'staff.department_id', 'departments.id')
    .leftJoin('offices', 'staff.office_id', 'offices.id')
    .leftJoin('roles', 'staff.role_id', 'roles.id')
    .leftJoin('shifts', 'staff.shift_id', 'shifts.id')
    .select([
      'staff.id as id',
      'staff.name',
      'surname',
      'birthday',
      'phone',
      'salary',
      'join_date',
      'departments.name as department',
      'offices.name as office',
      'roles.name as role',
      'shifts.name as shift',
      'email',
    ])
    .limit(limit)
    .offset(offset);

  if (sortFilter && sortFilter.order && sortFilter.direction) {
    query = query.orderBy(sortFilter.order, sortFilter.direction);
  } else {
    query = query.orderBy('name', 'asc');
  }

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
    .leftJoin('roles', 'staff.role_id', 'roles.id')
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

export async function getStaffUid(id: number) {
  return await db
    .selectFrom('staff')
    .select('firebase_id')
    .where('staff.id', '=', id)
    .executeTakeFirst();
}

export async function fetchCurrentBirthdays(
  currentMonth: number,
  birthdayWeek: number[]
) {
  return await db
    .selectFrom('staff')
    .leftJoin('departments', 'staff.department_id', 'departments.id')
    .leftJoin('offices', 'staff.office_id', 'offices.id')
    .leftJoin('roles', 'staff.role_id', 'roles.id')

    .select([
      'staff.id',
      'birthday',
      'staff.name',
      'staff.surname',
      'roles.name as role',
      'departments.name as department',
      'offices.name as office',
    ])
    .where(
      (eb) => eb.fn('date_part', [sql.lit('month'), eb.ref('birthday')]),
      '=',
      currentMonth
    )
    .where(
      (eb) => eb.fn('date_part', [sql.lit('day'), eb.ref('birthday')]),
      'in',
      birthdayWeek
    )
    .orderBy(
      (eb) => eb.fn('date_part', [sql.lit('day'), eb.ref('birthday')]),
      'asc'
    )
    .execute();
}

export async function fetchNewJoins() {
  const date = new Date();
  const currentYear = date.getFullYear();
  return await db
    .selectFrom('staff')
    .leftJoin('departments', 'staff.department_id', 'departments.id')
    .leftJoin('offices', 'staff.office_id', 'offices.id')
    .leftJoin('roles', 'staff.role_id', 'roles.id')
    .select([
      'staff.id',
      'join_date',
      'staff.name',
      'staff.surname',
      'roles.name as role',
      'departments.name as department',
      'offices.name as office',
    ])
    .where(
      (eb) => eb.fn('date_part', [sql.lit('year'), eb.ref('join_date')]),
      '=',
      currentYear
    )
    .orderBy('join_date')
    .execute();
}
