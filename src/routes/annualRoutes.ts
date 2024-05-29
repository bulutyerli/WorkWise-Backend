import express from 'express';
import {
  deleteRequest,
  getAnnualLeaves,
  getCurrentAnnual,
  getStaffAnnualRequests,
  makeNewAnnualRequest,
  requestAnswer,
} from '../controllers/annualController';
import { isManager } from '../middlewares/isManager';

const router = express.Router();

router.route('/annual-leaves/:id').get(getAnnualLeaves);
router.route('/annual-current/:id').get(getCurrentAnnual);
router.route('/new-annual').post(makeNewAnnualRequest);
router
  .route('/annual')
  .get(isManager, getStaffAnnualRequests)
  .delete(deleteRequest)
  .put(isManager, requestAnswer);

export default router;
