import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import heroLogo from '../../assets/images/hero-logo.png';

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/leave/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          setLeave(response.data.leave);
        } else {
          setError('Leave not found.');
        }
      } catch (err) {
        setError('Error fetching leave details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeave();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-bold">Leave Details</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-bold">Leave Details</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!leave || !leave.userId) {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-bold">Leave Details</h3>
        <p className="text-red-500">Employee data is not available.</p>
      </div>
    );
  }

  const user = leave.userId;
  const numDays =
    leave.startDate && leave.endDate
      ? Math.ceil(
          (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)
        ) + 1
      : 'N/A';

const changeStatus = async (id, status) => {
  try {
    const response = await axios.put(`http://localhost:5000/api/leave/${id}`, { status }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.data.success) {
      alert(`Leave status updated to ${status}`);
      window.location.reload(); // Reload to fetch updated data
    } else {
      alert('Failed to update leave status.');
    }
  } catch (error) {
    alert(error.response?.data?.error || 'Error updating leave status');
  }
}


  return (
    <div className="relative max-w-3xl mx-auto mt-10">
      <div className="relative bg-white p-8 rounded-md shadow-md overflow-hidden min-h-[500px]">
        <img
          src={heroLogo}
          alt="Background Logo"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 object-contain opacity-30 pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-700">Leave Details</h2>
          <div className="flex flex-col items-center">
            <img
              src={`http://localhost:5000/uploads/${user.profileImage || 'default-profile.png'}`}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover mb-6 border-4 border-green-400"
            />
            <div className="w-full max-w-md">
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold text-green-700">Name:</p>
                <p className="font-medium">{user.name || 'N/A'}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold text-green-700">Email:</p>
                <p className="font-medium">{user.email || 'N/A'}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold text-green-700">Leave Type:</p>
                <p className="font-medium">{leave.leaveType || 'N/A'}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold text-green-700">Description:</p>
                <p className="font-medium">{leave.reason || 'N/A'}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold text-green-700">Start Date:</p>
                <p className="font-medium">
                  {leave.startDate ? new Date(leave.startDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold text-green-700">End Date:</p>
                <p className="font-medium">
                  {leave.endDate ? new Date(leave.endDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold text-green-700">Number of Days:</p>
                <p className="font-medium">{numDays}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold text-green-700">{leave.status === "Pending" ? "Action":"Status:"}</p>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button className="px-4 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
                    onClick={()=> changeStatus(leave._id,"Approved")}>Approve</button>
                    <button className="px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                    onClick={()=> changeStatus(leave._id,"Rejected")}>Reject</button>
                  </div>
                ) : (
                  <p className={`font-medium ${leave.status === "Approved" ? "text-green-600" : leave.status === "Rejected" ? "text-red-600" : ""}`}>
                    {leave.status || 'N/A'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;