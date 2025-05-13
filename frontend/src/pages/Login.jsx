import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import loginBg from '../assets/images/login_bg.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (remember) {
      Cookies.set('email', email, { expires: 7 });
      Cookies.set('password', password, { expires: 7 });
    } else {
      Cookies.remove('email');
      Cookies.remove('password');
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/auth/login`,
        { email, password }
      );

      const token = response.data.token;
      localStorage.setItem('token', token);
      alert('Login successful!');
      navigate('/dashboard'); 
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image using <img /> */}
      <img
        src={loginBg}
        alt="Login Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-90"
      />

      {/* Split Color Overlay */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#007BFF] z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-0" />

      {/* Login Card */}
      <div className="relative z-10 bg-white border border-gray-300 shadow-lg rounded-xl p-8 w-full max-w-sm">
        <h1
          className="text-3xl text-center mb-6 text-[#007BFF]"
          style={{ fontFamily: 'monotype corsiva' }}
        >
          MindManthan EMS
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
          <div>
            <label className="block font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              placeholder="Enter your email"
              required
              aria-label="Email"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              placeholder="Enter your password"
              required
              aria-label="Password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="form-checkbox accent-[#007BFF]"
              />
              <span>Remember Me</span>
            </label>
            <a href="#" className="text-[#007BFF] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className={`w-full bg-[#007BFF] text-white py-2 rounded transition ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
