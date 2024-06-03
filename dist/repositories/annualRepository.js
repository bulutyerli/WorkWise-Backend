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
exports.answerAnnualRequest = exports.fetchEmployeeAnnualRequests = exports.deleteAnnualRequest = exports.insertAnnualRequest = exports.fetchCurrentAnnual = exports.fetchPendingLeaves = exports.fetchAnnualLeaves = void 0;
const database_1 = require("../database");
// Function to fetch annual leaves for a specific user
function fetchAnnualLeaves(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .selectFrom('annual_requests')
            .selectAll()
            .where('user_id', '=', userId)
            .orderBy('annual_requests.starting_date desc')
            .execute();
    });
}
exports.fetchAnnualLeaves = fetchAnnualLeaves;
function fetchPendingLeaves() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .selectFrom('annual_requests')
            .selectAll()
            .where('status', '=', 'pending')
            .orderBy('annual_requests.starting_date desc')
            .execute();
    });
}
exports.fetchPendingLeaves = fetchPendingLeaves;
// Function to fetch the current year's annual leave for a specific user
function fetchCurrentAnnual(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        return yield database_1.db
            .selectFrom('annual_requests')
            .selectAll()
            .where('user_id', '=', userId)
            .where('status', '=', 'approved')
            .where('starting_date', '>=', startOfYear)
            .execute();
    });
}
exports.fetchCurrentAnnual = fetchCurrentAnnual;
function insertAnnualRequest(annualData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .insertInto('annual_requests')
            .values(annualData)
            .executeTakeFirst();
    });
}
exports.insertAnnualRequest = insertAnnualRequest;
function deleteAnnualRequest(requestId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .deleteFrom('annual_requests')
            .where('id', '=', requestId)
            .executeTakeFirst();
    });
}
exports.deleteAnnualRequest = deleteAnnualRequest;
function fetchEmployeeAnnualRequests(managerId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .selectFrom('annual_requests')
            .leftJoin('staff', 'staff.id', 'annual_requests.user_id')
            .select([
            'staff.name',
            'staff.surname',
            'annual_requests.starting_date',
            'annual_requests.end_date',
            'annual_requests.id',
        ])
            .where('staff.manager_id', '=', managerId)
            .where('annual_requests.status', '=', 'pending')
            .execute();
    });
}
exports.fetchEmployeeAnnualRequests = fetchEmployeeAnnualRequests;
function answerAnnualRequest(requestId, requestStatus) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .updateTable('annual_requests')
            .where('id', '=', requestId)
            .set({ status: requestStatus })
            .executeTakeFirst();
    });
}
exports.answerAnnualRequest = answerAnnualRequest;
