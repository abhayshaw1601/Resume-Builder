import React, { useState } from 'react'
import PersonalInfoForm from './FormSections/PersonalInfoForm'
import SummaryForm from './FormSections/SummaryForm'
import ExperienceForm from './FormSections/ExperienceForm'
import EducationForm from './FormSections/EducationForm'
import SkillsForm from './FormSections/SkillsForm'
import TargetJobForm from './FormSections/TargetJobForm'
import ImageUploadForm from './FormSections/ImageUploadForm'
import TemplateSelectorForm from './FormSections/TemplateSelectorForm'
import ThemeSettingsForm from './FormSections/ThemeSettingsForm'
import ProjectForm from './FormSections/ProjectForm'

const AccordionItem = ({ title, id, activeAccordion, setActiveAccordion, children }) => {
  const isActive = activeAccordion === id
  return (
    <div className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden shadow-xl mb-4 transition-all duration-300">
      <button
        onClick={() => setActiveAccordion(isActive ? null : id)}
        className="w-full flex justify-between items-center p-4 bg-white/[0.03] hover:bg-white/[0.07] transition-colors cursor-pointer"
      >
        <span className="font-semibold text-[#A6FF5D] tracking-wide uppercase text-sm">{title}</span>
        <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isActive ? 'rotate-180 text-white' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isActive && (
        <div className="p-5 border-t border-white/5 animate-fade-in text-gray-300 bg-black/20 pt-6">
          {children}
        </div>
      )}
    </div>
  )
}

const FormEditor = ({ resumeData, setResumeData }) => {
  const [activeAccordion, setActiveAccordion] = useState('personal')

  // Helper to handle simple flat fields
  const handleChange = (e) => {
    const { name, value } = e.target
    setResumeData(prev => ({ ...prev, [name]: value }))
  }

  // Nested fields
  const handlePersonalChange = (e) => {
    const { name, value } = e.target
    setResumeData(prev => ({
      ...prev,
      personal_info: { ...prev.personal_info, [name]: value }
    }))
  }

  return (
    <div className="flex flex-col gap-2 pr-2">
      <AccordionItem title="Visual Templates" id="templates" activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion}>
        <TemplateSelectorForm currentTemplate={resumeData.template || 'classic'} setResumeData={setResumeData} />
      </AccordionItem>

      <AccordionItem title="Theme & Colors" id="theme" activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion}>
        <ThemeSettingsForm accentColor={resumeData.accent_color} setResumeData={setResumeData} />
      </AccordionItem>

      <AccordionItem title="Personal Information" id="personal" activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion}>
        <PersonalInfoForm data={resumeData.personal_info} onChange={handlePersonalChange} />
      </AccordionItem>

      <AccordionItem title="Profile Photo" id="photo" activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion}>
        <ImageUploadForm data={resumeData.personal_info} onChange={handlePersonalChange} />
      </AccordionItem>

      <AccordionItem title="Professional Summary" id="summary" activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion}>
        <SummaryForm data={resumeData.summary} onChange={handleChange} />
      </AccordionItem>

      <AccordionItem title="Professional Experience" id="experience" activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion}>
        <ExperienceForm experience={resumeData.experience} setResumeData={setResumeData} />
      </AccordionItem>

      <AccordionItem title="Education History" id="education" activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion}>
        <EducationForm education={resumeData.education} setResumeData={setResumeData} />
      </AccordionItem>

      <AccordionItem title="Target Job & AI Skills" id="skills" activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion}>
        <TargetJobForm jobDescription={resumeData.target_job} setResumeData={setResumeData} />
        <div className="my-6 border-t border-white/5 relative">
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-3 text-xs text-gray-500 font-semibold tracking-widest uppercase">Your Skillset</span>
        </div>
        <SkillsForm skills={resumeData.skills} setResumeData={setResumeData} />
      </AccordionItem>

      <AccordionItem title="Projects & Portfolio" id="projects" activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion}>
        <ProjectForm projects={resumeData.projects} setResumeData={setResumeData} />
      </AccordionItem>

    </div>
  )
}

export default FormEditor
