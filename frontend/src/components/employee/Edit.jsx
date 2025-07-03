import React, { useEffect, useState } from 'react';
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://employee-a0gcfmzec-visheshsri20s-projects.vercel.app//api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          const employee = response.data.employee;
          setEmployee(employee);
          setFormData({
            name: employee.userId?.name || '',
            email: employee.userId?.email || '',
            maritalStatus: employee.maritalStatus || '',
            designation: employee.designation || '',
            salary: employee.salary || '',
            department: employee.department || '',
          });
        } else {
          alert('Employee not found.');
        }
      } catch (err) {
        console.error('Error fetching employee:', err);
        alert('Error fetching employee details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://employee-a0gcfmzec-visheshsri20s-projects.vercel.app//api/employee/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        navigate('/AdminDashboard/employees');
        alert('Employee updated successfully');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error);
      } else {
        alert('Something went wrong. Please try again.');
        console.error(error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold">Edit Employee</h3>
        </div>
        <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
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
              value={formData.email || ''}
              placeholder="Insert Email"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Marital Status</label>
            <select
              name="maritalStatus"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
              value={formData.maritalStatus || ''}
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
              value={formData.designation || ''}
              placeholder="Designation"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary || ''}
              placeholder="Salary"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-700">Department</label>
            <select
              name="department"
              className="w-full p-2 border border-gray-300 rounded"
              onChange={handleChange}
              value={formData.department || ''}
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded mt-2"
            >
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;