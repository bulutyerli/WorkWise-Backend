"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIncomeSchema = exports.incomeSchema = void 0;
const zod_1 = require("zod");
exports.incomeSchema = zod_1.z.object({
    description: zod_1.z.string().min(3).max(50),
    amount: zod_1.z.number().min(1),
    date: zod_1.z.coerce.date(),
    category: zod_1.z.number(),
});
exports.updateIncomeSchema = zod_1.z.object({
    description: zod_1.z.string().min(3).max(50).optional(),
    amount: zod_1.z.number().min(1).optional(),
    date: zod_1.z.coerce.date().optional(),
    category: zod_1.z.number().optional(),
});
