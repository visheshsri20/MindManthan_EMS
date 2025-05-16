import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const RoleBaseRoutes = ({children, requiredRole}) => {
    const {user,loading} = useAuth()
    if(loading){
         <div>Loading...</div>
    }

    if(!requiredRole.includes(user.role)){
       <Navigate to="/unauthorized" />
    }
    
    if(!user){
         <Navigate to="/login" />
    } 
   return user ? children : <Navigate to="/login" />
}

export default RoleBaseRoutes