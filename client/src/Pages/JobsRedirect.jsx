import React from 'react'
import { useAuth } from '../Context/AuthContext'
import { Navigate } from 'react-router-dom';

const JobsRedirect = () => {
    const { user } = useAuth();

    if (user?.role === "recruiter") {
        return <Navigate to="/myjobs" replace />
    }

    return <Navigate to="/jobs/list" replace />
}

export default JobsRedirect