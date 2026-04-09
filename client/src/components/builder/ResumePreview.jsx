import React from 'react'
import ClassicTemplate from '../../assets/templates/ClassicTemplate'
import ModernTemplate from '../../assets/templates/ModernTemplate'
import MinimalTemplate from '../../assets/templates/MinimalTemplate'
import MinimalImageTemplate from '../../assets/templates/MinimalImageTemplate'
import ExecutiveTemplate from '../../assets/templates/ExecutiveTemplate'
import { getAccentSolidColor } from './FormSections/ThemeSettingsForm'

const ResumePreview = ({ resumeData }) => {
  
  // THE ADAPTER: Map internal engine state into external Template prop state
  const adaptedData = {
    personal_info: {
      full_name: resumeData.personal_info?.name || '',
      email: resumeData.personal_info?.email || '',
      phone: resumeData.personal_info?.phone || '',
      location: resumeData.personal_info?.address || '',
      linkedin: resumeData.personal_info?.linkedin || '',
      website: resumeData.personal_info?.portfolio || '',
      photo: resumeData.personal_info?.photo || null,
      photo_settings: resumeData.personal_info?.photo_settings || null
    },
    professional_summary: resumeData.summary || '',
    experience: (resumeData.experience || []).map(exp => {
      const parts = exp.duration?.split(' - ') || []
      return {
        position: exp.title,
        company: exp.company,
        start_date: parts[0]?.trim() || '',
        end_date: parts[1]?.trim() || '',
        is_current: exp.duration?.toLowerCase().includes('present') || false,
        description: exp.description,
        link: exp.link || ''
      }
    }),
    education: (resumeData.education || []).map(edu => ({
      degree: edu.degree,
      institution: edu.school,
      graduation_date: edu.year,
      gpa: '',
      field: ''
    })),
    skills: resumeData.skills || [],
    project: (resumeData.projects || []).map(p => ({
      name: p.name,
      description: p.description,
      type: p.type || '',
      link: p.link || ''
    }))
  }

  const templateId = resumeData.template || 'classic'
  // Support both solid colors and gradient strings
  const rawAccent = resumeData.accent_color || '#A6FF5D'
  // Solid color for use in text/border contexts (extract primary from gradient if needed)
  const accentColor = getAccentSolidColor(rawAccent)
  // Full value for backgrounds (can be gradient)
  const accentBg = rawAccent

  // Dynamic Layout Switcher — passes both solid color (text/borders) and bg (gradients)
  const renderTemplate = () => {
    const props = { data: adaptedData, accentColor, accentBg }
    switch(templateId) {
        case 'classic': return <ClassicTemplate {...props} />
        case 'modern': return <ModernTemplate {...props} />
        case 'minimal-text': return <MinimalTemplate {...props} />
        case 'minimal-image': return <MinimalImageTemplate {...props} />
        case 'executive': return <ExecutiveTemplate {...props} />
        default: return <ClassicTemplate {...props} />
    }
  }

  return (
    <div className="bg-gray-900/40 rounded-2xl p-4 md:p-8 flex items-center justify-center border border-white/10 shadow-inner h-full w-full overflow-y-auto custom-scrollbar relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#A6FF5D]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      {/* A4 Paper Scaled Container */}
      <div 
        className="bg-white text-gray-900 transform origin-top shadow-2xl flex flex-col shrink-0 transition-all duration-300 pointer-events-none self-start mt-4" 
        style={{
            width: '210mm',
            minHeight: '297mm',
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  )
}

export default ResumePreview
