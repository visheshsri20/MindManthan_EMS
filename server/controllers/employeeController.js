import Employee from '../models/Employee.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import Department from '../models/Department.js';

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
    let employee;
     employee = await Employee.findById(id)
      .populate('userId', { password: 0 })
      .populate('department');
    if (!employee) {
     employee = await Employee.findOne({userId : id})
      .populate('userId', { password: 0 })
      .populate('department');
     }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error('Error getting employee:', error);
    return res.status(500).json({ success: false, error: 'GET employee server error' });
  }
};

const updateEmployee = async (req, res) => {
    try{
        const { id } = req.params;
        const {
            name,
            email,
            maritalStatus,
            dob,
            department,
            designation,
            salary,
        } = req.body;
     
        const employee = await Employee.findById({_id : id});
        if (!employee) {
            return res.status(404).json({ success: false, error: 'Employee not found' });
        }
        const user = await User.findById({_id: employee.userId});

        if(!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            employee.userId,
            { name})

        const updatedEmployee = await Employee.findByIdAndUpdate(
            {_id:id},
            {   
                email,
                maritalStatus,
                dob,
                designation,
                salary,
                department
            }
        );

        if (!updatedEmployee || !updatedUser) {
            return res.status(404).json({ success: false, error: 'Employee document not found' });
            console.log('Employee document not found',error);
        }

        else {
            return res.status(200).json({ success: true, message: 'Employee updated successfully' });
        }

            
    }
    catch (error) {
        return res.status(500).json({success: false, error: 'Update employee server error'});
    }
}

export const fetchEmployeesByDepId = async (req, res) => {
  const { id } = req.params; // Extract department ID from the route parameter
  try {
    const employees = await Employee.find({ department: id }) // Query employees by department ID
      .populate('userId', { password: 0 }) // Populate user details
      .populate('department'); // Populate department details

    if (!employees || employees.length === 0) {
      return res.status(404).json({ success: false, error: 'No employees found for this department' });
    }

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error('Error fetching employees by department ID:', error);
    return res.status(500).json({ success: false, error: 'Server error while fetching employees' });
  }
};


export {addEmployee, upload, getEmployees, getEmployee,updateEmployee};