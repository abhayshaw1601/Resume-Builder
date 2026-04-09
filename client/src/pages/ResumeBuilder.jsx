import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon, DownloadIcon, SaveIcon, Loader2Icon } from 'lucide-react';
import FormEditor from '../components/builder/FormEditor';
import ResumePreview from '../components/builder/ResumePreview';
import API from '../api/axios';

const ResumeBuilder = () => {

  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState('') // 'saved' | 'error' | ''

  const [resumeData, setResumeData] = useState(
    {
      _id: '',
      title: '',
      experience: [],
      education: [],
      skills: [],
      projects: [],
      summary: '',
      personal_info: {
        name: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        github: '',
        portfolio: '',
      },
      public: false,
      accent_color: '#A6FF5D',
      template: 'classic',
    }
  )

  // Reverse-adapt DB schema → Builder internal format
  const adaptFromDB = (dbResume) => ({
    _id: dbResume._id,
    title: dbResume.title || '',
    template: dbResume.template || 'classic',
    accent_color: dbResume.accent_color || '#A6FF5D',
    public: dbResume.public || false,
    personal_info: {
      name: dbResume.personal_info?.full_name || '',
      email: dbResume.personal_info?.email || '',
      phone: dbResume.personal_info?.phone || '',
      address: dbResume.personal_info?.location || '',
      linkedin: dbResume.personal_info?.linkedin || '',
      github: '',
      portfolio: dbResume.personal_info?.website || '',
      photo: dbResume.personal_info?.image || null,
    },
    summary: dbResume.professional_summary || '',
    skills: dbResume.skills || [],
    experience: (dbResume.experience || []).map(exp => ({
      title: exp.position || '',
      company: exp.company || '',
      duration: exp.is_current
        ? `${exp.start_date} - Present`
        : `${exp.start_date} - ${exp.end_date}`,
      description: exp.description || '',
      link: exp.link || '',
    })),
    education: (dbResume.education || []).map(edu => ({
      degree: edu.degree || '',
      school: edu.institution || '',
      year: edu.graduation_date || '',
      field: edu.field || '',
      gpa: edu.gpa || '',
    })),
    projects: (dbResume.project || []).map(p => ({
      name: p.name || '',
      description: p.description || '',
      type: p.type || '',
      link: p.link || '',
    })),
  })

  // Forward-adapt Builder internal format → DB schema (for saving)
  const adaptToDB = (builderData) => ({
    title: builderData.title,
    template: builderData.template,
    accent_color: builderData.accent_color,
    public: builderData.public,
    personal_info: {
      full_name: builderData.personal_info?.name || '',
      email: builderData.personal_info?.email || '',
      phone: builderData.personal_info?.phone || '',
      location: builderData.personal_info?.address || '',
      linkedin: builderData.personal_info?.linkedin || '',
      website: builderData.personal_info?.portfolio || '',
      image: builderData.personal_info?.photo || '',
      profession: '',
    },
    professional_summary: builderData.summary || '',
    skills: builderData.skills || [],
    experience: (builderData.experience || []).map(exp => {
      const parts = exp.duration?.split('-').map(s => s.trim()) || ['', '']
      return {
        position: exp.title || '',
        company: exp.company || '',
        start_date: parts[0] || '',
        end_date: parts[1] === 'Present' ? '' : (parts[1] || ''),
        is_current: exp.duration?.toLowerCase().includes('present') || false,
        description: exp.description || '',
        link: exp.link || '',
      }
    }),
    education: (builderData.education || []).map(edu => ({
      degree: edu.degree || '',
      institution: edu.school || '',
      graduation_date: edu.year || '',
      field: edu.field || '',
      gpa: edu.gpa || '',
    })),
    project: (builderData.projects || []).map(p => ({
      name: p.name || '',
      description: p.description || '',
      type: p.type || '',
      link: p.link || '',
    })),
  })

  const loadExistingResume = async () => {
    try {
      if (resumeId === 'new') return;
      setLoading(true)

      const { data } = await API.get(`/resumes/${resumeId}`)
      const adapted = adaptFromDB(data)
      setResumeData(adapted)
      document.title = data.title || 'Resume Builder'
    } catch (error) {
      console.error('Failed to load resume:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setSaveStatus('')

      const payload = adaptToDB(resumeData)

      if (resumeId === 'new') {
        // Create new resume
        const { data } = await API.post('/resumes', { title: resumeData.title || 'Untitled Resume' })
        // Then update with full data
        await API.put(`/resumes/${data._id}`, payload)
        setResumeData(prev => ({ ...prev, _id: data._id }))
      } else {
        // Update existing
        await API.put(`/resumes/${resumeId}`, payload)
      }

      setSaveStatus('saved')
      setTimeout(() => setSaveStatus(''), 3000)
    } catch (error) {
      console.error('Save error:', error.message)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus(''), 3000)
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    loadExistingResume()
  }, [resumeId])

  if (loading) {
    return (
      <div className="w-full text-white h-[calc(100vh-80px)] flex items-center justify-center -mt-8 -mx-8 sm:w-[calc(100%+4rem)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-[#A6FF5D] animate-spin" />
          <p className="text-gray-400 text-sm">Loading resume...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full text-white h-[calc(100vh-80px)] flex flex-col -mt-8 -mx-8 sm:w-[calc(100%+4rem)]">
      
      {/* Builder Topbar */}
      <div className="h-16 border-b border-white/10 bg-gray-900/50 flex items-center justify-between px-6 shrink-0 relative z-20 shadow-lg">
        <div className="flex items-center gap-4">
          <Link to="/app" className='inline-flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition-colors'>
            <ArrowLeftIcon size={18} />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-none mb-1">
              {resumeId === 'new' ? 'New Interactive Resume' : resumeData.title || 'Untitled Resume'}
            </h1>
            <span className={`text-[10px] uppercase tracking-widest ${
              saveStatus === 'saved' ? 'text-[#A6FF5D]' : 
              saveStatus === 'error' ? 'text-red-400' : 
              'text-gray-500'
            }`}>
              {saveStatus === 'saved' ? '✓ Saved successfully' : 
               saveStatus === 'error' ? '✗ Failed to save' : 
               saving ? 'Saving...' : 'Unsaved Changes'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
            <DownloadIcon size={16} />
            Export PDF
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-black rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(166,255,93,0.3)] disabled:opacity-70 cursor-pointer"
          >
            {saving ? <Loader2Icon size={16} className="animate-spin" /> : <SaveIcon size={16}/>}
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Main Builder Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Form Editor */}
        <div className="w-full lg:w-[45%] h-full overflow-y-auto custom-scrollbar pt-6 pb-20 px-6 bg-gray-900/30">
          <FormEditor resumeData={resumeData} setResumeData={setResumeData} />
        </div>

        {/* Right Side: Live Document Preview */}
        <div className="hidden lg:flex flex-1 h-full bg-black/50 p-6 overflow-hidden">
          <ResumePreview resumeData={resumeData} />
        </div>

      </div>

    </div>
  )
}

export default ResumeBuilder