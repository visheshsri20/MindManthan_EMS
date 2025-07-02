import Employee from '../models/Employee.js';
import Attendance from '../models/Attendance.js';

const defaultAttendance = async (req, res, next) => {
    try {
        // Use the date from query if provided, else default to today
        const date = req.query.date || new Date().toISOString().split('T')[0];
        const employees = await Employee.find({});
        for (const employee of employees) {
            const exists = await Attendance.findOne({ date, employeeId: employee._id });
            if (!exists) {
                await Attendance.create({
                    date,
                    employeeId: employee._id,
                    status: null, 
                    source: 'system'
                });
            }
        }
        next();
    } catch (error) {
        console.error('Error in defaultAttendance middleware:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default defaultAttendance;
