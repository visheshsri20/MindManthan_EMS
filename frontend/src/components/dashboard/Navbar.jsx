import React from 'react'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
    const { user } = useAuth()
return (
    <div className='flex justify-between items-center h-12 bg-[#007BFF] px-4 text-white'>
        <p>Welcome! {user?.name || 'Guest'} </p>
        <button className='bg-[#66B2FF] px-2 py-1 rounded text-white hover:bg-[#3399FF]'>
            Logout
        </button>
    </div>
)
}

export default Navbar