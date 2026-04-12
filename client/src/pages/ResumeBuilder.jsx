import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, DownloadIcon, SaveIcon, Loader2Icon, SparklesIcon, XIcon, FileDown } from 'lucide-react';
import FormEditor from '../components/builder/FormEditor';
import ResumePreview from '../components/builder/ResumePreview';
import API from '../api/axios';
import { exportToWord } from '../utils/wordExport';

const ResumeBuilder = () => {

  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState('') // 'saved' | 'error' | ''
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisData, setAnalysisData] = useState(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [showDirtyModal, setShowDirtyModal] = useState(false)
  
  const navigate = useNavigate()
  const baselineRef = useRef(null)

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
      is_dark_mode: false,
      accent_color: '#A6FF5D',
      font_size: 16,
      section_spacing: 24,
      template: 'classic',
    }
  )

  // Reverse-adapt DB schema → Builder internal format
  const adaptFromDB = (dbResume) => ({
    _id: dbResume._id,
    title: dbResume.title || '',
    template: dbResume.template || 'classic',
    is_dark_mode: dbResume.is_dark_mode || false,
    accent_color: dbResume.accent_color || '#A6FF5D',
    font_size: dbResume.font_size || 16,
    section_spacing: dbResume.section_spacing || 24,
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
    is_dark_mode: builderData.is_dark_mode,
    accent_color: builderData.accent_color,
    font_size: builderData.font_size,
    section_spacing: builderData.section_spacing,
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
      baselineRef.current = JSON.stringify(adaptToDB(adapted))
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
        // Create new resume with full data in one call
        const { data } = await API.post('/resumes', payload)
        setResumeData(prev => ({ ...prev, _id: data._id }))
        // Navigate to the real ID so future saves use PUT
        window.history.replaceState(null, '', `/app/builder/${data._id}`)
      } else {
        // Update existing
        await API.put(`/resumes/${resumeId}`, payload)
      }
      
      baselineRef.current = JSON.stringify(payload)

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

  const handleAnalyze = async () => {
    try {
      // Must save first so the DB has latest data
      if (resumeId !== 'new') {
        await handleSave()
      }

      const id = resumeData._id || resumeId
      if (!id || id === 'new') return

      setAnalyzing(true)
      const { data } = await API.post(`/analyze/${id}`)
      setAnalysisData(data.analysis)
      setShowAnalysis(true)
    } catch (error) {
      console.error('Analyze error:', error.message)
      alert(error.response?.data?.message || 'Failed to analyze resume. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  useEffect(() => {
    loadExistingResume()
  }, [resumeId])

  const handlePrint = () => {
    window.print();
  }

  const isDirty = baselineRef.current && baselineRef.current !== JSON.stringify(adaptToDB(resumeData))

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?'
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  const handleBackClick = () => {
    if (isDirty) {
      setShowDirtyModal(true)
    } else {
      navigate('/app')
    }
  }

  const handleForceExit = () => {
    setShowDirtyModal(false)
    navigate('/app')
  }

  if (loading) {
    return (
      <div className="w-full text-white h-[calc(100vh-80px)] flex flex-col -mt-8 -mx-8 sm:w-[calc(100%+4rem)] bg-[#0a0a0a] animate-pulse">
        {/* Builder Topbar Skeleton */}
        <div className="h-16 border-b border-white/10 bg-gray-900/50 flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full" />
                <div className="flex flex-col gap-2">
                    <div className="w-32 h-4 bg-white/10 rounded" />
                    <div className="w-24 h-2 bg-white/5 rounded" />
                </div>
            </div>
            <div className="hidden sm:flex items-center gap-3">
                <div className="w-24 h-9 bg-white/5 rounded-lg" />
                <div className="w-20 h-9 bg-white/5 rounded-lg" />
                <div className="w-24 h-9 bg-white/10 rounded-lg" />
            </div>
        </div>

        {/* Main Builder Split Layout Skeleton */}
        <div className="flex-1 flex overflow-hidden">
            {/* Left Side: Form Editor Skeleton */}
            <div className="w-full lg:w-[45%] h-full pt-6 pb-20 px-6 bg-gray-900/30">
                <div className="space-y-6">
                    <div className="w-48 h-8 bg-white/10 rounded mb-6" />
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-full bg-white/5 rounded-xl p-4 flex flex-col gap-4 border border-white/5">
                            <div className="w-1/3 h-5 bg-white/10 rounded" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="w-full h-10 bg-white/5 rounded" />
                                <div className="w-full h-10 bg-white/5 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side: Live Document Preview Skeleton */}
            <div className="hidden lg:flex flex-1 h-full bg-black/50 p-6 flex-col items-center justify-center relative">
                {/* Floating spinner */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
                   <div className="w-10 h-10 rounded-full border-4 border-white/5 border-t-[#A6FF5D]/50 animate-spin" />
                   <span className="text-gray-500 font-medium tracking-widest text-sm uppercase">Loading Resume</span>
                </div>
                <div className="w-full max-w-[800px] h-full bg-white/5 rounded-sm border border-white/10 shadow-2xl opacity-10 p-12 flex flex-col gap-6">
                     <div className="w-1/3 h-8 bg-white/20 rounded mx-auto mb-8" />
                     <div className="w-full h-4 bg-white/10 rounded" />
                     <div className="w-5/6 h-4 bg-white/10 rounded" />
                     <div className="w-4/6 h-4 bg-white/10 rounded" />
                     <div className="w-full h-32 bg-white/10 rounded mt-8" />
                </div>
            </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full text-white h-[calc(100vh-80px)] flex flex-col -mt-8 -mx-8 sm:w-[calc(100%+4rem)]">

      {/* Builder Topbar */}
      <div className="h-16 border-b border-white/10 bg-gray-900/50 flex items-center justify-between px-6 shrink-0 relative z-20 shadow-lg no-print">
        <div className="flex items-center gap-4">
          <button onClick={handleBackClick} className='inline-flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition-colors'>
            <ArrowLeftIcon size={18} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent leading-none mb-1">
              {resumeId === 'new' ? 'New Interactive Resume' : resumeData.title || 'Untitled Resume'}
            </h1>
            <span className={`text-[10px] uppercase tracking-widest ${saveStatus === 'saved' ? 'text-[#A6FF5D]' :
                saveStatus === 'error' ? 'text-red-400' :
                  'text-gray-500'
              }`}>
              {saveStatus === 'saved' ? '✓ Saved successfully' :
                saveStatus === 'error' ? '✗ Failed to save' :
                  saving ? 'Saving...' : 'Unsaved Changes'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 no-print">
          {/* AI Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={analyzing || resumeId === 'new'}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-sm font-medium text-purple-300 transition-all disabled:opacity-50 cursor-pointer"
          >
            {analyzing ? (
              <Loader2Icon size={16} className="animate-spin" />
            ) : (
              <SparklesIcon size={16} />
            )}
            {analyzing ? 'Analyzing...' : 'AI Analyze'}
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              title="Export PDF"
            >
              <DownloadIcon size={16} />
              PDF
            </button>
            {/* <button 
              onClick={() => exportToWord(resumeData)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              title="Export Word Document (ATS Friendly)"
            > */}
            {/* <FileDown size={16} />
              Word
            </button> */}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-black rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(166,255,93,0.3)] disabled:opacity-70 cursor-pointer"
          >
            {saving ? <Loader2Icon size={16} className="animate-spin" /> : <SaveIcon size={16} />}
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {/* Main Builder Split Layout */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* Left Side: Form Editor */}
        <div className="w-full lg:w-[45%] h-full overflow-y-auto custom-scrollbar pt-6 pb-20 px-6 bg-gray-900/30 no-print">
          <FormEditor resumeData={resumeData} setResumeData={setResumeData} />
        </div>

        {/* Right Side: Live Document Preview */}
        <div className="hidden lg:flex flex-1 h-full bg-black/50 p-6 overflow-hidden print:flex print:p-0 print:bg-white print:fixed print:inset-0 print:z-[1000]">
          <ResumePreview resumeData={resumeData} />
        </div>

        {/* AI Analysis Panel (Slide-over) */}
        {showAnalysis && analysisData && (
          <div className="absolute inset-0 z-30 flex">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowAnalysis(false)}
            />

            {/* Panel */}
            <div className="absolute right-0 top-0 bottom-0 w-full md:w-[520px] bg-gray-900 border-l border-white/10 overflow-y-auto custom-scrollbar shadow-2xl z-10">
              {/* Panel Header */}
              <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <SparklesIcon size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">AI Analysis</h2>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500">Powered by Gemini 2.5 Flash</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAnalysis(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <XIcon size={16} />
                </button>
              </div>

              <div className="p-6 flex flex-col gap-6">
                {/* ATS Score Ring */}
                <div className="flex items-center gap-6 p-5 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="relative w-24 h-24 shrink-0">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="42" fill="none"
                        stroke={analysisData.ats_score >= 80 ? '#A6FF5D' : analysisData.ats_score >= 60 ? '#F59E0B' : '#EF4444'}
                        strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${analysisData.ats_score * 2.64} 264`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-white">{analysisData.ats_score}</span>
                      <span className="text-[9px] text-gray-500 uppercase tracking-wider">ATS</span>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${analysisData.overall_rating === 'Excellent' ? 'bg-[#A6FF5D]/20 text-[#A6FF5D]' :
                        analysisData.overall_rating === 'Good' ? 'bg-blue-500/20 text-blue-400' :
                          analysisData.overall_rating === 'Average' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                      }`}>{analysisData.overall_rating}</span>
                    <p className="text-sm text-gray-400 leading-relaxed">{analysisData.summary}</p>
                  </div>
                </div>

                {/* Section Scores */}
                {analysisData.section_scores && (
                  <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
                    <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-400" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
                      Section Scores
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(analysisData.section_scores).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                          <span className="text-xs text-gray-400 capitalize">{key.replace('_', ' ')}</span>
                          <span className={`text-xs font-bold ${val >= 80 ? 'text-[#A6FF5D]' : val >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{val}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths */}
                {analysisData.strengths?.length > 0 && (
                  <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
                    <h3 className="text-sm font-semibold text-[#A6FF5D] mb-3 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {analysisData.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-[#A6FF5D] mt-0.5 shrink-0">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {analysisData.weaknesses?.length > 0 && (
                  <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
                    <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                      Weaknesses
                    </h3>
                    <ul className="space-y-2">
                      {analysisData.weaknesses.map((w, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-red-400 mt-0.5 shrink-0">•</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Suggestions */}
                {analysisData.suggestions?.length > 0 && (
                  <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
                    <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                      Suggestions
                    </h3>
                    <ul className="space-y-2">
                      {analysisData.suggestions.map((s, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5 shrink-0">{i + 1}.</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Keyword Analysis */}
                {analysisData.keyword_analysis && (
                  <div className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl">
                    <h3 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                      Keyword Analysis
                    </h3>

                    {analysisData.keyword_analysis.present_keywords?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Present</p>
                        <div className="flex flex-wrap gap-1.5">
                          {analysisData.keyword_analysis.present_keywords.map((k, i) => (
                            <span key={i} className="px-2 py-0.5 bg-[#A6FF5D]/10 text-[#A6FF5D] text-xs rounded-md">{k}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {analysisData.keyword_analysis.missing_keywords?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Missing</p>
                        <div className="flex flex-wrap gap-1.5">
                          {analysisData.keyword_analysis.missing_keywords.map((k, i) => (
                            <span key={i} className="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs rounded-md">{k}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {analysisData.keyword_analysis.recommendation && (
                      <p className="text-sm text-gray-400 mt-2 italic">{analysisData.keyword_analysis.recommendation}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Dirty Confirmation Modal */}
      {showDirtyModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center -mt-8 -mx-8">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDirtyModal(false)} />
          <div className="relative bg-gray-900 border border-white/10 rounded-2xl p-6 w-[400px] shadow-2xl flex flex-col gap-4 z-10 m-4 text-center">
            <h3 className="text-xl font-bold text-white">Unsaved Changes</h3>
            <p className="text-gray-400 text-sm">You have unsaved changes to your resume. Are you sure you want to exit? Your modifications will be lost.</p>
            <div className="flex items-center gap-3 mt-4 w-full">
              <button 
                onClick={() => setShowDirtyModal(false)} 
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleForceExit} 
                className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-500 rounded-xl transition-colors font-medium text-sm"
              >
                Discard & Exit
              </button>
              <button 
                onClick={async () => {
                  await handleSave();
                  navigate('/app');
                }} 
                disabled={saving}
                className="flex-1 px-4 py-2 bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-black rounded-xl transition-colors font-bold text-sm disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save & Exit'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ResumeBuilder
