import { db } from '../database';

export async function fetchUserRole(firebaseId: string) {
  return await db
    .selectFrom('staff')
    .select(['staff.role_id', 'id'])
    .where('firebase_id', '=', firebaseId)
    .executeTakeFirst();
}
