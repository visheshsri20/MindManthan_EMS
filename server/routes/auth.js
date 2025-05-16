import express from 'express';
import { login } from '../controllers/authController.js';
import { verify } from '../controllers/authController.js';
import verifyUser from '../middleware/authMiddleware.js';

const router  = express.Router();
router.post('/login', login)
router.get('/verify', verifyUser,verify)

export default router;