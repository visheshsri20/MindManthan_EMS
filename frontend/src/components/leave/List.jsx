import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const List = () => {
const {user} = useAuth()

  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch leave data from your backend
    const fetchLeaves = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/leave/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setLeaves(res.data.leaves || []);
      } catch (err) {
        setLeaves([]);
      }
    };
    fetchLeaves();
  }, []);

  // Filter leaves by search (optional)
  const filteredLeaves = leaves.filter(
    (leave) =>
      leave.leaveType.toLowerCase().includes(search.toLowerCase()) ||
      leave.reason.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-1 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link
          to="/EmployeeDashboard/leaves/add"
          className="px-4 py-1 bg-teal-600 rounded text-white hover:bg-teal-700 transition"
        >
          Add New Leave
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2 text-left">SNO</th>
              <th className="px-4 py-2 text-left">LEAVE TYPE</th>
              <th className="px-4 py-2 text-left">FROM</th>
              <th className="px-4 py-2 text-left">TO</th>
              <th className="px-4 py-2 text-left">DESCRIPTION</th>
              <th className="px-4 py-2 text-left">APPLIED DATE</th>
              <th className="px-4 py-2 text-left">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No leave requests found.
                </td>
              </tr>
            ) : (
              filteredLeaves.map((leave, idx) => (
                <tr key={leave._id} className="border-t">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{leave.leaveType}</td>
                  <td className="px-4 py-2">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{leave.reason}</td>
                  <td className="px-4 py-2">{new Date(leave.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{leave.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;