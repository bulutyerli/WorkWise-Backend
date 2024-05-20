import { db } from '../database';

// Function to fetch annual leaves for a specific user
export async function fetchAnnualLeaves(userId: number) {
  return await db
    .selectFrom('annual_requests')
    .selectAll()
    .where('user_id', '=', userId)
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
