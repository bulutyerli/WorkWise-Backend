import express from 'express';
import {
  createNewStaff,
  deleteStaff,
  getAllStaff,
  getStaffByID,
} from '../controllers/staffController';
import { protectByRole } from '../middlewares/protectByRole';
import { protect } from '../middlewares/protect';

const router = express.Router();

router.route('/staff').get(getAllStaff).post(createNewStaff);
router
  .route('/staff/:id')
  .get(getStaffByID)
  .delete(
    protect,
    protectByRole([
      'HR',
      'CEO',
      'HR Director',
      'HR Chief',
      'Financial Director',
    ]),
    deleteStaff
  );

export default router;
