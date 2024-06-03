"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const incomeController_1 = require("../controllers/incomeController");
const expensesController_1 = require("../controllers/expensesController");
const isAdmin_1 = require("../middlewares/isAdmin");
const router = express_1.default.Router();
router
    .route('/income/:id')
    .get(incomeController_1.getIncomeByID)
    .put(isAdmin_1.isAdmin, incomeController_1.updateIncomeData)
    .delete(isAdmin_1.isAdmin, incomeController_1.deleteIncomeData);
router.route('/income-total').get(incomeController_1.getAllIncomeTotal);
router.route('/income-category').get(incomeController_1.getIncomeByCategory);
router.route('/income-year').get(incomeController_1.getIncomeByYear);
router.route('/income-month').get(incomeController_1.getIncomeByMonth);
router.route('/income').get(incomeController_1.getAllIncome);
router.route('/expenses-total').get(expensesController_1.getAllExpensesTotal);
router.route('/expenses-category').get(expensesController_1.getExpensesByCategory);
router.route('/expense-year').get(expensesController_1.getExpensesByYear);
router.route('/expense-month').get(expensesController_1.getExpenseByMonth);
router.route('/expenses').get(expensesController_1.getAllExpenses);
router
    .route('/expenses/:id')
    .get(expensesController_1.getExpenseById)
    .put(isAdmin_1.isAdmin, expensesController_1.updateExpenseData)
    .delete(isAdmin_1.isAdmin, expensesController_1.deleteExpenseData);
exports.default = router;
