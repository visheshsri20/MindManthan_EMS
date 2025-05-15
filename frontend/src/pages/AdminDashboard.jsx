import React from 'react';
import { useAuth } from '../context/authContext';

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
        <div className="text-2xl text-green-600 text-center mt-10">
            Welcome to the Admin Dashboard, {user.name}!
        </div>
    );
};

export default AdminDashboard;
