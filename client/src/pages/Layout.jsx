import React from 'react'
import { Outlet } from 'react-router-dom'
import Dnavbar from '../components/Dnavbar'

const Layout = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Dnavbar />
      <main className="flex-grow p-4 md:p-8 w-full max-w-[1600px] mx-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout