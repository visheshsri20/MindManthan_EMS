import {BrowserRouter, Routes ,Route,Navigate} from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import PrivateRoute from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import './index.css'; // Import Tailwind CSS
import DepartmentList from './components/department/DepartmentList';
import AddDepartment from './components/department/AddDepartment';

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/AdminDashboard" element={
         <PrivateRoute>
            <RoleBaseRoutes requiredRole={["admin"]}>
                  <AdminDashboard/>
           </RoleBaseRoutes>
           </PrivateRoute>
        
      }>
          
         <Route index element ={<AdminSummary/>}></Route> 
         <Route path="/AdminDashboard/departments" element={<DepartmentList/>}></Route> 
         <Route path="/AdminDashboard/add-department" element={<AddDepartment/>}></Route> 
          </Route>
      <Route path="/EmployeeDashboard" element={<EmployeeDashboard/>}></Route>
    
    </Routes>
    </BrowserRouter>
  )
}

export default App
