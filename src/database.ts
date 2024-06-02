import { CompanyDatabase } from './types/types';
import { createKysely } from '@vercel/postgres-kysely';

export const db = createKysely<CompanyDatabase>();
