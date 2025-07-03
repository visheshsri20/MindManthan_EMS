import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import AttendanceHelper from '../../utils/AttendanceHelper';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://employee-a0gcfmzec-visheshsri20s-projects.vercel.app//api/attendance', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.attendance.map((att) => ({
          _id: att._id,
          employeeId: att.employeeId?.employeeId || '',
          sno: sno++,
          department: att.employeeId?.department?.dep_name || 'NA',
          name: att.employeeId?.userId?.name || 'NA',
          profileImage: att.employeeId?.userId?.profileImage || '',
          status: att.status,
        }));
        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Error fetching Attendance");
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredAttendance(attendance);
    } else {
      setFilteredAttendance(
        attendance.filter(att =>
          att.name.toLowerCase().includes(search.toLowerCase()) ||
          att.employeeId.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, attendance]);

  const statusChange = () => {
    fetchAttendance();
  };

  const columns = [
    {
      name: 'S.No',
      selector: (row) => row.sno,
      sortable: true,
      width: "80px"
    },
    {
      name: 'Employee Name',
      selector: (row) => row.name,
      sortable: true,
      width: "140px"
    },
    {
      name: 'Department Name',
      selector: (row) => row.department,
      width: "150px"
    },
    {
      name: 'Action',
      cell: (row) => (
        <AttendanceHelper
          status={row.status}
          attendanceId={row._id}
          statusChange={statusChange}
        />
      ),
    },
  ];

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Attendance</h3>
        <p className="text-xl">
          Manage Attendance for <span className="font-bold underline">{new Date().toLocaleDateString()}</span>
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search by name or employee ID"
          className="px-4 py-0.5 border"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Link
          to="/AdminDashboard/attendance-report"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Attendance Report
        </Link>
      </div>
      <div>
        <DataTable
          columns={columns}
          data={filteredAttendance}
          progressPending={loading}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 20, 30]}
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

export default Attendance;