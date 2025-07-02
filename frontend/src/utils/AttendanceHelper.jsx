import axios from 'axios';
import React from 'react';

export const columns = [
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
      <>
        <AttendanceHelper status={row.status} attendanceId={row._id} statusChange={statusChange} />
        <span className="text-xs text-gray-400 ml-2">
          {row.source === 'system' ? '(default)' : '(manual)'}
        </span>
      </>
    ),
  },
];

const AttendanceHelper = ({ status, attendanceId, statusChange }) => {
  const markEmployee = async (status) => {
    const response = await axios.put(
      `http://localhost:5000/api/attendance/update/${attendanceId}`,
      { status },
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    if (response.data.success) {
      statusChange();
    }
  };

  return (
    <div>
      {status == null ? (
        <div className="flex space-x-8">
          <button className="px-4 py-2 bg-green-500 text-white"
            onClick={() => markEmployee("Present")}>Present</button>
          <button className="px-4 py-2 bg-red-500 text-white"
            onClick={() => markEmployee("Absent")}>Absent</button>
          <button className="px-4 py-2 bg-blue-500 text-white"
            onClick={() => markEmployee("Sick")}>Sick</button>
          <button className="px-4 py-2 bg-yellow-500 text-white"
            onClick={() => markEmployee("Leave")}>Leave</button>
        </div>
      ) : (
        <p className="bg-gray-100 w-20 text-center py-2 rounded">{status}</p>
      )}
    </div>
  );
};

export default AttendanceHelper;