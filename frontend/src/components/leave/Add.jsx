import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId : user._id || '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        `https://employee-a0gcfmzec-visheshsri20s-projects.vercel.app//api/leave/add`,
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        alert('Leave request submitted successfully!');
        navigate('/EmployeeDashboard/leaves');
      } else {
        setError('Problem submitting leave request.');
      }
    } catch (err) {
      console.error('Error submitting leave:', err);
      setError('Error submitting leave request.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          {/* Leave Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
            <select
              name="leaveType"
               value={leave.leaveType || ''}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>
          {/* Dates Row */}
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input
                type="date"
                name="startDate"
                 value={leave.startDate || ''}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input
                type="date"
                name="endDate"
                 value={leave.endDate || ''}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="reason"
              rows="3"
              value={leave.reason || ''}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Reason"
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        {error && <p className="text-red-600 mt-4">{error}</p>}
        <button
          type="submit"
          className="mt-6 w-full px-6 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition text-lg font-semibold"
        >
          Submit Leave Request
        </button>
      </form>
    </div>
  );
};

export default Add;