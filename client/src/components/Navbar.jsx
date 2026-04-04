import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setMobileOpen(false);
    }
    const handleLogin = () => {
        setMobileOpen(false);
        navigate("/login");
    }

    return (
        <nav className={` w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-1' : 'bg-transparent py-4'}`}>
            <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 w-full max-w-[1400px] mx-auto">
                <Link to="/" className="text-2xl font-bold text-white transition-colors duration-300 hover:text-[#A6FF5D]">
                    ResumeBuilder
                </Link>
                <div id="menu" className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} max-md:fixed max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-black/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 text-sm`}>
                    <Link to="/feature" onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-[#A6FF5D] transition-colors duration-300">Features</Link>
                    <Link to="/contact" onClick={() => setMobileOpen(false)} className="text-white/70 hover:text-[#A6FF5D] transition-colors duration-300">Contact</Link>

                    {/* Login / Logout - conditional */}
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="text-white/70 hover:text-[#A6FF5D] transition-colors duration-300 cursor-pointer mr-6">Logout</button>
                    ) : (
                        <button className='bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-black px-6 py-2.5 rounded-full text-sm transition cursor-pointer group' onClick={handleLogin}>
                            Login
                        </button>
                    )}

                    <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-gray-900 hover:bg-[#A6FF5D] hover:text-black text-white p-2 rounded-md aspect-square font-medium transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                        </svg>
                    </button>

                    {/* Get Started / Dashboard - conditional */}
                    <div className='p-[0.5px] rounded-full bg-gradient-to-r from-white to-[#999999]/0'>
                        <Link to={isAuthenticated ? "/app" : "/register"} onClick={() => setMobileOpen(false)} className="hidden md:flex items-center gap-2 bg-[#A6FF5D] text-gray-800 font-medium px-4 py-2.5 rounded-full text-sm transition cursor-pointer group">
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.795.605v2.593m1.245-1.296h-2.488M1.845 13.565c.687 0 1.244-.58 1.244-1.296s-.557-1.296-1.244-1.296-1.244.58 1.244 1.296.557 1.296 1.244 1.296M6.209 1.13a.65.65 0 0 1 .214-.379.61.61 0 0 1 .795 0 .66.66 0 0 1 .214.38l.653 3.601c.047.256.166.492.343.676s.403.309.649.357l3.456.681a.62.62 0 0 1 .364.223.665.665 0 0 1 0 .828.62.62 0 0 1-.364.223l-3.456.681a1.23 1.23 0 0 0-.65.358c-.176.184-.295.42-.342.675l-.653 3.602a.65.65 0 0 1-.214.38.61.61 0 0 1-.795 0 .65.65 0 0 1-.214-.38l-.654-3.602a1.3 1.3 0 0 0-.342-.675 1.23 1.23 0 0 0-.649-.358l-3.456-.68a.62.62 0 0 1-.365-.224.665.665 0 0 1 0-.828.62.62 0 0 1 .365-.223l3.456-.68c.246-.05.472-.174.649-.358s.296-.42.342-.676z" stroke="#1e2939" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <div className="relative overflow-hidden">
                                <span className="block transition-transform duration-200 group-hover:-translate-y-full">
                                    {isAuthenticated ? 'Dashboard' : 'Get Started'}
                                </span>
                                <span className="absolute top-0 left-0 block transition-transform duration-200 group-hover:translate-y-0 translate-y-full">
                                    {isAuthenticated ? 'Dashboard' : 'Get Started'}
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>

                <button id="open-menu" onClick={() => setMobileOpen(true)}
                    className="md:hidden bg-gray-900 hover:bg-[#A6FF5D] hover:text-black text-white p-2 rounded-md aspect-square font-medium transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
                    </svg>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
