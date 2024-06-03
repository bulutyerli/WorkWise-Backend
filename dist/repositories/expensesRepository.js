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
exports.expenseCount = exports.updateExpenseById = exports.deleteExpensesById = exports.addExpense = exports.fetchExpensesByYear = exports.fetchExpenseByMonth = exports.fetchExpensesByCategory = exports.fetchExpenseYearly = exports.fetchAllExpenses = exports.fetchExpenseById = void 0;
const kysely_1 = require("kysely");
const database_1 = require("../database");
const categoryRepository_1 = require("./categoryRepository");
function fetchExpenseById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .selectFrom('expenses')
            .where('id', '=', id)
            .selectAll()
            .executeTakeFirst();
    });
}
exports.fetchExpenseById = fetchExpenseById;
function fetchAllExpenses(offset, limit, category, sortFilter) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = database_1.db
            .selectFrom('expenses')
            .leftJoin('category_expenses', 'category_expenses.id', 'expenses.category')
            .select([
            'description',
            'amount',
            'date',
            'category_expenses.category as category',
            'expenses.category as category_id',
            'expenses.id',
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
            query = query.where('expenses.category', '=', category);
        }
        return yield query.execute();
    });
}
exports.fetchAllExpenses = fetchAllExpenses;
function fetchExpenseYearly() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .selectFrom('expenses')
            .leftJoin('category_expenses', 'category_expenses.id', 'expenses.category')
            .select((eb) => eb.fn('date_part', [kysely_1.sql.lit('year'), eb.ref('date')]).as('year'))
            .select((eb) => eb.fn.sum('amount').as('amount'))
            .groupBy('year')
            .orderBy('year')
            .execute();
    });
}
exports.fetchExpenseYearly = fetchExpenseYearly;
function fetchExpensesByCategory(category) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryData = yield (0, categoryRepository_1.getExpensesCategories)();
        let query = database_1.db
            .selectFrom('expenses')
            .leftJoin('category_expenses', 'category_expenses.id', 'expenses.category')
            .select([
            (eb) => eb.fn('date_part', [kysely_1.sql.lit('year'), eb.ref('date')]).as('year'),
            (eb) => eb.fn.sum('amount').as('amount'),
            'category_expenses.category',
            'category_expenses.id',
        ])
            .groupBy(['year', 'category_expenses.category', 'category_expenses.id'])
            .orderBy('year');
        if (category) {
            query = query.where('category_expenses.id', '=', parseInt(category));
        }
        const valuesData = yield query.execute();
        return { valuesData, categoryData };
    });
}
exports.fetchExpensesByCategory = fetchExpensesByCategory;
function fetchExpenseByMonth(year, category) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = database_1.db
            .selectFrom('expenses')
            .leftJoin('category_expenses', 'category_expenses.id', 'expenses.category')
            .select([
            (eb) => eb.fn('date_part', [kysely_1.sql.lit('year'), eb.ref('date')]).as('year'),
            (eb) => eb.fn('date_part', [kysely_1.sql.lit('month'), eb.ref('date')]).as('month'),
            'expenses.amount',
            'category_expenses.category',
            'category_expenses.id',
        ])
            .groupBy([
            'category_expenses.category',
            'category_expenses.id',
            'month',
            'year',
            'month',
            'amount',
        ])
            .orderBy('year')
            .orderBy('month');
        if (category) {
            query = query.where('expenses.category', '=', category);
        }
        if (year) {
            query = query.where((eb) => eb.fn('date_part', [kysely_1.sql.lit('year'), eb.ref('date')]), '=', parseInt(year));
        }
        return yield query.execute();
    });
}
exports.fetchExpenseByMonth = fetchExpenseByMonth;
function fetchExpensesByYear(year) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = database_1.db
            .selectFrom('expenses')
            .leftJoin('category_expenses', 'category_expenses.id', 'expenses.category')
            .select([
            (eb) => eb.fn('date_part', [kysely_1.sql.lit('year'), eb.ref('date')]).as('year'),
            (eb) => eb.fn.sum('amount').as('amount'),
            'category_expenses.category',
            'category_expenses.id',
        ])
            .groupBy(['category_expenses.category', 'category_expenses.id', 'year'])
            .orderBy('year');
        if (year) {
            query = query.where((eb) => eb.fn('date_part', [kysely_1.sql.lit('year'), eb.ref('date')]), '=', parseInt(year));
        }
        return yield query.execute();
    });
}
exports.fetchExpensesByYear = fetchExpensesByYear;
function addExpense(expenseData) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.db.insertInto('expenses').values(expenseData).executeTakeFirst();
    });
}
exports.addExpense = addExpense;
function deleteExpensesById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .deleteFrom('expenses')
            .where('expenses.id', '=', id)
            .executeTakeFirst();
    });
}
exports.deleteExpensesById = deleteExpensesById;
function updateExpenseById(id, expenseData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.db
            .updateTable('expenses')
            .set(expenseData)
            .where('id', '=', id)
            .executeTakeFirst();
    });
}
exports.updateExpenseById = updateExpenseById;
function expenseCount(category) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = database_1.db.selectFrom('expenses');
        if (category) {
            query = query.where('category', '=', category);
        }
        return yield query
            .select((eb) => eb.fn.count('id').as('total'))
            .execute();
    });
}
exports.expenseCount = expenseCount;
