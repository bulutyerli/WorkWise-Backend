import express from 'express';
import {
  getAnnualLeaves,
  getCurrentAnnual,
  makeNewAnnualRequest,
} from '../controllers/annualController';

const router = express.Router();

router.route('/annual-leaves/:id').get(getAnnualLeaves);
router.route('/annual-current/:id').get(getCurrentAnnual);
router.route('/new-annual').post(makeNewAnnualRequest);

export default router;
