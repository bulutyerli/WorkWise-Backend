import express from 'express';
import { getUserRole } from '../controllers/authController';

const router = express.Router();

router.route('/user-role').get(getUserRole);

export default router;
