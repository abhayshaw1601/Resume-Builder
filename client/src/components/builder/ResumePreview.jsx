import React from 'react'
import ClassicTemplate from '../../assets/templates/ClassicTemplate'
import ModernTemplate from '../../assets/templates/ModernTemplate'
import MinimalTemplate from '../../assets/templates/MinimalTemplate'
import MinimalImageTemplate from '../../assets/templates/MinimalImageTemplate'
import ExecutiveTemplate from '../../assets/templates/ExecutiveTemplate'
import StandardATSTemplate from '../../assets/templates/StandardATSTemplate'
import GitHubDarkTemplate from '../../assets/templates/GitHubDarkTemplate'
import ModernMonoTemplate from '../../assets/templates/ModernMonoTemplate'
import SplitScreenTemplate from '../../assets/templates/SplitScreenTemplate'
import BentoBoxTemplate from '../../assets/templates/BentoBoxTemplate'
import TimelineTemplate from '../../assets/templates/TimelineTemplate'
import TerminalTemplate from '../../assets/templates/TerminalTemplate'
import AcademicCVTemplate from '../../assets/templates/AcademicCVTemplate'
import InfographicTemplate from '../../assets/templates/InfographicTemplate'
import PitchDeckTemplate from '../../assets/templates/PitchDeckTemplate'
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
      gpa: edu.gpa || '',
      field: edu.field || ''
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
    const props = { 
        data: adaptedData, 
        isDarkMode: resumeData.is_dark_mode,
        accentColor, 
        accentBg, 
        fontSize: resumeData.font_size || 16,
        headingSize: resumeData.heading_size || 24,
        sectionSpacing: resumeData.section_spacing || 24
    }
    switch(templateId) {
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

  return (
    <div className="bg-gray-900/40 rounded-2xl p-4 md:p-8 flex items-center justify-center border border-white/10 shadow-inner h-full w-full overflow-y-auto custom-scrollbar relative preview-container">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#A6FF5D]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* A4 Paper Scaled Container */}
      <div 
        className={`${resumeData.is_dark_mode ? 'bg-[#0a0a0a]' : 'bg-white'} transform origin-top shadow-2xl flex flex-col shrink-0 transition-all duration-300 pointer-events-none self-start mt-4 relative resume-paper`}
        style={{
            width: '210mm',
            minHeight: '297mm',
        }}
      >
        {/* Page End Indicator */}
        <div 
            className="absolute left-0 right-0 border-b-2 border-dashed border-red-500/30 z-20 no-print pointer-events-none"
            style={{ top: '297mm' }}
        >
            <span className="absolute right-4 bottom-1 text-[10px] font-bold text-red-500/50 uppercase tracking-widest">Page 1 Ends Here</span>
        </div>

        {renderTemplate()}
      </div>
    </div>
  )
}

export default ResumePreview
