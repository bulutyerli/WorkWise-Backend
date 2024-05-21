import express from 'express';
import {
  deleteRequest,
  getAnnualLeaves,
  getCurrentAnnual,
  makeNewAnnualRequest,
} from '../controllers/annualController';

const router = express.Router();

router.route('/annual-leaves/:id').get(getAnnualLeaves);
router.route('/annual-current/:id').get(getCurrentAnnual);
router.route('/new-annual').post(makeNewAnnualRequest);
router.route('/annual/:requestId').delete(deleteRequest);

export default router;
