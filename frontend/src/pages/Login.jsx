import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import loginBg from '../assets/images/login_bg.jpg'; // adjust if needed

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const savedEmail = Cookies.get('email');
    const savedPassword = Cookies.get('password');

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRemember(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (remember) {
      Cookies.set('email', email, { expires: 7 });
      Cookies.set('password', password, { expires: 7 });
    } else {
      Cookies.remove('email');
      Cookies.remove('password');
    }

    console.log('Logging in with', { email, password });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image using <img /> */}
      <img
        src={loginBg}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
              placeholder="Enter your password"
              required
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
            className="w-full bg-[#007BFF] text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
