import React from 'react'

const PersonalInfoForm = ({ data, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="relative group flex-1">
            <input 
                name="name" 
                id="name" 
                value={data?.name || ''} 
                onChange={onChange} 
                placeholder=" "
                className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-[#A6FF5D]/50 focus:bg-white/[0.07] transition-all duration-300 peer"
            />
            <label htmlFor="name" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#A6FF5D] cursor-text">
                Full Name
            </label>
        </div>
        
        <div className="relative group flex-1">
            <input 
                name="email" 
                id="email" 
                value={data?.email || ''} 
                onChange={onChange} 
                placeholder=" "
                className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-[#A6FF5D]/50 focus:bg-white/[0.07] transition-all duration-300 peer"
            />
            <label htmlFor="email" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#A6FF5D] cursor-text">
                Email Address
            </label>
        </div>

        <div className="relative group flex-1">
            <input 
                name="phone" 
                id="phone" 
                value={data?.phone || ''} 
                onChange={onChange} 
                placeholder=" "
                className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-[#A6FF5D]/50 focus:bg-white/[0.07] transition-all duration-300 peer"
            />
            <label htmlFor="phone" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#A6FF5D] cursor-text">
                Phone Number
            </label>
        </div>

        <div className="relative group flex-1">
            <input 
                name="address" 
                id="address" 
                value={data?.address || ''} 
                onChange={onChange} 
                placeholder=" "
                className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-[#A6FF5D]/50 focus:bg-white/[0.07] transition-all duration-300 peer"
            />
            <label htmlFor="address" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#A6FF5D] cursor-text">
                Address / Location
            </label>
        </div>

        <div className="relative group flex-1">
            <input 
                name="linkedin" 
                id="linkedin" 
                value={data?.linkedin || ''} 
                onChange={onChange} 
                placeholder=" "
                className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-[#A6FF5D]/50 focus:bg-white/[0.07] transition-all duration-300 peer"
            />
            <label htmlFor="linkedin" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#A6FF5D] cursor-text">
                LinkedIn Profile URL
            </label>
        </div>

        <div className="relative group flex-1">
            <input 
                name="portfolio" 
                id="portfolio" 
                value={data?.portfolio || ''} 
                onChange={onChange} 
                placeholder=" "
                className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-[#A6FF5D]/50 focus:bg-white/[0.07] transition-all duration-300 peer"
            />
            <label htmlFor="portfolio" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#A6FF5D] cursor-text">
                Portfolio / Website
            </label>
        </div>
    </div>
  )
}

export default PersonalInfoForm
