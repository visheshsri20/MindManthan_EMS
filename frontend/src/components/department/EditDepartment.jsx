import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [department, setDepartment] = useState({ dep_name: '', description: '' });
    const [depLoading, setDepLoading] = useState(false);

    useEffect(() => {
        const fetchDepartment = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    setDepartment(response.data.department);
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(error.response.data.error);
                } else {
                    alert("An unexpected error occurred.");
                }
                console.error('Error fetching department:', error);
            } finally {
                setDepLoading(false);
            }
        };
        fetchDepartment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({
            ...department,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })

            if (response.data.success) {
                navigate("/AdminDashboard/departments")
                alert("Department edited successfully")
            }
        }

        catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            } else {
                alert("Something went wrong. Please try again.");
                console.log(error);
            }
        }
    }


    return (
        <>{depLoading ? <div>Loading...</div> :
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-white shadow-md rounded-lg p-8 w-96">
                    <h3 className="text-xl font-semibold text-center mb-6">Edit Department</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700">
                                Department Name
                            </label>
                            <input
                                type="text"
                                name="dep_name"
                                onChange={handleChange}
                                value={department.dep_name}
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
                                value={department.description}
                                placeholder="Description"
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                                rows="4"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            Edit Department
                        </button>
                    </form>
                </div>
            </div>}</>
    )
}

export default EditDepartment