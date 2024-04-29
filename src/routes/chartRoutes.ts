import express from 'express';
import { getHierarchy } from '../controllers/hierarchyController';

const router = express.Router();

router.route('/hierarchy').get(getHierarchy);

export default router;
