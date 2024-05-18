import express from 'express';
import {
  createNewStaff,
  deleteStaff,
  getAllStaff,
  getStaffByID,
  updateStaff,
} from '../controllers/staffController';
import { isAdmin } from '../middlewares/isAdmin';

const router = express.Router();

router.route('/staff').get(getAllStaff).post(isAdmin, createNewStaff);

router
  .route('/staff/:id')
  .get(getStaffByID)
  .delete(isAdmin, deleteStaff)
  .put(isAdmin, updateStaff);

export default router;
