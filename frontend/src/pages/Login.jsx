import React, { useState } from 'react';
import axios from 'axios';
import loginBg from '../assets/images/login_bg.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //setError(null); 
    try {
      const response = await axios.post(
        'https://employee-a0gcfmzec-visheshsri20s-projects.vercel.app//api/auth/login',
        { email, password }
       ); 
       
      if (response.data.success) {
      //  console.log('Response:', response.data);
        login(response.data.user, response.data.token); 
        alert('Login successful!');
        // if (rememberMe) {
        //   localStorage.setItem('email', email); 
        // } else {
        //   localStorage.removeItem('email'); 
        // }

        if (response.data.user.role === 'admin') {
        navigate('/AdminDashboard'); // Redirect to AdminDashboard
        }
        else {
          navigate('/EmployeeDashboard'); // Redirect to UserDashboard
        }
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error); // Display backend error
      } else {
        setError('An unexpected error occurred. Please try again later.');
        console.error('Error:', error); 
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={loginBg}
        alt="Login Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-90"
      />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#007BFF] z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-0" />

      {/* Login Form */}
      <div className="relative z-10 bg-white border border-gray-300 shadow-lg rounded-xl p-8 w-full max-w-sm">
        {/* Title */}
        <h1
          className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 text-3xl text-white z-20 whitespace-nowrap"
          style={{ fontFamily: 'Pacifico, cursive' }}
        >
          MindManthan EMS
        </h1>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
          {/* Email Input */}
          <div>
            <label className="block font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              placeholder="Enter your email"
              required
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              placeholder="Enter your password"
              required
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="mr-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe" className="text-sm">
              Remember Me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#007BFF] text-white py-2 rounded transition hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {/* Forgot Password Button */}
        <div className="text-center mt-4">
          <button
            className="text-sm text-[#007BFF] hover:underline"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;