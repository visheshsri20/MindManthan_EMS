import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoute from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import AddSalary from './components/salary/Add';
import Summary from './components/EmployeeDashboard/Summary';
import LeaveList from './components/leave/List';
import AddLeave from './components/leave/Add';
import Setting from './components/EmployeeDashboard/Setting';


import './index.css'; // Tailwind CSS
import PrivateRoutes from './utils/PrivateRoutes';
import Table from './components/leave/Table';
import Detail from './components/leave/Detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard with nested routes */}
        <Route
          path="/AdminDashboard"
          element={
            <PrivateRoute>
              <RoleBaseRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoute>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="department/:id" element={<EditDepartment />} />

          <Route path="add-employee" element={<Add />} />
          <Route path="employees" element={<List />} />
          <Route path="employees/:id" element={<View />} />
          <Route path="employees/edit/:id" element={<Edit />} />
          
          <Route path="salary/Add" element={<AddSalary />} />
          
          <Route path="leaves" element={<Table />} />
          <Route path="leaves/:id" element={<Detail />} />
        </Route>


        <Route path="/EmployeeDashboard" element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={['admin','employee']}>
                <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
          } >
          <Route index element={<Summary />} />
          <Route path="/EmployeeDashboard/profile/:id" element={<View/>} />
          <Route path="/EmployeeDashboard/leaves" element={<LeaveList />} />
          <Route path="/EmployeeDashboard/leaves/add" element={<AddLeave />} />
          <Route path="/EmployeeDashboard/settings" element={<Setting/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
