import Attendance from '../models/Attendance.js';
import Employee from '../models/Employee.js';

const getAttendance = async (req, res) => {
  try{
    const date = new Date().toISOString().split('T')[0]; 
    const attendance = await Attendance.find({ date })
      .populate({
        path: "employeeId",
        populate: [
          "department" ,
          "userId" 
        ]
      })
      res.json({ success: true, attendance });
  }

  catch (error) {
    console.error('Error fetching attendance:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }

}

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params; // <-- use 'id' instead of 'attendanceId'
    const { status } = req.body;

    console.log("Update request for attendance id:", id);

    const attendance = await Attendance.findById(id); // <-- use 'id'
    if (!attendance) {
      return res.status(404).json({ success: false, message: "Attendance record not found" });
    }

    attendance.status = status;
    attendance.source = 'manual';
    await attendance.save();

    return res.json({ success: true, attendance });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const attendaceReport = async (req, res) => {
  try {
    const {date, limit = 5, skip = 0} = req.query;
    const query ={};

    if (date) {
      query.date = date;
    }

    const attendanceData = await Attendance.find(query)
      .populate({
        path : "employeeId",
        populate:[
          "department",
          "userId"
        ]
      }).sort({ date: -1 }).limit(parseInt(limit)).skip(parseInt(skip));

      const groupData = attendanceData.reduce((result, record) => {
        const employeeId = record.employeeId._id.toString();
        if (!result[record.date]) {
          result[record.date] = { attendance: [] }; // Initialize attendance array!
        }
        result[record.date].attendance.push({
          employeeId : record.employeeId.employeeId,
          employeeName: record.employeeId.userId.name,
          departmentName: record.employeeId.department.dep_name,
          status: record.status || 'Not Marked',
      });
     return result;
      },{})
      return res.json({
        success: true,
        groupData
      });
  }
  catch (error) {
    console.error('Error generating attendance report:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
export { getAttendance , updateAttendance , attendaceReport };