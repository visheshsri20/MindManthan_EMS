import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [departments, setDepartments] = useState([]);
   const [formData , setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value , files } = e.target;
    if(name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    })


    try {   
            const response = await axios.post('http://localhost:5000/api/employee/add',formDataObj, 
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
                })

                if(response.data.success) {
                    navigate("/AdminDashboard/employees")
                    alert("Employee added successfully")
                }
}

catch(error) {
   if(error.response && !error.response.data.success) {
      alert(error.response.data.error)
   } else {
      alert("Something went wrong. Please try again.");
      console.log(error);
   }
}
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Add New Employee</h3>
        </div>
        <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit = {handleSubmit}>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Insert Name"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Insert Email"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Marital Status</label>
            <select
              name="maritalStatus"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Department</label>
            <select
              name="department"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {departments && departments.map(dep => (
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              placeholder="Salary"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="******"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Upload Image</label>
            <input
              type="file"
              name="image"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded mt-2"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;