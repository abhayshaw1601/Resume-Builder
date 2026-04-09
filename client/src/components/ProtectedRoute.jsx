import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth()
    const location = useLocation()

    // While checking auth state, show nothing (prevents flash)
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-[#A6FF5D] animate-spin" />
            </div>
        )
    }

    if (!isAuthenticated) {
        // Save the attempted URL so we can redirect back after login
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}

export default ProtectedRoute
