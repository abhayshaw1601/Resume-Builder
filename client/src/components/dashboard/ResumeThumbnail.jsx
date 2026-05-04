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
import { getAccentSolidColor } from '../builder/FormSections/ThemeSettingsForm'

export default function ResumeThumbnail({ resumeData }) {
  if (!resumeData) return null;

  // Map internal engine state into external Template prop state
  const adaptedData = {
    personal_info: {
      full_name: resumeData.personal_info?.name || resumeData.personal_info?.full_name || '',
      email: resumeData.personal_info?.email || '',
      phone: resumeData.personal_info?.phone || '',
      location: resumeData.personal_info?.address || resumeData.personal_info?.location || '',
      linkedin: resumeData.personal_info?.linkedin || '',
      github: resumeData.personal_info?.github || '',
      website: resumeData.personal_info?.portfolio || resumeData.personal_info?.website || '',
      photo: resumeData.personal_info?.photo || resumeData.personal_info?.image || null,
    },
    professional_summary: resumeData.summary || resumeData.professional_summary || '',
    experience: (resumeData.experience || []).map(exp => ({
      position: exp.title || exp.position || '',
      company: exp.company || '',
      start_date: exp.start_date || '',
      end_date: exp.end_date || '',
      is_current: exp.is_current || false,
      description: exp.description || '',
    })),
    education: (resumeData.education || []).map(edu => ({
      degree: edu.degree || '',
      institution: edu.school || edu.institution || '',
      graduation_date: edu.year || edu.graduation_date || '',
    })),
    skills: resumeData.skills || [],
    project: (resumeData.projects || resumeData.project || []).map(p => ({
      name: p.name || '',
      description: p.description || '',
    }))
  }

  const templateId = resumeData.template || 'classic'
  const rawAccent = resumeData.accent_color || '#A6FF5D'
  const accentColor = getAccentSolidColor(rawAccent)
  const accentBg = rawAccent

  const props = { 
    data: adaptedData, 
    isDarkMode: resumeData.is_dark_mode,
    accentColor, 
    accentBg, 
    fontSize: 10, // Small font for thumbnail
    headingSize: 14,
    sectionSpacing: 10
  }

  const renderTemplate = () => {
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
    <div 
      className={`${resumeData.is_dark_mode ? 'bg-[#0a0a0a]' : 'bg-white'} flex flex-col shrink-0 relative shadow-2xl overflow-hidden`}
      style={{
        width: '210mm',
        height: '297mm',
        transform: 'scale(0.32)',
        transformOrigin: 'top center',
        pointerEvents: 'none'
      }}
    >
      {renderTemplate()}
    </div>
  )
}
