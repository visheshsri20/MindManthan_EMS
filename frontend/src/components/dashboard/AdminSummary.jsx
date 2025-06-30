import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import { FaUsers, FaBuilding, FaMoneyBillWave, FaFileAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';

const AdminSummary = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  // const [monthlySalary, setMonthlySalary] = useState(0); // Still in working mode
  const [leaveStats, setLeaveStats] = useState({
    applied: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    // Fetch total employees
    axios.get('http://localhost:5000/api/employee', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => setTotalEmployees(res.data.employees?.length || 0))
      .catch(() => setTotalEmployees(0));

    // Fetch total departments
    axios.get('http://localhost:5000/api/department', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => setTotalDepartments(res.data.departments?.length || 0))
      .catch(() => setTotalDepartments(0));

    // Fetch leave stats
    axios.get('http://localhost:5000/api/leave', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        const leaves = res.data.leaves || [];
        setLeaveStats({
          applied: leaves.length,
          approved: leaves.filter(l => l.status === 'Approved').length,
          pending: leaves.filter(l => l.status === 'Pending').length,
          rejected: leaves.filter(l => l.status === 'Rejected').length,
        });
      })
      .catch(() => setLeaveStats({
        applied: 0, approved: 0, pending: 0, rejected: 0
      }));

    // Fetch monthly salary (commented out)
    // axios.get('http://localhost:5000/api/salary/total', {
    //   headers: {
    //     "Authorization": `Bearer ${localStorage.getItem('token')}`
    //   }
    // })
    //   .then(res => setMonthlySalary(res.data.totalSalary || 0))
    //   .catch(() => setMonthlySalary(0));
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={totalEmployees} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={totalDepartments} color="bg-yellow-600" />
        {/* <SummaryCard icon={<FaMoneyBillWave />} text="Monthly Salary" number={`$${monthlySalary}`} color="bg-blue-600" /> */}
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard icon={<FaFileAlt />} text="Leave Applied" number={leaveStats.applied} color="bg-teal-600" />
          <SummaryCard icon={<FaCheckCircle />} text="Leave Approved" number={leaveStats.approved} color="bg-green-600" />
          <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending" number={leaveStats.pending} color="bg-yellow-600" />
          <SummaryCard icon={<FaTimesCircle />} text="Leave Rejected" number={leaveStats.rejected} color="bg-red-600" />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;