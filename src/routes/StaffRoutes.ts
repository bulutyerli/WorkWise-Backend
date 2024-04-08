import express from 'express';
import {
  createNewStaff,
  deleteStaff,
  getAllStaff,
  getStaffByID,
  updateStaff,
} from '../controllers/staffController';
import { protectByRole } from '../middlewares/protectByRole';
import { protect } from '../middlewares/protect';
import { deleteRoles } from '../utils/Roles';

const router = express.Router();

router.route('/staff').get(getAllStaff).post(createNewStaff);
router
  .route('/staff/:id')
  .get(getStaffByID)
  .delete(protect, protectByRole(deleteRoles), deleteStaff)
  .put(protect, protectByRole(deleteRoles), updateStaff);

export default router;
