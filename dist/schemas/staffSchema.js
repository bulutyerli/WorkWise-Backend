"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffUpdateSchema = exports.staffSchema = void 0;
const zod_1 = require("zod");
exports.staffSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(30),
    surname: zod_1.z.string().min(3).max(30),
    birthday: zod_1.z.coerce.date(),
    phone: zod_1.z.string().min(1).max(50),
    salary: zod_1.z.number().positive(),
    join_date: zod_1.z.coerce.date(),
    department_id: zod_1.z.number(),
    office_id: zod_1.z.number(),
    role_id: zod_1.z.number(),
    shift_id: zod_1.z.nullable(zod_1.z.number()),
    manager_id: zod_1.z.nullable(zod_1.z.number()),
    firebase_id: zod_1.z.string(),
    email: zod_1.z.string().min(1).max(100),
});
exports.staffUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(30).optional(),
    surname: zod_1.z.string().min(3).max(30).optional(),
    birthday: zod_1.z.coerce.date().optional(),
    phone: zod_1.z.string().min(1).max(50).optional(),
    salary: zod_1.z.number().positive().optional(),
    join_date: zod_1.z.coerce.date().optional(),
    department_id: zod_1.z.number().optional(),
    office_id: zod_1.z.number().optional(),
    role_id: zod_1.z.number().optional(),
    shift_id: zod_1.z.nullable(zod_1.z.number()).optional(),
    manager_id: zod_1.z.nullable(zod_1.z.number()),
});
