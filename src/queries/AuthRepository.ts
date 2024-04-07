import { db } from '../database';

export async function getCredentialsByEmail(email: string) {
  return await db
    .selectFrom('credentials')
    .where('email', '=', email)
    .selectAll()
    .executeTakeFirst();
}
