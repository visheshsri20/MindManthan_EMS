import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';
import heroLogo from '../../assets/images/hero-logo.png'; // <-- adjusted path

const Summary = () => {
  const { user } = useAuth();
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Function to get greeting based on current hour
  const getGreeting = () => {
    const hour = dateTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div
      className="min-h-[80vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroLogo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '40%',
        backgroundPosition: 'center',
      }}
    >
      <div className="pt-10 pl-10">
        <div className="rounded flex bg-white bg-opacity-90 shadow-lg w-fit">
          <div className="text-3xl flex justify-center items-center bg-teal-600 text-white px-4">
            <FaUser />
          </div>
          <div className="pl-4 py-1">
            <p className="text-lg font-semibold">{getGreeting()}</p>
            <p className="text-xl font-bold">{user.name}</p>
            <p className="text-gray-600 mt-2">
              {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;