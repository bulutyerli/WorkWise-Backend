import express from 'express';
import {
  createNewStaff,
  deleteStaff,
  getAllStaff,
  getStaffByID,
  updateStaff,
} from '../controllers/staffController';
import { isAuth } from '../middlewares/isAuth';

const router = express.Router();

router.route('/staff').get(getAllStaff).post(createNewStaff);

router
  .route('/staff/:id')
  .get(getStaffByID)
  .delete(deleteStaff)
  .put(updateStaff);

export default router;
