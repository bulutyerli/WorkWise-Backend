import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { CompanyDatabase } from './types/types';
const dotenv = require('dotenv');

dotenv.config();

const dialect = new PostgresDialect({
  pool: new Pool({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    max: 10,
  }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<CompanyDatabase>({
  dialect,
});
