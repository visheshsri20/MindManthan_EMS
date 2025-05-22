import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const columns = [
  {
    name: 'S.No',
    selector: (row) => row.sno,
    sortable: true,
    width: "80px"
  },
  {
    name: 'Image',
    selector: (row) => row.image ? (
      <img
        src={`http://localhost:5000/uploads/${row.image}`}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
    ) : (
      <span className="text-gray-400">No Image</span>
    ),
    width: "70px"
  },
   {
    name: 'Employee Name',
    selector: (row) => row.name,
    sortable: true,
    width: "140px"
  },
  {
    name: 'Department Name',
    selector: (row) => row.dep_name,
    width: "150px"
    
  },
 {
    name: 'Date of Birth',
    selector: (row) => row.dob,
    
  },
  
  {
    name: 'Action',
    selector: (row) => row.action,
  },
];

export const fetchDepartments = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/department', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.data.success) {
      return response.data.departments;
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const EmployeeButtons = ({_id}) => {
    const navigate = useNavigate();

   
    return (
        <div className="flex space-x-3">
            <button
                className="px-4 py-1 bg-green-500 text-white hover:bg-green-600 transition-colors"
                onClick={() => navigate(`/AdminDashboard/employees/${_id}`)}
            >
                View
            </button>
            <button
                className="px-4 py-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              
            >
                Edit
            </button>
            <button
                className="px-4 py-1 bg-green-500 text-white hover:bg-green-600 transition-colors"
              
            >
                Salary
            </button>
            <button
                className="px-4 py-1 bg-red-500 text-white hover:bg-red-600 transition-colors"
               
            >
                Leave
            </button>
        </div>
    );
};