import express from 'express';
import {
  getAllIncome,
  getAllIncomeTotal,
  getIncomeByCategory,
  getIncomeByID,
  getIncomeByMonth,
  getIncomeByYear,
} from '../controllers/incomeController';
import {
  getAllExpenses,
  getAllExpensesTotal,
  getExpenseById,
  getExpenseByMonth,
  getExpensesByCategory,
  getExpensesByYear,
} from '../controllers/expensesController';

const router = express.Router();

router.route('/income/:id').get(getIncomeByID);

router.route('/income-total').get(getAllIncomeTotal);
router.route('/income-category').get(getIncomeByCategory);
router.route('/income-year').get(getIncomeByYear);
router.route('/income-month').get(getIncomeByMonth);
router.route('/income').get(getAllIncome);

router.route('/expenses-total').get(getAllExpensesTotal);
router.route('/expenses-category').get(getExpensesByCategory);
router.route('/expense-year').get(getExpensesByYear);
router.route('/expense-month').get(getExpenseByMonth);
router.route('/expenses').get(getAllExpenses);

router.route('/expenses/:id').get(getExpenseById);

export default router;
