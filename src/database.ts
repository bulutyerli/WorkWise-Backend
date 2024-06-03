import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { CompanyDatabase } from './types/types';

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    max: 1,
  }),
});

export const db = new Kysely<CompanyDatabase>({
  dialect,
});
