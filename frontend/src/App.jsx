import { useState } from 'react'
import {BrowserRouter, Routes ,Route,Navigate} from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import './index.css'; // Import Tailwind CSS

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/AdminDashboard" element={<AdminDashboard/>}></Route>
      <Route path="/EmployeeDashboard" element={<EmployeeDashboard/>}></Route>
    
    </Routes>
    </BrowserRouter>
  )
}

export default App
