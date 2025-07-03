import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = async (id) => {
    const data = departments.filter((dep) => dep.id !== id);
    setDepartments(data);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get('https://employee-a0gcfmzec-visheshsri20s-projects.vercel.app//api/department', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.departments.map((dep) => ({
            id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
            action: (<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete} />)
          }));
          setDepartments(data);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching departments");
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredDepartments(departments);
    } else {
      setFilteredDepartments(
        departments.filter(dep =>
          dep.dep_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [departments, searchTerm]);

  return (
    <>
      {depLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              placeholder="Search by dept name"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Link
              to="/AdminDashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-6">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              paginationPerPage={10}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;