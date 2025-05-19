import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import AdminSummary from '../components/dashboard/AdminSummary';
import {Outlet} from 'react-router-dom';

const AdminDashboard = () => {
    const { user, loading } = useAuth(); // Import loading from AuthContext

    if (loading) {
        return <div>Loading...</div>; // Show a loading message while verifying the user
    }

    if (!user) {
        return (
            <div className="text-2xl text-red-600 text-center mt-10">
                You are not logged in. Please log in to access the dashboard.
            </div>
        );
    }

    return (
        <div>
            <AdminSidebar />
            <div className='flex-1 ml-64 bg-gray-100 h-screen'> 
                <Navbar />
               <Outlet />
            </div>
            
        </div>
    );
};

export default AdminDashboard;
