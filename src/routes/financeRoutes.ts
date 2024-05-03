import express from 'express';
import {
  deleteIncomeData,
  getAllIncome,
  getIncomeByCategory,
  getIncomeByID,
  updateIncomeData,
} from '../controllers/incomeController';
import { protect } from '../middlewares/protect';
import { protectByRole } from '../middlewares/protectByRole';
import {
  deleteExpenseData,
  getAllExpenses,
  getExpenseById,
  getExpensesByCategory,
  updateExpenseData,
} from '../controllers/expensesController';

const router = express.Router();

router
  .route('/income/:id')
  .get(getIncomeByID)
  .put(protect, protectByRole, updateIncomeData)
  .delete(protect, protectByRole, deleteIncomeData);

router.route('/income').get(getAllIncome);
router.route('/income-category').get(getIncomeByCategory);

router.route('/expenses').get(getAllExpenses);
router.route('/expenses-category').get(getExpensesByCategory);

router
  .route('/expenses/:id')
  .get(getExpenseById)
  .put(protect, protectByRole, updateExpenseData)
  .delete(protect, protectByRole, deleteExpenseData);

export default router;
