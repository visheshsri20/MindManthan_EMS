import React from 'react';
import { useAuth } from '../context/authContext';
import Sidebar from '../components/EmployeeDashboard/Sidebar';
import Navbar from '../components/dashboard/Navbar';
import { Outlet } from 'react-router-dom';

const EmployeeDashboard = () => {
    const { user } = useAuth();


    if (!user) {
        return (
            <div className="text-2xl text-red-600 text-center mt-10">
                You are not logged in. Please log in to access the dashboard.
            </div>
        );
    }

    return (
        <div>
            <Sidebar />
            <div className='flex-1 ml-64 bg-gray-100 h-screen'> 
                <Navbar />
               <Outlet />
            </div>
            
        </div>
    );
};

export default EmployeeDashboard;