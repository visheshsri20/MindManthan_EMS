import React, { useEffect, useState } from 'react';
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [salary, setSalary] = useState({
    department: '',
    employeeId: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    payDate: '',
  });
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch departments on component mount
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const deps = await fetchDepartments();
        setDepartments(deps);
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };
    getDepartments();
  }, []);

  // Handle input changes for salary fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle department selection and fetch employees
  const handleDepartment = async (e) => {
    const departmentId = e.target.value;
    setSalary((prevData) => ({
      ...prevData,
      department: departmentId,
    }));

    try {
      const emp = await getEmployees(departmentId);
      setEmployees(emp);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://employee-a0gcfmzec-visheshsri20s-projects.vercel.app//api/salary/add`, salary, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        navigate('/AdminDashboard/employees');
        alert('Salary updated successfully');
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

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="container mx-auto p-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold">Manage Salary</h3>
            </div>
            <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
              {/* Department Dropdown */}
              <div className="col-span-2">
                <label className="block text-gray-700">Department</label>
                <select
                  name="department"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleDepartment}
                  value={salary.department || ''}
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Employee Dropdown */}
              <div className="col-span-2">
                <label className="block text-gray-700">Employee</label>
                <select
                  name="employeeId"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                  value={salary.employeeId || ''}
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.userId?.name || 'N/A'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Basic Salary Input */}
              <div>
                <label className="block text-gray-700">Basic Salary</label>
                <input
                  type="number"
                  name="basicSalary"
                  value={salary.basicSalary || ''}
                  placeholder="Basic Salary"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>

              {/* Allowances Input */}
              <div>
                <label className="block text-gray-700">Allowances</label>
                <input
                  type="number"
                  name="allowances"
                  value={salary.allowances || ''}
                  placeholder="Allowances"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>

              {/* Deductions Input */}
              <div>
                <label className="block text-gray-700">Deductions</label>
                <input
                  type="number"
                  name="deductions"
                  value={salary.deductions || ''}
                  placeholder="Deductions"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>

              {/* Pay Date Input */}
              <div>
                <label className="block text-gray-700">Pay Date</label>
                <input
                  type="date"
                  name="payDate"
                  value={salary.payDate || ''}
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded mt-2"
                >
                  Update Salary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Add;