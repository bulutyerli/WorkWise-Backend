import express from 'express';
import { getAllCategories } from '../controllers/categoryController';

const router = express.Router();

router.route('/categories').get(getAllCategories);

export default router;
