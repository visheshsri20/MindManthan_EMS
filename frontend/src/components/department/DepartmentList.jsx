import React, { use, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
const [departments, setDepartments] = React.useState([]);

useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/departments', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        setDepartments(response.data.departments);
        console.log(response.data.departments);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  fetchDepartments();
}, []);

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search for a department"
          className="px-4 px-0.5"
        />
        <Link
          to="/AdminDashboard/add-department" // Changed to absolute path
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Department
        </Link>
      </div>
      <div>
         <DataTable
         columns = {columns}
         />
      </div>
    </div>
  );
};

export default DepartmentList;