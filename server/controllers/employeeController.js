import Employee from '../models/Employee.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext)|| 'image';
        cb(null, `${Date.now()}-${baseName}${ext}`);
    }
});

const upload = multer({storage: storage})

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;
       
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : null,
        });
        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });

        await newEmployee.save();
        return res.status(201).json({
            success: true,
            message: 'Employee added successfully'
        });
    } 
    catch (error) {
        return res.status(500).json({success:false, error: 'Add employee server error' });
    }   
}

const getEmployees = async (req, res) =>
{
      try {
        const employees = await Employee.find().populate('userId',{password: 0 }).populate("department");
        return res.status(200).json({ success: true, employees });
    }
    catch (error) {
        return res.status(500).json({success: false, error: "GET employees server error"});
    }
}

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id) // Pass the id directly
      .populate('userId', { password: 0 })
      .populate('department');
    if (!employee) {
      return res.status(404).json({ success: false, error: 'Employee not found' });
    }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error('Error getting employee:', error);
    return res.status(500).json({ success: false, error: 'GET employee server error' });
  }
};


export {addEmployee, upload, getEmployees, getEmployee};