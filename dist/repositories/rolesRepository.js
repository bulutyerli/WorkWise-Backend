"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchHierarchy = void 0;
const database_1 = require("../database");
function fetchHierarchy() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .selectFrom('staff')
            .leftJoin('roles', 'roles.id', 'staff.role_id')
            .leftJoin('shifts', 'shifts.id', 'staff.shift_id')
            .leftJoin('offices', 'staff.office_id', 'offices.id')
            .leftJoin('departments', 'departments.id', 'staff.department_id')
            .select([
            'staff.id',
            'staff.name as name',
            'staff.surname',
            'roles.name as role_name',
            'staff.manager_id as parentId',
            'shifts.name as shift',
            'offices.name as office',
            'departments.name as department',
        ])
            .execute();
    });
}
exports.fetchHierarchy = fetchHierarchy;
