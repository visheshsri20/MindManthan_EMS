import React , {useState}from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/EmployeeHelper';
import {EmployeeButtons} from '../../utils/EmployeeHelper';

const List = () => {
  const [employees, setEmployees] = React.useState([]);
  const [empLoading, setEmpLoading] = React.useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('https://employee-a0gcfmzec-visheshsri20s-projects.vercel.app//api/employee', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || '',
            name: emp.userId?.name || '',
            email: emp.userId?.email || '',
            dob: emp.dob ? new Date(emp.dob).toLocaleDateString() : '',
            image: emp.userId?.profileImage || '', 
            profileImage: emp.userId.profileImage,
            action: (<EmployeeButtons _id={emp._id} />)
          }));
          setEmployees(data);
          
          
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching Employees");
        console.log("Error",error);
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search by name"
     
        />
        <Link
          to="/AdminDashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div >
        <DataTable
          columns={columns}
          data={employees}
          progressPending={empLoading}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 20]}
          paginationComponentOptions={{
            rowsPerPageText: 'Rows per page',
            rangeSeparatorText: 'of',
            noRowsPerPage: true,
          }}
        />
      </div>
    </div>
  );
};

export default List;