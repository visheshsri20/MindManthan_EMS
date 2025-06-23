import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import heroLogo from '../../assets/images/hero-logo.png'; // Adjust path if needed

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        } else {
          setError('Employee not found.');
        }
      } catch (err) {
        console.error('Error fetching employee:', err);
        setError('Error fetching employee details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-bold">Employee Details</h3>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-bold">Employee Details</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-bold">Employee Details</h3>
        <p className="text-red-500">Employee data is not available.</p>
      </div>
    );
  }

  return (
    <div className="relative max-w-3xl mx-auto mt-10">
      {/* Card content with background logo */}
      <div className="relative bg-white p-8 rounded-md shadow-md overflow-hidden min-h-[500px]">
        {/* Background logo */}
        <img
          src={heroLogo}
          alt="Background Logo"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 object-contain opacity-30 pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        {/* Foreground content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-8 text-center">Employee Details</h2>
          <div className="flex flex-col items-center">
            <img
              src={`http://localhost:5000/uploads/${employee.userId?.profileImage || 'default-profile.png'}`}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover mb-6 border-4 border-gray-300"
            />
            <div className="w-full max-w-md">
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold">Name:</p>
                <p className="font-medium">{employee.userId?.name || 'N/A'}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold">Designation:</p>
                <p className="font-medium">{employee.designation || 'N/A'}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold">Employee ID:</p>
                <p className="font-medium">{employee.employeeId || 'N/A'}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold">Date of Birth:</p>
                <p className="font-medium">
                  {employee.dob ? new Date(employee.dob).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold">Gender:</p>
                <p className="font-medium">{employee.gender || 'N/A'}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold">Department:</p>
                <p className="font-medium">{employee.department?.dep_name || 'N/A'}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-lg font-bold">Marital Status:</p>
                <p className="font-medium">{employee.maritalStatus || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;