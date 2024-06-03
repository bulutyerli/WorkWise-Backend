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
exports.fetchNewJoins = exports.fetchCurrentBirthdays = exports.getStaffUid = exports.updateStaffById = exports.deleteStaffById = exports.insertStaff = exports.countStaff = exports.fetchAllStaff = exports.findStaffById = void 0;
const kysely_1 = require("kysely");
const database_1 = require("../database");
function findStaffById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .selectFrom('staff')
            .leftJoin('departments', 'staff.department_id', 'departments.id')
            .leftJoin('offices', 'staff.office_id', 'offices.id')
            .leftJoin('roles', 'staff.role_id', 'roles.id')
            .leftJoin('shifts', 'staff.shift_id', 'shifts.id')
            .where('staff.id', '=', id)
            .select([
            'staff.id',
            'staff.name',
            'surname',
            'birthday',
            'phone',
            'salary',
            'join_date',
            'departments.name as department',
            'department_id as department_id',
            'offices.name as office',
            'office_id as office_id',
            'roles.name as role',
            'roles.id as role_id',
            'shifts.name as shift',
            'shifts.id as shift_id',
            'manager_id as manager_id',
            'email',
        ])
            .executeTakeFirst();
    });
}
exports.findStaffById = findStaffById;
function fetchAllStaff(offset, limit, filters, sortFilter) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = database_1.db
            .selectFrom('staff')
            .leftJoin('departments', 'staff.department_id', 'departments.id')
            .leftJoin('offices', 'staff.office_id', 'offices.id')
            .leftJoin('roles', 'staff.role_id', 'roles.id')
            .leftJoin('shifts', 'staff.shift_id', 'shifts.id')
            .select([
            'staff.id as id',
            'staff.name',
            'surname',
            'birthday',
            'phone',
            'salary',
            'join_date',
            'departments.name as department',
            'offices.name as office',
            'roles.name as role',
            'shifts.name as shift',
            'email',
        ])
            .limit(limit)
            .offset(offset);
        if (sortFilter && sortFilter.order && sortFilter.direction) {
            query = query.orderBy(sortFilter.order, sortFilter.direction);
        }
        else {
            query = query.orderBy('name', 'asc');
        }
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value && value !== 'All') {
                    if (key === 'offices') {
                        query = query.where('offices.name', '=', value);
                    }
                    else if (key === 'roles') {
                        query = query.where('roles.name', '=', value);
                    }
                    else if (key === 'departments') {
                        query = query.where('departments.name', '=', value);
                    }
                    else if (key === 'shifts') {
                        query = query.where('shifts.name', '=', value);
                    }
                }
            });
        }
        return yield query.execute();
    });
}
exports.fetchAllStaff = fetchAllStaff;
function countStaff(filters) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = database_1.db
            .selectFrom('staff')
            .leftJoin('departments', 'staff.department_id', 'departments.id')
            .leftJoin('offices', 'staff.office_id', 'offices.id')
            .leftJoin('roles', 'staff.role_id', 'roles.id')
            .leftJoin('shifts', 'staff.shift_id', 'shifts.id');
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value && value !== 'All') {
                    if (key === 'offices') {
                        query = query.where('offices.name', '=', value);
                    }
                    else if (key === 'roles') {
                        query = query.where('roles.name', '=', value);
                    }
                    else if (key === 'departments') {
                        query = query.where('departments.name', '=', value);
                    }
                    else if (key === 'shifts') {
                        query = query.where('shifts.name', '=', value);
                    }
                }
            });
        }
        return yield query
            .select((eb) => eb.fn.count('staff.id').as('total_staff'))
            .execute();
    });
}
exports.countStaff = countStaff;
function insertStaff(staffData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.db.insertInto('staff').values(staffData).executeTakeFirst();
    });
}
exports.insertStaff = insertStaff;
function deleteStaffById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .deleteFrom('staff')
            .where('staff.id', '=', id)
            .executeTakeFirst();
    });
}
exports.deleteStaffById = deleteStaffById;
function updateStaffById(id, staffData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .updateTable('staff')
            .set(staffData)
            .where('id', '=', id)
            .executeTakeFirst();
    });
}
exports.updateStaffById = updateStaffById;
function getStaffUid(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .selectFrom('staff')
            .select('firebase_id')
            .where('staff.id', '=', id)
            .executeTakeFirst();
    });
}
exports.getStaffUid = getStaffUid;
function fetchCurrentBirthdays(currentMonth, birthdayWeek) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .selectFrom('staff')
            .leftJoin('departments', 'staff.department_id', 'departments.id')
            .leftJoin('offices', 'staff.office_id', 'offices.id')
            .leftJoin('roles', 'staff.role_id', 'roles.id')
            .select([
            'staff.id',
            'birthday',
            'staff.name',
            'staff.surname',
            'roles.name as role',
            'departments.name as department',
            'offices.name as office',
        ])
            .where((eb) => eb.fn('date_part', [kysely_1.sql.lit('month'), eb.ref('birthday')]), '=', currentMonth)
            .where((eb) => eb.fn('date_part', [kysely_1.sql.lit('day'), eb.ref('birthday')]), 'in', birthdayWeek)
            .orderBy((eb) => eb.fn('date_part', [kysely_1.sql.lit('day'), eb.ref('birthday')]), 'asc')
            .execute();
    });
}
exports.fetchCurrentBirthdays = fetchCurrentBirthdays;
function fetchNewJoins() {
    return __awaiter(this, void 0, void 0, function* () {
        const date = new Date();
        const currentYear = date.getFullYear();
        return yield database_1.db
            .selectFrom('staff')
            .leftJoin('departments', 'staff.department_id', 'departments.id')
            .leftJoin('offices', 'staff.office_id', 'offices.id')
            .leftJoin('roles', 'staff.role_id', 'roles.id')
            .select([
            'staff.id',
            'join_date',
            'staff.name',
            'staff.surname',
            'roles.name as role',
            'departments.name as department',
            'offices.name as office',
        ])
            .where((eb) => eb.fn('date_part', [kysely_1.sql.lit('year'), eb.ref('join_date')]), '=', currentYear)
            .orderBy('join_date')
            .execute();
    });
}
exports.fetchNewJoins = fetchNewJoins;
