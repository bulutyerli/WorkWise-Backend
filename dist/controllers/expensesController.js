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
exports.updateExpenseData = exports.deleteExpenseData = exports.addExpenseData = exports.getExpenseByMonth = exports.getExpensesByYear = exports.getExpensesByCategory = exports.getAllExpensesTotal = exports.getAllExpenses = exports.getExpenseById = void 0;
const expensesRepository_1 = require("../repositories/expensesRepository");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const expensesSchema_1 = require("../schemas/expensesSchema");
const categoryRepository_1 = require("../repositories/categoryRepository");
function getExpenseById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const expense = yield (0, expensesRepository_1.fetchExpenseById)(id);
            if (!expense) {
                return next(new ErrorHandler_1.ErrorHandler(404, 'There is no record of this income ID'));
            }
            res.status(200).json({ success: true, data: expense });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getExpenseById = getExpenseById;
function getAllExpenses(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const limit = 15;
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * limit;
            const category = parseInt(req.query.category);
            const [{ total }] = yield (0, expensesRepository_1.expenseCount)(category);
            const totalPages = Math.ceil(total / limit);
            const sortFilter = {
                order: req.query.order,
                direction: req.query.direction,
            };
            const categories = yield (0, categoryRepository_1.getExpensesCategories)();
            const allIncomeData = yield (0, expensesRepository_1.fetchAllExpenses)(offset, limit, category, sortFilter);
            const hasMore = page < totalPages;
            res.status(200).json({
                success: true,
                totalPages,
                categories,
                hasMore,
                data: allIncomeData,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllExpenses = getAllExpenses;
function getAllExpensesTotal(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allExpenseData = yield (0, expensesRepository_1.fetchExpenseYearly)();
            if (!allExpenseData) {
                return next(new ErrorHandler_1.ErrorHandler(404, 'Something went wrong while taking data'));
            }
            res.status(200).json({ success: true, data: allExpenseData });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllExpensesTotal = getAllExpensesTotal;
function getExpensesByCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoryParam = req.query.category;
            const category = categoryParam || '1';
            const expenseData = yield (0, expensesRepository_1.fetchExpensesByCategory)(category);
            res.status(200).json({ success: true, data: expenseData });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getExpensesByCategory = getExpensesByCategory;
function getExpensesByYear(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const yearParam = req.query.year;
            const year = yearParam || '2023';
            const expenseData = yield (0, expensesRepository_1.fetchExpensesByYear)(year);
            res.status(200).json({ success: true, data: expenseData });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getExpensesByYear = getExpensesByYear;
function getExpenseByMonth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const yearParam = req.query.year;
            const categoryParam = req.query.category;
            const year = yearParam || '2023';
            const category = categoryParam || 1;
            const incomeData = yield (0, expensesRepository_1.fetchExpenseByMonth)(year, category);
            res.status(200).json({ success: true, data: incomeData });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getExpenseByMonth = getExpenseByMonth;
function addExpenseData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const expenseData = expensesSchema_1.expensesSchema.parse(req.body);
            yield (0, expensesRepository_1.addExpense)(expenseData);
            res
                .status(200)
                .json({ success: true, message: 'Expense data successfully added' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.addExpenseData = addExpenseData;
function deleteExpenseData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            yield (0, expensesRepository_1.deleteExpensesById)(id);
            res
                .status(200)
                .json({ success: true, message: 'Expense data successfully deleted' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteExpenseData = deleteExpenseData;
function updateExpenseData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const updateData = expensesSchema_1.updateExpenseSchema.parse(req.body);
            yield (0, expensesRepository_1.updateExpenseById)(id, updateData);
            res
                .status(200)
                .json({ success: true, message: 'Expense data successfully updated' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateExpenseData = updateExpenseData;
