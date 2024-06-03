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
exports.incomeCount = exports.updateIncomeById = exports.deleteIncomeById = exports.addIncome = exports.fetchIncomeByMonth = exports.fetchIncomeByYear = exports.fetchIncomeByCategory = exports.fetchIncomeYearly = exports.fetchAllIncome = exports.fetchIncomeById = void 0;
const kysely_1 = require("kysely");
const database_1 = require("../database");
const categoryRepository_1 = require("./categoryRepository");
function fetchIncomeById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .selectFrom('income')
            .where('id', '=', id)
            .selectAll()
            .executeTakeFirst();
    });
}
exports.fetchIncomeById = fetchIncomeById;
function fetchAllIncome(offset, limit, category, sortFilter) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = database_1.db
            .selectFrom('income')
            .leftJoin('category_income', 'category_income.id', 'income.category')
            .select([
            'description',
            'amount',
            'date',
            'category_income.category as category',
            'income.category as category_id',
            'income.id',
        ])
            .offset(offset)
            .limit(limit);
        if (sortFilter && sortFilter.order && sortFilter.direction) {
            query = query.orderBy(sortFilter.order, sortFilter.direction);
        }
        else {
            query.orderBy('description', 'asc');
        }
        if (category) {
            query = query.where('income.category', '=', category);
        }
        return yield query.execute();
    });
}
exports.fetchAllIncome = fetchAllIncome;
function fetchIncomeYearly() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .selectFrom('income')
            .leftJoin('category_income', 'category_income.id', 'income.category')
            .select((eb) => eb.fn('date_part', [kysely_1.sql.lit('year'), eb.ref('date')]).as('year'))
            .select((eb) => eb.fn.sum('amount').as('amount'))
            .groupBy('year')
            .orderBy('year')
            .execute();
    });
}
exports.fetchIncomeYearly = fetchIncomeYearly;
function fetchIncomeByCategory(category) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryData = yield (0, categoryRepository_1.getIncomeCategories)();
        let query = database_1.db
            .selectFrom('income')
            .leftJoin('category_income', 'category_income.id', 'income.category')
            .select([
            (eb) => eb.fn('date_part', [kysely_1.sql.lit('year'), eb.ref('date')]).as('year'),
            (eb) => eb.fn.sum('amount').as('amount'),
            'category_income.category',
            'category_income.id',
        ])
            .groupBy(['year', 'category_income.category', 'category_income.id'])
            .orderBy('year');
        if (category) {
            query = query.where('category_income.id', '=', parseInt(category));
        }
        const valuesData = yield query.execute();
        return { valuesData, categoryData };
    });
}
exports.fetchIncomeByCategory = fetchIncomeByCategory;
function fetchIncomeByYear(year) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = database_1.db
            .selectFrom('income')
            .leftJoin('category_income', 'category_income.id', 'income.category')
            .select([
            (eb) => eb.fn('date_part', [kysely_1.sql.lit('year'), eb.ref('date')]).as('year'),
            (eb) => eb.fn.sum('amount').as('amount'),
            'category_income.category',
            'category_income.id',
        ])
            .groupBy(['category_income.category', 'category_income.id', 'year'])
            .orderBy('year');
        if (year) {
            query = query.where((eb) => eb.fn('date_part', [kysely_1.sql.lit('year'), eb.ref('date')]), '=', parseInt(year));
        }
        return yield query.execute();
    });
}
exports.fetchIncomeByYear = fetchIncomeByYear;
function fetchIncomeByMonth(year, category) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = database_1.db
            .selectFrom('income')
            .leftJoin('category_income', 'category_income.id', 'income.category')
            .select([
            (eb) => eb.fn('date_part', [kysely_1.sql.lit('year'), eb.ref('date')]).as('year'),
            (eb) => eb.fn('date_part', [kysely_1.sql.lit('month'), eb.ref('date')]).as('month'),
            'income.amount',
            'category_income.category',
            'category_income.id',
        ])
            .groupBy([
            'category_income.category',
            'category_income.id',
            'month',
            'year',
            'month',
            'amount',
        ])
            .orderBy('year')
            .orderBy('month');
        if (category) {
            query = query.where('income.category', '=', category);
        }
        if (year) {
            query = query.where((eb) => eb.fn('date_part', [kysely_1.sql.lit('year'), eb.ref('date')]), '=', parseInt(year));
        }
        return yield query.execute();
    });
}
exports.fetchIncomeByMonth = fetchIncomeByMonth;
function addIncome(incomeData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.db.insertInto('income').values(incomeData).executeTakeFirst();
    });
}
exports.addIncome = addIncome;
function deleteIncomeById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .deleteFrom('income')
            .where('income.id', '=', id)
            .executeTakeFirst();
    });
}
exports.deleteIncomeById = deleteIncomeById;
function updateIncomeById(id, incomeData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .updateTable('income')
            .set(incomeData)
            .where('id', '=', id)
            .executeTakeFirst();
    });
}
exports.updateIncomeById = updateIncomeById;
function incomeCount(category) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = database_1.db.selectFrom('income');
        if (category) {
            query = query.where('category', '=', category);
        }
        return yield query
            .select((eb) => eb.fn.count('id').as('total'))
            .execute();
    });
}
exports.incomeCount = incomeCount;
