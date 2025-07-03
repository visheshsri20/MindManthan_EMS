import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

const authContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       // debugger ;
        const verifyUser = async () => {
            const token = localStorage.getItem('token');
           // console.log('Token from localStorage',token)
            if (token) {
                try {
                    const response = await axios.get('https://employee-a0gcfmzec-visheshsri20s-projects.vercel.app//api/auth/verify', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                   // console.log('Response from verify:', response.data);
                    if (response.data.success) {
                        setUser(response.data.user);
                    } else {
                        setUser(null);
                        setLoading(false);
                    }
                } catch (error) {
                    //console.error('Error during verification:', error.response?.data || error.message); // Log the error for debugging
                    setUser(null);
                }
             
            }
            setLoading(false);
            
        };
        verifyUser();
}, []);
    // console.log('User:', user);
    //console.log('Loading:', loading);    

    const login = (user,token) => {
        setUser(user);
        localStorage.setItem('token', token); 
        //console.log('User token:', localStorage.getItem('token'));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Clear token from local storage
    };

  // console.log('Token stored in localStorage:', localStorage.getItem('token'));

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

export default authContext;
export { useAuth };