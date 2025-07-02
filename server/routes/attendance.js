import express from 'express';
import {attendaceReport, getAttendance, updateAttendance} from '../controllers/attendanceController.js';
import defaultAttendance from '../middleware/defaultAttendance.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', authMiddleware,defaultAttendance ,getAttendance);
router.put('/update/:id', authMiddleware, updateAttendance);
router.get('/report', authMiddleware, attendaceReport);

export default router;