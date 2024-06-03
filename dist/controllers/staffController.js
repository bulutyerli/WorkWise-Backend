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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaffDates = exports.updateStaff = exports.deleteStaff = exports.createNewStaff = exports.getAllStaff = exports.getStaffByID = void 0;
const ErrorHandler_1 = require("../utils/ErrorHandler");
const staffRepository_1 = require("../repositories/staffRepository");
const staffSchema_1 = require("../schemas/staffSchema");
const firebaseConfig_1 = require("../config/firebaseConfig");
const NameFormatter_1 = __importDefault(require("../utils/NameFormatter"));
function getStaffByID(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            const staff = yield (0, staffRepository_1.findStaffById)(id);
            if (!staff) {
                return next(new ErrorHandler_1.ErrorHandler(404, 'Staff ID Not Found'));
            }
            res.json(staff);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getStaffByID = getStaffByID;
function getAllStaff(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filters = req.query;
            const sortFilters = {
                order: req.query.order,
                direction: req.query.direction,
            };
            const limit = 15;
            const page = parseInt(req.query.page);
            const offset = (page - 1) * limit;
            const [{ total_staff }] = yield (0, staffRepository_1.countStaff)(filters);
            const totalPages = Math.ceil(total_staff / limit);
            const staff = yield (0, staffRepository_1.fetchAllStaff)(offset, limit, filters, sortFilters);
            const hasMore = page < totalPages;
            if (!staff) {
                return next(new ErrorHandler_1.ErrorHandler(404, 'Could not get the staff data'));
            }
            res.json({
                success: true,
                totalPages,
                totalStaff: total_staff,
                hasMore: hasMore,
                data: staff,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllStaff = getAllStaff;
function createNewStaff(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, surname, phone, birthday, office, department, shift, role, manager_id, join_date, salary, email, password, } = req.body;
            const parsedJoindate = new Date(join_date);
            const parsedBirthday = new Date(birthday);
            const newUserName = `${name} ${surname}`;
            const formattedName = (0, NameFormatter_1.default)(name);
            const formattedSurname = (0, NameFormatter_1.default)(surname);
            //create firebase user
            const newUser = yield firebaseConfig_1.auth.createUser({
                email,
                emailVerified: false,
                password,
                displayName: newUserName,
            });
            if (newUser) {
                const staffData = {
                    name: formattedName,
                    surname: formattedSurname,
                    phone,
                    birthday: parsedBirthday,
                    office_id: Number(office),
                    department_id: Number(department),
                    shift_id: Number(shift),
                    role_id: Number(role),
                    manager_id: Number(manager_id),
                    join_date: parsedJoindate,
                    salary: Number(salary),
                    email,
                    firebase_id: newUser.uid,
                };
                const newData = staffSchema_1.staffSchema.parse(staffData);
                yield (0, staffRepository_1.insertStaff)(newData);
                res
                    .status(201)
                    .json({ success: true, message: 'Staff member created successfully' });
            }
            else {
                throw new Error('Could not create user');
            }
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
}
exports.createNewStaff = createNewStaff;
function deleteStaff(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const user = yield (0, staffRepository_1.getStaffUid)(id);
            if (user === null || user === void 0 ? void 0 : user.firebase_id) {
                yield firebaseConfig_1.auth.deleteUser(user === null || user === void 0 ? void 0 : user.firebase_id.toString());
                yield (0, staffRepository_1.deleteStaffById)(id);
            }
            res
                .status(200)
                .json({ success: true, message: 'Staff member deleted successfully' });
        }
        catch (error) {
            console.error('Error deleting staff member:', error);
            next(error);
        }
    });
}
exports.deleteStaff = deleteStaff;
function updateStaff(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const staffData = staffSchema_1.staffUpdateSchema.parse(req.body);
            yield (0, staffRepository_1.updateStaffById)(id, staffData);
            res
                .status(200)
                .json({ success: true, message: 'Staff member updated successfully' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateStaff = updateStaff;
function getStaffDates(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const date = new Date();
            const currentMonth = date.getMonth() + 1;
            const currentDay = date.getDate();
            const birthdayWeek = [];
            for (let day = currentDay; day < currentDay + 3; day++) {
                birthdayWeek.push(day);
            }
            const [birthdays, newJoins] = yield Promise.all([
                (0, staffRepository_1.fetchCurrentBirthdays)(currentMonth, birthdayWeek),
                (0, staffRepository_1.fetchNewJoins)(),
            ]);
            res.status(200).json({ birthdays, newJoins });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getStaffDates = getStaffDates;
