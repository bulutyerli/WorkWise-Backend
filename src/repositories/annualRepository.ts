import { db } from '../database';
import { annualType } from '../types/database.type';

// Function to fetch annual leaves for a specific user
export async function fetchAnnualLeaves(userId: number) {
  return await db
    .selectFrom('annual_requests')
    .selectAll()
    .where('user_id', '=', userId)
    .orderBy('annual_requests.starting_date desc')
    .execute();
}

export async function fetchPendingLeaves() {
  return await db
    .selectFrom('annual_requests')
    .selectAll()
    .where('status', '=', 'pending')
    .orderBy('annual_requests.starting_date desc')
    .execute();
}

// Function to fetch the current year's annual leave for a specific user
export async function fetchCurrentAnnual(userId: number) {
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1);

  return await db
    .selectFrom('annual_requests')
    .selectAll()
    .where('user_id', '=', userId)
    .where('status', '=', 'approved')
    .where('starting_date', '>=', startOfYear)
    .execute();
}

export async function insertAnnualRequest(annualData: annualType) {
  return await db
    .insertInto('annual_requests')
    .values(annualData)
    .executeTakeFirst();
}

export async function deleteAnnualRequest(requestId: number) {
  return await db
    .deleteFrom('annual_requests')
    .where('id', '=', requestId)
    .executeTakeFirst();
}
