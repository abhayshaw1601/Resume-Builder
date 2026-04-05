import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets';
import { ArrowLeftIcon, DownloadIcon, SaveIcon } from 'lucide-react';
import FormEditor from '../components/builder/FormEditor';
import ResumePreview from '../components/builder/ResumePreview';

const ResumeBuilder = () => {

  const { resumeId } = useParams();

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

  const loadExistingResume = async () => {
    try {
      if (resumeId === 'new') return; // Do not fetch if it is a new resume

      const res = dummyResumeData.find((item) => item._id === resumeId)
      if (res) {
        setResumeData(res)
        document.title = res.title
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSave = () => {
    try {

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadExistingResume()
  }, [resumeId])


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
            <span className="text-[10px] uppercase tracking-widest text-[#A6FF5D]">Unsaved Changes</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors">
            <DownloadIcon size={16} />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-black rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(166,255,93,0.3)]">
            <SaveIcon size={16}/>
            Save 
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