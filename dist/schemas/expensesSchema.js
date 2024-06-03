"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExpenseSchema = exports.expensesSchema = void 0;
const zod_1 = require("zod");
exports.expensesSchema = zod_1.z.object({
    description: zod_1.z.string().min(3).max(50),
    amount: zod_1.z.number().min(1),
    user_id: zod_1.z.number(),
    date: zod_1.z.coerce.date(),
    category: zod_1.z.number(),
});
exports.updateExpenseSchema = zod_1.z.object({
    description: zod_1.z.string().min(3).max(50).optional(),
    amount: zod_1.z.number().min(1).optional(),
    user_id: zod_1.z.number().optional(),
    date: zod_1.z.coerce.date().optional(),
    category: zod_1.z.number().optional(),
});
