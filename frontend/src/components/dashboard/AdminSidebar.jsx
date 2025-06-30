import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-[#007BFF] h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific" style={{ fontFamily: 'Pacifico, cursive' }}>
         MindManthan Mantis
        </h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/AdminDashboard"
          className={({ isActive }) =>
            `${isActive ? 'bg-[#007BFF]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded  hover:bg-blue-400`}
          end
          
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/AdminDashboard/employees"
          className={({ isActive }) =>
            `${isActive ? 'bg-[#007BFF]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded  hover:bg-blue-400`
          }
          end
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="/AdminDashboard/departments"
          className={({ isActive }) =>
            `${isActive ? 'bg-[#007BFF]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded  hover:bg-blue-400`
          }>
          <FaBuilding />
          <span>Departments</span>
        </NavLink>
        <NavLink
          to="/AdminDashboard/leaves"
         className={({ isActive }) =>
            `${isActive ? 'bg-[#007BFF]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded  hover:bg-blue-400`
          }>
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to="/AdminDashboard/salary/Add"
           className={({ isActive }) =>
            `${isActive ? 'bg-[#007BFF]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded  hover:bg-blue-400`
          }>
          <FaMoneyBillWave />
          <span>Payroll</span>
        </NavLink>
        <NavLink
          to="/AdminDashboard/Settings"
          className="flex items-center space-x-4 py-2.5 px-4 rounded  hover:bg-blue-400"
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;