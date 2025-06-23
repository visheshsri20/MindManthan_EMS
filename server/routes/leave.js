import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addLeave } from '../controllers/leaveController.js';
import { getLeave } from '../controllers/leaveController.js';

const router = express.Router();

router.post('/add', authMiddleware, addLeave);
router.get('/:id', authMiddleware, getLeave);

export default router;