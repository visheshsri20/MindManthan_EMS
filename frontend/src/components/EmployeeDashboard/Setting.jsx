import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (setting.newPassword !== setting.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    try {
      const res = await axios.put(
        "https://employee-a0gcfmzec-visheshsri20s-projects.vercel.app//api/setting/change-password",
        {
          userId: setting.userId,
          oldPassword: setting.oldPassword,
          newPassword: setting.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setError("Password changed successfully!");
        setSetting({
          userId: user._id,
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setError(res.data.error || "Failed to change password.");
      }
    } catch (err) {
      setError("Error changing password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            className="w-full px-4 py-2 border rounded-md"
            value={setting.oldPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
          <input
            type="password"
            name="newPassword"
            className="w-full px-4 py-2 border rounded-md"
            value={setting.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full px-4 py-2 border rounded-md"
            value={setting.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error && (
          <div className={`text-center mt-2 ${error === "Password changed successfully!" ? "text-green-600" : "text-red-600"}`}>
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full px-6 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition text-lg font-semibold"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Setting;