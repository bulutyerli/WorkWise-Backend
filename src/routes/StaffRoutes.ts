import express from 'express';
import {
  createNewStaff,
  getAllStaff,
  getStaffByID,
} from '../controllers/staffController';
import { protect } from '../controllers/authController';

const router = express.Router();

router.get('/staff', getAllStaff);
router.route('/staff/:id').get(getStaffByID).delete(protect);
router.post('/staff', createNewStaff);

export default router;
