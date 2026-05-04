import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Dnavbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        // No need to navigate here; ProtectedRoute will automatically
        // redirect to /login because isAuthenticated becomes false.
    }

    return (
        <nav className="w-full bg-black/80 backdrop-blur-md border-b border-white/10 py-3 sticky top-0 z-50 no-print">
            <div className="flex items-center justify-between px-6 md:px-12 w-full max-w-[1600px] mx-auto">
                
                {/* Logo */}
                <Link to="/app" className="text-xl md:text-2xl font-bold text-white transition-colors duration-300 hover:text-[#A6FF5D]">
                    ResumeBuilder
                </Link>

                <div className="flex items-center gap-6">
                    {/* User Profile / Name */}
                    {user && (
                        <div className="hidden md:flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#A6FF5D]/20 border border-[#A6FF5D]/50 flex items-center justify-center text-[#A6FF5D] font-bold text-sm">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span className="text-sm font-medium text-white/90">
                                {user.name || 'Dashboard User'}
                            </span>
                        </div>
                    )}

                    {/* Logout Button */}
                    <button 
                        onClick={handleLogout}
                        className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-full text-sm font-medium transition duration-300 flex items-center gap-2"
                    >
                        <span>Logout</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                    </button>
                </div>

            </div>
        </nav>
    )
}

export default Dnavbar
