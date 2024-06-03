"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const kysely_1 = require("kysely");
const dialect = new kysely_1.PostgresDialect({
    pool: new pg_1.Pool({
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        max: 1,
    }),
});
exports.db = new kysely_1.Kysely({
    dialect,
});
