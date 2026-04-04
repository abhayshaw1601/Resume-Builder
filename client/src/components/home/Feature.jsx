import React from 'react'

const features = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A6FF5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18" /><path d="M3 12h18" />
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
        ),
        title: 'Multiple Templates',
        description: 'Choose from 50+ professionally designed resume templates. Modern, classic, minimal — find the perfect style for your industry.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A6FF5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 0-4 4c0 2 1.5 3.5 4 5.5 2.5-2 4-3.5 4-5.5a4 4 0 0 0-4-4z" />
                <path d="M8.5 14.5A7 7 0 0 0 5 21h14a7 7 0 0 0-3.5-6.5" />
                <path d="M16 11l2 2 4-4" />
            </svg>
        ),
        title: 'AI-Powered Writing',
        description: 'Let AI help you craft compelling professional summaries, skill descriptions, and experience bullet points in seconds.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A6FF5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M9 15l2 2 4-4" />
            </svg>
        ),
        title: 'One-Click Export',
        description: 'Download your resume as a high-quality PDF instantly. Optimized formatting ensures your resume looks perfect everywhere.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A6FF5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        title: 'Live Preview',
        description: 'See your resume update in real-time as you edit. What you see is exactly what you get — no surprises when you download.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A6FF5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
        title: 'Build in Minutes',
        description: 'Our intuitive drag-and-drop builder lets you create a professional resume in under 10 minutes. No design skills needed.',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A6FF5D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        ),
        title: 'ATS-Friendly',
        description: 'All templates are optimized for Applicant Tracking Systems. Ensure your resume passes automated filters and reaches recruiters.',
    },
]

const Feature = () => {
    return (
        <section id="features" className="bg-black text-white py-20 md:py-28 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#A6FF5D]"></div>
                        <span className="text-xs text-white/60 tracking-wide uppercase">Why Choose Us</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                        Everything You Need to
                        <span className="text-[#A6FF5D]"> Land Your Dream Job</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
                        Powerful features designed to make resume building effortless. From AI assistance to ATS optimization — we've got you covered.
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-7 md:p-8 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 cursor-default"
                        >
                            {/* Hover glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#A6FF5D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-[#A6FF5D]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold mb-2.5 group-hover:text-[#A6FF5D] transition-colors duration-300">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Feature
