import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
    {
        name:"S No",
        selector: row => row.sno
    },
     {
        name:"Department Name",
        selector: row => row.dep_name
    },
     {
        name:"Action",
        selector: row => row.action
    }
]

export const DepartmentButtons = ({_id,onDepartmentDelete}) => {
    const navigate = useNavigate();
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
               
                if (response.data.success) {
                    onDepartmentDelete(id);
                    alert("Department deleted successfully");
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.error('Error deleting department:', error);
                alert("An unexpected error occurred.");
            }
        }
    };
    return (
        <div className="flex space-x-3">
            <button
                className="px-4 py-1 bg-green-500 text-white hover:bg-green-600 transition-colors"
                onClick={() => navigate(`/AdminDashboard/department/${_id}`)}
            >
                Edit
            </button>
            <button
                className="px-4 py-1 bg-red-500 text-white hover:bg-red-600 transition-colors"
                onClick={() => handleDelete(_id)}
            >
                Delete
            </button>
        </div>
    );
};