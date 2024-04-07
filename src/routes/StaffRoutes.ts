import express from 'express';
import { getAllStaff, getStaffByID } from '../controllers/StaffController';
import { protect } from '../controllers/AuthController';

const router = express.Router();

router.get('/staff', getAllStaff);
router.route('/staff/:id').get(getStaffByID).delete(protect);

export default router;
