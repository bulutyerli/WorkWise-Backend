"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.annualSchema = void 0;
const zod_1 = require("zod");
exports.annualSchema = zod_1.z.object({
    end_date: zod_1.z.date(),
    starting_date: zod_1.z.date(),
    user_id: zod_1.z.number(),
    firebase_id: zod_1.z.string(),
    status: zod_1.z.string(),
    id: zod_1.z.number().optional(),
});
