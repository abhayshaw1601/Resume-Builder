import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import API from '../api/axios'
import ClassicTemplate from '../assets/templates/ClassicTemplate'
import ModernTemplate from '../assets/templates/ModernTemplate'
import MinimalTemplate from '../assets/templates/MinimalTemplate'
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate'
import ExecutiveTemplate from '../assets/templates/ExecutiveTemplate'
import { getAccentSolidColor } from '../components/builder/FormSections/ThemeSettingsForm'

const Preview = () => {
    const { resumeId } = useParams()
    const [resume, setResume] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchResume = async () => {
            try {
                setLoading(true)
                setError(null)
                const { data } = await API.get(`/resumes/${resumeId}`)
                setResume(data)
                document.title = `${data.personal_info?.full_name || data.title} — Resume`
            } catch (err) {
                const status = err.response?.status
                if (status === 404) {
                    setError({ code: 404, message: 'Resume not found', description: 'The resume you\'re looking for doesn\'t exist or has been deleted.' })
                } else if (status === 403) {
                    setError({ code: 403, message: 'Access Denied', description: 'This resume is private. Only the owner can view it.' })
                } else {
                    setError({ code: 500, message: 'Something went wrong', description: 'We couldn\'t load this resume. Please try again later.' })
                }
            } finally {
                setLoading(false)
            }
        }

        if (resumeId) fetchResume()
    }, [resumeId])

    // ─── Template Renderer ───────────────────────────────────
    const renderTemplate = () => {
        if (!resume) return null

        const rawAccent = resume.accent_color || '#A6FF5D'
        const accentColor = getAccentSolidColor(rawAccent)
        const accentBg = rawAccent
        const templateId = resume.template || 'classic'

        const props = { data: resume, accentColor, accentBg }

        switch (templateId) {
            case 'classic': return <ClassicTemplate {...props} />
            case 'modern': return <ModernTemplate {...props} />
            case 'minimal-text': return <MinimalTemplate {...props} />
            case 'minimal-image': return <MinimalImageTemplate {...props} />
            case 'executive': return <ExecutiveTemplate {...props} />
            default: return <ClassicTemplate {...props} />
        }
    }

    // ─── Loading State ───────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center gap-6">
                    {/* Animated loader */}
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-[#A6FF5D] animate-spin" />
                        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-b-[#A6FF5D]/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                    </div>
                    <div className="text-center">
                        <p className="text-white font-medium text-lg">Loading Resume</p>
                        <p className="text-gray-500 text-sm mt-1">Please wait a moment...</p>
                    </div>
                </div>
            </div>
        )
    }

    // ─── Error State ─────────────────────────────────────────
    if (error) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        {error.code === 404 ? (
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="9" y1="15" x2="15" y2="15"/>
                            </svg>
                        ) : (
                            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-red-400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        )}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{error.code}</h2>
                    <h3 className="text-xl font-semibold text-white mb-3">{error.message}</h3>
                    <p className="text-gray-400 mb-8 text-sm leading-relaxed">{error.description}</p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-black font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Go Home
                    </Link>
                </div>
            </div>
        )
    }

    // ─── Resume View ─────────────────────────────────────────
    return (
        <div className="min-h-screen bg-black">
            {/* Top Bar */}
            <div className="sticky top-16 z-30 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-2 h-2 rounded-full bg-[#A6FF5D] shrink-0 animate-pulse" />
                        <h2 className="text-sm font-medium text-white truncate">
                            {resume.personal_info?.full_name || resume.title}
                        </h2>
                        <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-gray-500 border border-white/10 px-2 py-0.5 rounded-full">
                            {resume.template || 'classic'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            to={`/app/builder/${resumeId}`}
                            className="flex items-center gap-2 px-4 py-2 bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-black rounded-lg text-sm font-semibold transition-all cursor-pointer shadow-[0_0_15px_rgba(166,255,93,0.2)]"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            <span className="hidden sm:inline">Edit</span>
                        </Link>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white font-medium transition-colors cursor-pointer"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            <span className="hidden sm:inline">Download</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Resume Document */}
            <div className="max-w-5xl mx-auto py-8 sm:py-12 px-4">
                <div className="bg-gray-900/40 rounded-2xl p-4 sm:p-8 border border-white/10 shadow-inner">
                    <div className="flex justify-center">
                        <div
                            className="bg-white text-gray-900 shadow-2xl flex flex-col shrink-0 transition-all duration-300 print:shadow-none"
                            style={{
                                width: '210mm',
                                minHeight: '297mm',
                            }}
                        >
                            {renderTemplate()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preview