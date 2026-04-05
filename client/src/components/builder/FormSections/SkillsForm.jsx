import React, { useState } from 'react'

const SkillsForm = ({ skills, setResumeData }) => {
  const [newSkill, setNewSkill] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newSkill.trim()) return
    
    setResumeData(prev => {
        if (!prev.skills.includes(newSkill.trim())) {
            return { ...prev, skills: [...prev.skills, newSkill.trim()] }
        }
        return prev;
    })
    setNewSkill('')
  }

  const removeSkill = (skillToRemove) => {
    setResumeData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s !== skillToRemove)
    }))
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input 
          type="text" 
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="e.g. JavaScript, Next.js, Figma"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-[#A6FF5D]/50 outline-none transition-all"
        />
        <button type="submit" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer">
          Add
        </button>
      </form>
      
      <div className="flex flex-wrap gap-2 mt-2">
        {skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-white/5 border border-[#A6FF5D]/20 text-[#A6FF5D] px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(166,255,93,0.05)]">
            <span className="text-sm font-medium">{skill}</span>
            <button 
                onClick={() => removeSkill(skill)} 
                className="text-gray-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
            >
              &times;
            </button>
          </div>
        ))}
        {skills.length === 0 && <p className="text-sm text-gray-500 italic mt-2">No skills added yet.</p>}
      </div>
    </div>
  )
}
export default SkillsForm
