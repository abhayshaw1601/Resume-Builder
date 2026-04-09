import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, PencilIcon, Trash2Icon, DownloadIcon } from 'lucide-react'
import API from '../api/axios'
import ClassicTemplate from '../assets/templates/ClassicTemplate'
import ModernTemplate from '../assets/templates/ModernTemplate'
import MinimalTemplate from '../assets/templates/MinimalTemplate'
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate'
import ExecutiveTemplate from '../assets/templates/ExecutiveTemplate'
import StandardATSTemplate from '../assets/templates/StandardATSTemplate'
import GitHubDarkTemplate from '../assets/templates/GitHubDarkTemplate'
import ModernMonoTemplate from '../assets/templates/ModernMonoTemplate'
import SplitScreenTemplate from '../assets/templates/SplitScreenTemplate'
import BentoBoxTemplate from '../assets/templates/BentoBoxTemplate'
import TimelineTemplate from '../assets/templates/TimelineTemplate'
import TerminalTemplate from '../assets/templates/TerminalTemplate'
import AcademicCVTemplate from '../assets/templates/AcademicCVTemplate'
import InfographicTemplate from '../assets/templates/InfographicTemplate'
import PitchDeckTemplate from '../assets/templates/PitchDeckTemplate'
import { getAccentSolidColor } from '../components/builder/FormSections/ThemeSettingsForm'

const ManagementPreview = () => {
    const { resumeId } = useParams()
    const navigate = useNavigate()
    const [resume, setResume] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const fetchResume = async () => {
            try {
                setLoading(true)
                setError(null)
                // Management preview always uses private auth-protected endpoint
                const { data } = await API.get(`/resumes/${resumeId}`)
                setResume(data)
                document.title = `${data.title} — Preview`
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load resume preview')
            } finally {
                setLoading(false)
            }
        }

        if (resumeId) fetchResume()
    }, [resumeId])

    const handleDelete = async () => {
        try {
            setDeleting(true)
            await API.delete(`/resumes/${resumeId}`)
            navigate('/app')
        } catch (error) {
            console.error('Delete error:', error)
            alert('Failed to delete resume')
        } finally {
            setDeleting(false)
        }
    }

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
            case 'standard-ats': return <StandardATSTemplate {...props} />
            case 'github-dark': return <GitHubDarkTemplate {...props} />
            case 'modern-mono': return <ModernMonoTemplate {...props} />
            case 'split-screen': return <SplitScreenTemplate {...props} />
            case 'bento-box': return <BentoBoxTemplate {...props} />
            case 'timeline': return <TimelineTemplate {...props} />
            case 'terminal': return <TerminalTemplate {...props} />
            case 'academic-cv': return <AcademicCVTemplate {...props} />
            case 'infographic': return <InfographicTemplate {...props} />
            case 'pitch-deck': return <PitchDeckTemplate {...props} />
            default: return <ClassicTemplate {...props} />
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-10 h-10 border-4 border-[#A6FF5D]/20 border-t-[#A6FF5D] rounded-full animate-spin"></div>
            </div>
        )
    }

    if (error || !resume) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4 text-center">
                <h1 className="text-2xl font-bold text-white mb-4">Error</h1>
                <p className="text-gray-400 mb-8">{error || 'Resume not found'}</p>
                <Link to="/app" className="bg-[#A6FF5D] text-black px-6 py-2 rounded-full font-bold">Back to Dashboard</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Management Toolbar */}
            <div className="sticky top-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-white/10 px-4 py-3 no-print">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/app')}
                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer"
                            title="Back to Dashboard"
                        >
                            <ArrowLeftIcon size={20} />
                        </button>
                        <div className="h-6 w-px bg-white/10" />
                        <div>
                            <h2 className="text-sm font-bold text-white leading-none">{resume.title}</h2>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{resume.template} template</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to={`/app/builder/${resumeId}`}
                            className="flex items-center gap-2 px-4 py-2 bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-black rounded-lg text-xs font-bold transition-all"
                        >
                            <PencilIcon size={14} />
                            <span>Edit</span>
                        </Link>
                        
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-lg text-xs font-bold transition-all cursor-pointer"
                        >
                            <Trash2Icon size={14} />
                            <span>Delete</span>
                        </button>

                        <div className="h-6 w-px bg-white/10 mx-1" />

                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white font-medium transition-colors cursor-pointer"
                        >
                            <DownloadIcon size={14} />
                            <span>Download</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Resume Scale Preview */}
            <div className="py-8 px-4 flex justify-center bg-gray-950 min-h-[calc(100vh-64px)] overflow-auto preview-container">
                <div className="bg-white text-gray-900 shadow-2xl origin-top transition-transform duration-300 print:shadow-none print:m-0 resume-paper"
                     style={{
                         width: '210mm',
                         minHeight: '297mm',
                         transform: 'scale(0.9)',
                     }}>
                    {renderTemplate()}
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-2">Delete Resume?</h2>
                        <p className="text-gray-400 text-sm mb-6">Are you sure you want to delete "{resume.title}"? This action cannot be undone.</p>
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setShowDeleteModal(false)}
                                className="px-5 py-2 text-gray-400 hover:text-white font-medium cursor-pointer"
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 cursor-pointer"
                                disabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ManagementPreview
