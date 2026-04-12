import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white pt-16 pb-8 border-t border-white/10">
            <div className="max-w-[1400px] mx-auto px-4 md:px-16 lg:px-24 xl:px-32">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
                    
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <Link to="/" className="text-2xl font-bold text-white transition-colors duration-300 hover:text-[#A6FF5D]">
                            ResumeBuilder
                        </Link>
                        <p className="text-gray-400 mt-4 text-sm max-w-sm leading-relaxed">
                            Create stunning, professional resumes that stand out. Choose from modern templates, customize with ease, and land your dream job.
                        </p>
                        <div className="flex gap-4 mt-6">
                            {/* Social Icons (Placeholders) */}
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#A6FF5D]/10 hover:text-[#A6FF5D] transition-all duration-300">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#A6FF5D]/10 hover:text-[#A6FF5D] transition-all duration-300">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#A6FF5D]/10 hover:text-[#A6FF5D] transition-all duration-300">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                        </div>
                    </div>

                    {/* Links Section 1 */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="flex flex-col gap-3">
                            <li><Link to="/feature" className="text-gray-400 hover:text-[#A6FF5D] text-sm transition-colors duration-300">Features</Link></li>
                            <li><Link to="/templates" className="text-gray-400 hover:text-[#A6FF5D] text-sm transition-colors duration-300">Templates</Link></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#A6FF5D] text-sm transition-colors duration-300">Pricing</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#A6FF5D] text-sm transition-colors duration-300">Examples</a></li>
                        </ul>
                    </div>

                    {/* Links Section 2 */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="flex flex-col gap-3">
                            <li><Link to="/contact" className="text-gray-400 hover:text-[#A6FF5D] text-sm transition-colors duration-300">Contact Us</Link></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#A6FF5D] text-sm transition-colors duration-300">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#A6FF5D] text-sm transition-colors duration-300">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-[#A6FF5D] text-sm transition-colors duration-300">Terms of Service</a></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-xs text-center md:text-left">
                        &copy; {currentYear} ResumeBuilder. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-gray-500">
                        <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
                        <a href="#" className="hover:text-white transition-colors duration-300">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
