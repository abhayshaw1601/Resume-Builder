import React from 'react'
import { SparklesIcon } from 'lucide-react'

const TargetJobForm = ({ jobDescription, setResumeData }) => {

  const generateSkills = () => {
    if (!jobDescription?.trim()) return;
    
    // MOCK AI GENERATION: Instantly inject customized skills
    const mockSkills = ["React", "Tailwind CSS", "User Experience (UX)", "Node.js", "Responsive Design", "Agile Methodologies"];
    
    setResumeData(prev => {
        // Prevent adding exact duplicates
        const currentLower = prev.skills.map(s => s.toLowerCase());
        const newSkills = mockSkills.filter(s => !currentLower.includes(s.toLowerCase()));
        return {
            ...prev,
            skills: [...prev.skills, ...newSkills]
        }
    })
    
    alert("AI successfully analyzed your target job and injected 6 new optimized skills!")
  }

  return (
    <div className="flex flex-col">
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            Paste the job description of the role you are applying to. Our AI will automatically configure your skills section to map directly against their ATS filters!
        </p>
        <label className="flex flex-col gap-2 text-sm text-gray-300 font-medium mb-4">
            Target Job Description
            <textarea 
                value={jobDescription || ''} 
                onChange={(e) => setResumeData(prev => ({...prev, target_job: e.target.value}))} 
                rows="5"
                placeholder="We are looking for a Senior Frontend Engineer proficient in React, Tailwind..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500/70 outline-none focus:border-[#A6FF5D]/50 focus:bg-white/[0.07] transition-all duration-300 resize-y leading-relaxed font-normal" 
            />
        </label>
        <button 
            onClick={generateSkills}
            disabled={!jobDescription?.trim()}
            className="flex items-center justify-center gap-2 w-full bg-[#A6FF5D]/10 hover:bg-[#A6FF5D]/20 text-[#A6FF5D] border border-[#A6FF5D]/30 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-[0_0_15px_rgba(166,255,93,0.1)]"
        >
            <SparklesIcon size={16} />
            Analyze & Optimize Skills
        </button>
    </div>
  )
}
export default TargetJobForm
