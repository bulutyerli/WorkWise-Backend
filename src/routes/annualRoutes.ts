import express from 'express';
import {
  getAnnualLeaves,
  getCurrentAnnual,
} from '../controllers/annualController';

const router = express.Router();

router.route('/annual-leaves/:id').get(getAnnualLeaves);
router.route('/annual-current/:id').get(getCurrentAnnual);

export default router;
