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
exports.updateIncomeData = exports.deleteIncomeData = exports.addIncomeData = exports.getIncomeByMonth = exports.getIncomeByYear = exports.getIncomeByCategory = exports.getAllIncomeTotal = exports.getAllIncome = exports.getIncomeByID = void 0;
const incomeRepository_1 = require("../repositories/incomeRepository");
const ErrorHandler_1 = require("../utils/ErrorHandler");
const incomeSchema_1 = require("../schemas/incomeSchema");
const categoryRepository_1 = require("../repositories/categoryRepository");
function getIncomeByID(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const income = yield (0, incomeRepository_1.fetchIncomeById)(id);
            if (!income) {
                return next(new ErrorHandler_1.ErrorHandler(404, 'There is no record of this income ID'));
            }
            res.status(200).json({ success: true, data: income });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getIncomeByID = getIncomeByID;
function getAllIncome(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const limit = 15;
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * limit;
            const category = parseInt(req.query.category);
            const [{ total }] = yield (0, incomeRepository_1.incomeCount)(category);
            const totalPages = Math.ceil(total / limit);
            const sortFilter = {
                order: req.query.order,
                direction: req.query.direction,
            };
            const categories = yield (0, categoryRepository_1.getIncomeCategories)();
            if (!categories) {
                return next(new ErrorHandler_1.ErrorHandler(404, 'No categories found.'));
            }
            const allIncomeData = yield (0, incomeRepository_1.fetchAllIncome)(offset, limit, category, sortFilter);
            if (!allIncomeData) {
                return next(new ErrorHandler_1.ErrorHandler(404, 'No income data found.'));
            }
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
exports.getAllIncome = getAllIncome;
function getAllIncomeTotal(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allIncomeData = yield (0, incomeRepository_1.fetchIncomeYearly)();
            if (!allIncomeData) {
                return next(new ErrorHandler_1.ErrorHandler(404, 'No income data found.'));
            }
            res.status(200).json({ success: true, data: allIncomeData });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getAllIncomeTotal = getAllIncomeTotal;
function getIncomeByCategory(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoryParam = req.query.category;
            const category = categoryParam || '1';
            const incomeData = yield (0, incomeRepository_1.fetchIncomeByCategory)(category);
            if (!incomeData) {
                return next(new ErrorHandler_1.ErrorHandler(404, 'No income data found'));
            }
            res.status(200).json({ success: true, data: incomeData });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getIncomeByCategory = getIncomeByCategory;
function getIncomeByYear(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const yearParam = req.query.year;
            const year = yearParam || '2023';
            const incomeData = yield (0, incomeRepository_1.fetchIncomeByYear)(year);
            res.status(200).json({ success: true, data: incomeData });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getIncomeByYear = getIncomeByYear;
function getIncomeByMonth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const yearParam = req.query.year;
            const categoryParam = req.query.category;
            const year = yearParam || '2023';
            const category = categoryParam || 1;
            const incomeData = yield (0, incomeRepository_1.fetchIncomeByMonth)(year, category);
            res.status(200).json({ success: true, data: incomeData });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getIncomeByMonth = getIncomeByMonth;
function addIncomeData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const incomeData = incomeSchema_1.incomeSchema.parse(req.body);
            yield (0, incomeRepository_1.addIncome)(incomeData);
            res
                .status(200)
                .json({ success: true, message: 'Income data successfully added' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.addIncomeData = addIncomeData;
function deleteIncomeData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            yield (0, incomeRepository_1.deleteIncomeById)(id);
            res
                .status(200)
                .json({ success: true, message: 'Income data successfully deleted' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteIncomeData = deleteIncomeData;
function updateIncomeData(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const updateData = incomeSchema_1.updateIncomeSchema.parse(req.body);
            yield (0, incomeRepository_1.updateIncomeById)(id, updateData);
            res
                .status(200)
                .json({ success: true, message: 'Income data successfully updated' });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateIncomeData = updateIncomeData;
