import React from 'react'

const ExperienceForm = ({ experience, setResumeData }) => {

    const updateExp = (index, field, value) => {
        setResumeData(prev => {
            const newExp = [...prev.experience];
            newExp[index] = { ...newExp[index], [field]: value };
            return { ...prev, experience: newExp };
        })
    }

    const deleteExp = (index) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index)
        }))
    }

    const addExp = () => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, { title: '', company: '', duration: '', description: '' }]
        }))
    }

    return (
        <div className="flex flex-col gap-6">
            {experience.map((exp, index) => (
                <div key={index} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 relative group">
                    <button 
                        onClick={() => deleteExp(index)}
                        className="absolute -top-3 -right-3 w-7 h-7 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white cursor-pointer"
                        title="Remove Experience"
                    >
                        &times;
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="relative md:col-span-2">
                            <input 
                                value={exp.title} 
                                onChange={(e) => updateExp(index, 'title', e.target.value)} 
                                placeholder="Job Title (e.g. Senior Frontend Engineer)"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#A6FF5D]/50 outline-none transition-all font-semibold"
                            />
                        </div>
                        <div className="relative">
                            <input 
                                value={exp.company} 
                                onChange={(e) => updateExp(index, 'company', e.target.value)} 
                                placeholder="Company Name"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#A6FF5D]/50 outline-none transition-all"
                            />
                        </div>
                        <div className="relative">
                            <input 
                                value={exp.duration} 
                                onChange={(e) => updateExp(index, 'duration', e.target.value)} 
                                placeholder="Duration (e.g. Jan 2020 - Present)"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#A6FF5D]/50 outline-none transition-all"
                            />
                        </div>
                        <div className="relative md:col-span-2">
                            <textarea 
                                value={exp.description} 
                                onChange={(e) => updateExp(index, 'description', e.target.value)} 
                                placeholder="Describe your responsibilities and achievements..."
                                rows="4"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#A6FF5D]/50 outline-none transition-all resize-y leading-relaxed"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button 
                onClick={addExp}
                className="w-full border border-dashed border-white/20 hover:border-[#A6FF5D]/50 text-gray-400 hover:text-[#A6FF5D] rounded-xl py-3 text-sm font-medium transition-all cursor-pointer bg-white/[0.01] hover:bg-white/[0.03]"
            >
                + Add Experience
            </button>
        </div>
    )
}
export default ExperienceForm
