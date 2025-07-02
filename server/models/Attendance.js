import  mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
    date : {
        type : String,
        required: true,
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Sick', 'Leave'],
        default: null,
       // required: true
    },
    source: { type: String,
         enum: ['system', 'manual'], 
         default: 'system' } 
})

const Attendance = mongoose.model('Attendance', AttendanceSchema);
export default Attendance;

