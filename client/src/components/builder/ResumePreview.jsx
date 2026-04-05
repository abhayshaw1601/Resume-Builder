import React from 'react'

const ResumePreview = ({ resumeData }) => {
  
  const { title, personal_info, summary, experience, education, skills, accent_color } = resumeData

  return (
    <div className="bg-gray-900/40 rounded-2xl p-4 md:p-8 flex items-center justify-center border border-white/10 shadow-inner h-full w-full overflow-y-auto custom-scrollbar relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#A6FF5D]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      {/* A4 Paper Scaled Container */}
      <div 
        className="bg-white text-gray-900 transform origin-top shadow-2xl flex flex-col shrink-0 transition-all duration-300 pointer-events-none self-start mt-4" 
        style={{
            width: '210mm',
            minHeight: '297mm', // A4 aspect ratio 
            padding: '2.5rem 3.5rem'
        }}
      >
        {/* HEADER */}
        <div className="border-b-2 pb-4 mb-4" style={{ borderColor: accent_color }}>
            <h1 className="text-4xl font-extrabold tracking-tight uppercase" style={{ color: accent_color }}>
                {personal_info?.name || 'FIRSTNAME LASTNAME'}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600 font-medium">
                {personal_info?.email && <span>{personal_info.email}</span>}
                {personal_info?.phone && <span>• {personal_info.phone}</span>}
                {personal_info?.linkedin && <span>• {personal_info.linkedin}</span>}
                {personal_info?.portfolio && <span>• {personal_info.portfolio}</span>}
                {personal_info?.address && <span>• {personal_info.address}</span>}
            </div>
        </div>

        {/* SUMMARY */}
        {summary && (
            <div className="mb-6">
                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{summary}</p>
            </div>
        )}

        {/* SKILLS */}
        {skills?.length > 0 && (
            <div className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-widest mb-3 border-b pb-1" style={{ color: accent_color, borderColor: accent_color }}>Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                        <span key={idx} className="text-sm font-semibold border-b-2 px-3 py-1 bg-gray-50 text-gray-800" style={{ borderColor: accent_color }}>{skill}</span>
                    ))}
                </div>
            </div>
        )}

        {/* EXPERIENCE */}
        {experience?.length > 0 && (
            <div className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-widest mb-3 border-b pb-1" style={{ color: accent_color, borderColor: accent_color }}>Experience</h2>
                <div className="flex flex-col gap-4">
                    {experience.map((exp, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-semibold text-base">{exp.title}</h3>
                                <span className="text-xs text-black/60 font-semibold bg-black/5 px-2 py-0.5 rounded">{exp.duration}</span>
                            </div>
                            <p className="font-semibold text-black text-sm mb-1">{exp.company}</p>
                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* EDUCATION */}
        {education?.length > 0 && (
            <div className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-widest mb-3 border-b pb-1" style={{ color: accent_color, borderColor: accent_color }}>Education</h2>
                <div className="flex flex-col gap-4">
                    {education.map((edu, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-semibold text-base">{edu.degree}</h3>
                                <span className="text-xs text-black/60 font-semibold bg-black/5 px-2 py-0.5 rounded">{edu.year}</span>
                            </div>
                            <p className="font-semibold text-black text-sm">{edu.school}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}
        
      </div>
    </div>
  )
}

export default ResumePreview
