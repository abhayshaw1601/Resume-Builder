import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
// import Navbar from '../Navbar'

const Hero = () => {
    const { isAuthenticated } = useAuth();

    return (
        <>
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
                    *{
                        font-family: "Poppins", sans-serif;
                    }
                    @keyframes rotate {
                        100% {
                            transform: rotate(1turn);
                        }
                    }

                    .rainbow::before {
                        content: '';
                        position: absolute;
                        z-index: -2;
                        left: -50%;
                        top: -50%;
                        width: 200%;
                        height: 200%;
                        background-position: 100% 50%;
                        background-repeat: no-repeat;
                        background-size: 50% 30%;
                        filter: blur(6px);
                        background-image: linear-gradient(#FFF);
                        animation: rotate 4s linear infinite;
                    }
                `}
            </style>

            <header className='min-h-[100dvh] relative bg-black text-white flex flex-col items-center justify-center pt-10 md:pt-20 bg-[url("https://assets.prebuiltui.com/images/components/hero-section/hero-background-image.png")] bg-cover bg-center bg-no-repeat pb-28 md:pb-10 w-full'>
                {/* <Navbar /> */}

                <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-px flex items-center justify-center rounded-full transition duration-300 active:scale-100 mt-28 md:mt-32">
                    <button className="flex items-center justify-center gap-3 pl-4 pr-6 py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur">
                        <div className="relative flex size-3.5 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#A6FF5D] opacity-75 animate-ping duration-300"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-[#A6FF5D]"></span>
                        </div>
                        <span className='text-xs'>Create Professional Resumes in Minutes</span>
                    </button>
                </div>

                <h1 className="text-4xl md:text-[64px]/[82px] text-center max-w-4xl mt-5 bg-clip-text leading-tight px-4">
                    Build Your Dream Career with a Perfect Resume
                </h1>
                <p className="text-sm md:text-base text-gray-300 bg-clip-text text-center max-w-lg mt-4.5 px-4">
                    Create stunning, professional resumes that stand out. Choose from modern templates, customize with ease, and land your dream job.
                </p>

                <div className='flex gap-3 mt-8'>
                    <Link to={isAuthenticated ? "/app" : "/register"} className="bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-800 px-6 py-2.5 rounded-full text-sm transition cursor-pointer group">
                        <div className="relative overflow-hidden">
                            <span className="block transition-transform duration-200 group-hover:-translate-y-full">
                                {isAuthenticated ? 'Go to Dashboard' : 'Start Building Now'}
                            </span>
                            <span className="absolute top-0 left-0 block transition-transform duration-200 group-hover:translate-y-0 translate-y-full">
                                {isAuthenticated ? 'Go to Dashboard' : 'Start Building Now'}
                            </span>
                        </div>
                    </Link>
                    <div className="bg-white/15 hover:bg-white/10 p-px flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                        <button className="px-6 text-sm py-3 text-white rounded-full bg-white/5 cursor-pointer">
                            View Templates
                        </button>
                    </div>
                </div>

                <div className="flex flex-row items-center justify-center gap-10 md:gap-20 mx-auto mt-17 px-4 flex-wrap">
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-[#A6FF5D]">10K+</div>
                        <div className="text-sm text-gray-400">Resumes Created</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-[#A6FF5D]">50+</div>
                        <div className="text-sm text-gray-400">Templates</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-[#A6FF5D]">4.9★</div>
                        <div className="text-sm text-gray-400">User Rating</div>
                    </div>
                </div>


            </header>
        </>
    )
}

export default Hero
