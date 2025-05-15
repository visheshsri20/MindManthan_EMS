import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:5000/api/auth/verify', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.data.success) {
                        setUser(response.data.user);
                    } else {
                        setUser(null);
                    }
                } catch (err) {
                    console.error(err); // Log the error for debugging
                    setUser(null);
                }
            }
            setLoading(false); // Set loading to false after verification
        };

        verifyUser();
    }, []);

    const login = (user) => {
        setUser(user);
        localStorage.setItem('token', user.token); // Save token to local storage
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Clear token from local storage
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the AuthContext
const useAuth = () => useContext(UserContext);

export default AuthContext;
export { useAuth };