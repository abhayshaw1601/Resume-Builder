import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const PublicLayout = () => {
    const location = useLocation()
    
    // Check if the current route is exactly the home page
    const isHomePage = location.pathname === '/'

    return (
        <div className="flex flex-col min-h-screen bg-black">
            <Navbar />
            
            {/* If it's not the home page, add padding to account for the fixed navbar */}
            <main className={`flex-grow ${!isHomePage ? 'pt-24' : ''}`}>
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default PublicLayout
