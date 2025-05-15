import React from 'react';
import { useAuth } from '../context/authContext';
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
        <div className="text-2xl text-blue-600 text-center mt-10">
            Welcome to Employee Dashboard, {user.name}
        </div>
    );
};

export default EmployeeDashboard;