import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDepartment = () => {
    const [department, setDepartment ] = useState({
        dep_name : '',
        description : '' 
    })

    const navigate = useNavigate();

    const handleChange =(e) => {
        const {name,value}=e.target ;
        setDepartment({
            ...department,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
try {   
            const response = await axios.post('https://employee-a0gcfmzec-visheshsri20s-projects.vercel.app//api/department/add',department,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
                })

                if(response.data.success) {
                    navigate("/AdminDashboard/departments")
                    alert("Department added successfully")
                }
}

catch(error) {
   if(error.response && !error.response.data.success) {
      alert(error.response.data.error)
   } else {
      alert("Something went wrong. Please try again.");
      console.log(error);
   }
}
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-96">
                <h3 className="text-xl font-semibold text-center mb-6">Add New Department</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700">
                            Department Name
                        </label>
                        <input
                            type="text"
                            name="dep_name"
                            onChange={handleChange}
                            placeholder="Department Name"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                          
                            name="description"
                            onChange={handleChange}
                            placeholder="Description"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                            rows="4"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                        Add Department
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDepartment;