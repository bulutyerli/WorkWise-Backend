import express from 'express';
import {
  deleteIncomeData,
  getAllIncome,
  getIncomeByID,
  updateIncomeData,
} from '../controllers/incomeController';
import { protect } from '../middlewares/protect';
import { protectByRole } from '../middlewares/protectByRole';
import {
  deleteExpenseData,
  getAllExpenses,
  getExpenseById,
  updateExpenseData,
} from '../controllers/expensesController';

const router = express.Router();

router
  .route('/income/:id')
  .get(getIncomeByID)
  .put(protect, protectByRole, updateIncomeData)
  .delete(protect, protectByRole, deleteIncomeData);

router.route('/income').get(getAllIncome);
router.route('/expenses').get(getAllExpenses);

router
  .route('/expenses/:id')
  .get(getExpenseById)
  .put(protect, protectByRole, updateExpenseData)
  .delete(protect, protectByRole, deleteExpenseData);

export default router;
