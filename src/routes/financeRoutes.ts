import express from 'express';
import {
  deleteIncomeData,
  getAllIncome,
  getAllIncomeTotal,
  getIncomeByCategory,
  getIncomeByID,
  getIncomeByMonth,
  getIncomeByYear,
  updateIncomeData,
} from '../controllers/incomeController';
import {
  deleteExpenseData,
  getAllExpenses,
  getAllExpensesTotal,
  getExpenseById,
  getExpenseByMonth,
  getExpensesByCategory,
  getExpensesByYear,
  updateExpenseData,
} from '../controllers/expensesController';

const router = express.Router();

router
  .route('/income/:id')
  .get(getIncomeByID)
  .put(updateIncomeData)
  .delete(deleteIncomeData);

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

router
  .route('/expenses/:id')
  .get(getExpenseById)
  .put(updateExpenseData)
  .delete(deleteExpenseData);

export default router;
