import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { columns } from '../../utils/LeaveHelper';
import axios from 'axios';
import { LeaveButtons } from '../../utils/LeaveHelper';

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/leave', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          id: leave._id,
          sno: sno++,
          name: leave.userId?.name || '',
          email: leave.userId?.email || '',
          leaveType: leave.leaveType || '',
          startDate: leave.startDate ? new Date(leave.startDate).toLocaleDateString() : '',
          endDate: leave.endDate ? new Date(leave.endDate).toLocaleDateString() : '',
          days: Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)) + 1,
          status: leave.status || 'Pending',
          action: (<LeaveButtons _id={leave._id} />)
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Error fetching Employees");
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Filter leaves whenever search or statusFilter changes
  useEffect(() => {
    let data = leaves;

    if (statusFilter !== 'All') {
      data = data.filter(leave => leave.status === statusFilter);
    }

    if (search.trim() !== '') {
      data = data.filter(leave =>
        leave.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredLeaves(data);
  }, [search, statusFilter, leaves]);

  return (
    <div>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Leave Management</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name"
          className="px-4 py-0.5 border"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="space-x-3">
          <button
            className={`px-2 py-1 ${statusFilter === 'Pending' ? 'bg-teal-800' : 'bg-teal-600'} text-white hover:bg-teal-700`}
            onClick={() => setStatusFilter('Pending')}
          >
            Pending
          </button>
          <button
            className={`px-2 py-1 ${statusFilter === 'Approved' ? 'bg-teal-800' : 'bg-teal-600'} text-white hover:bg-teal-700`}
            onClick={() => setStatusFilter('Approved')}
          >
            Approved
          </button>
          <button
            className={`px-2 py-1 ${statusFilter === 'Rejected' ? 'bg-teal-800' : 'bg-teal-600'} text-white hover:bg-teal-700`}
            onClick={() => setStatusFilter('Rejected')}
          >
            Rejected
          </button>
          <button
            className={`px-2 py-1 ${statusFilter === 'All' ? 'bg-teal-800' : 'bg-teal-600'} text-white hover:bg-teal-700`}
            onClick={() => setStatusFilter('All')}
          >
            All
          </button>
        </div>
      </div>
      <div className="mt-3"></div>
      <DataTable columns={columns} data={filteredLeaves} pagination />
    </div>
  );
};

export default Table;