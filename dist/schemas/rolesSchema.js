"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesSchema = void 0;
const zod_1 = require("zod");
exports.rolesSchema = zod_1.z.object({
    name: zod_1.z.string(),
});
