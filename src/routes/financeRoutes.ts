import express from 'express';
import {
  deleteIncomeData,
  getAllIncome,
  getAllIncomeTotal,
  getIncomeByCategory,
  getIncomeByID,
  getIncomeByYear,
  updateIncomeData,
} from '../controllers/incomeController';
import { protect } from '../middlewares/protect';
import { protectByRole } from '../middlewares/protectByRole';
import {
  deleteExpenseData,
  getAllExpenses,
  getAllExpensesTotal,
  getExpenseById,
  getExpensesByCategory,
  getExpensesByYear,
  updateExpenseData,
} from '../controllers/expensesController';

const router = express.Router();

router
  .route('/income/:id')
  .get(getIncomeByID)
  .put(protect, protectByRole, updateIncomeData)
  .delete(protect, protectByRole, deleteIncomeData);

router.route('/income-total').get(getAllIncomeTotal);
router.route('/income-category').get(getIncomeByCategory);
router.route('/income-year').get(getIncomeByYear);
router.route('/income').get(getAllIncome);

router.route('/expenses-total').get(getAllExpensesTotal);
router.route('/expenses-category').get(getExpensesByCategory);
router.route('/expense-year').get(getExpensesByYear);
router.route('/expenses').get(getAllExpenses);

router
  .route('/expenses/:id')
  .get(getExpenseById)
  .put(protect, protectByRole, updateExpenseData)
  .delete(protect, protectByRole, deleteExpenseData);

export default router;
