import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const PrivateRoutes = ({children}) => {
 const {user,loading} = useAuth()
 //console.log(user);

 if(loading){
    return <div>Loading...</div>
 }  

 return user ? children : <Navigate to="/login" />
}

export default PrivateRoutes