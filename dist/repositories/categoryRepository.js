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
exports.getAllManagers = exports.getExpensesCategories = exports.getIncomeCategories = exports.getDepartments = exports.getShifts = exports.getRoles = exports.getOffices = void 0;
const database_1 = require("../database");
function getOffices() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db.selectFrom('offices').selectAll().execute();
    });
}
exports.getOffices = getOffices;
function getRoles() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db.selectFrom('roles').selectAll().execute();
    });
}
exports.getRoles = getRoles;
function getShifts() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db.selectFrom('shifts').selectAll().execute();
    });
}
exports.getShifts = getShifts;
function getDepartments() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db.selectFrom('departments').selectAll().execute();
    });
}
exports.getDepartments = getDepartments;
function getIncomeCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db.selectFrom('category_income').selectAll().execute();
    });
}
exports.getIncomeCategories = getIncomeCategories;
function getExpensesCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db.selectFrom('category_expenses').selectAll().execute();
    });
}
exports.getExpensesCategories = getExpensesCategories;
function getAllManagers() {
    return __awaiter(this, void 0, void 0, function* () {
        const roles = [1, 2, 3, 4, 5, 9, 12, 19, 20, 21, 22, 23];
        return yield database_1.db
            .selectFrom('staff')
            .leftJoin('roles', 'roles.id', 'staff.role_id')
            .leftJoin('shifts', 'shifts.id', 'staff.shift_id')
            .leftJoin('offices', 'offices.id', 'staff.office_id')
            .select([
            'roles.name as role_name',
            'staff.name',
            'staff.surname',
            'staff.id',
            'shifts.name as shift',
            'offices.name as office',
        ])
            .where('staff.role_id', 'in', roles)
            .orderBy('manager_id', 'desc')
            .execute();
    });
}
exports.getAllManagers = getAllManagers;
