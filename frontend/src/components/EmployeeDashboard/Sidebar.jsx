import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaCalendarAlt, FaClipboardList, FaCogs, FaMoneyCheckAlt } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const Sidebar = () => {
    const {user} = useAuth()
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-[#007BFF] h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific" style={{ fontFamily: 'Pacifico, cursive' }}>
          MindManthan Mantis
        </h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/EmployeeDashboard"
          className={({ isActive }) =>
            `${isActive ? 'bg-[#007BFF]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-blue-400`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={`/EmployeeDashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${isActive ? 'bg-[#007BFF]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-blue-400`
          }
        >
          <FaUser />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to="/EmployeeDashboard/leaves"
          className={({ isActive }) =>
            `${isActive ? 'bg-[#007BFF]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-blue-400`
          }
        >
          <FaCalendarAlt />
          <span>Leave Status</span>
        </NavLink>
        <NavLink
          to="/EmployeeDashboard/salary"
          className={({ isActive }) =>
            `${isActive ? 'bg-[#007BFF]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-blue-400`
          }
        >
          <FaMoneyCheckAlt />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/EmployeeDashboard/attendance"
          className={({ isActive }) =>
            `${isActive ? 'bg-[#007BFF]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-blue-400`
          }
        >
          <FaClipboardList />
          <span>Attendance</span>
        </NavLink>
        <NavLink
          to="/EmployeeDashboard/settings"
          className={({ isActive }) =>
            `${isActive ? 'bg-[#007BFF]' : ''} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-blue-400`
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;