import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        
        // Mock API call
        setTimeout(() => {
            login({ email: formData.email, name: 'Demo User' })
            setLoading(false)
            navigate('/app') // Redirect to dashboard
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
            
            {/* Back Button */}
            <Link to="/" className="absolute top-6 left-6 md:top-10 md:left-10 z-20 text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                <span className="text-sm font-medium">Back to Home</span>
            </Link>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A6FF5D]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-10">
                    <Link to="/" className="text-3xl font-bold text-white transition-colors hover:text-[#A6FF5D]">
                        ResumeBuilder
                    </Link>
                    <p className="text-gray-400 mt-3 text-sm">Welcome back! Please enter your details.</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        
                        {/* Floating Label Input for Email */}
                        <div className="relative group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-[#A6FF5D]/50 focus:bg-white/[0.07] transition-all duration-300 peer"
                            />
                            <label
                                htmlFor="email"
                                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#A6FF5D] cursor-text"
                            >
                                Email Address
                            </label>
                        </div>

                        {/* Floating Label Input for Password */}
                        <div className="relative group">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder=" "
                                className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-[#A6FF5D]/50 focus:bg-white/[0.07] transition-all duration-300 peer pr-12"
                            />
                            <label
                                htmlFor="password"
                                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#A6FF5D] cursor-text"
                            >
                                Password
                            </label>
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                            >
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                )}
                            </button>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-900 accent-[#A6FF5D] cursor-pointer" />
                                <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-xs text-[#A6FF5D] hover:underline">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-black font-semibold px-6 py-3.5 rounded-full text-sm transition-all duration-300 cursor-pointer active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                    </form>

                    <div className="mt-8 text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[#A6FF5D] hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login