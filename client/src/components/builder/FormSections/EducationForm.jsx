import React from 'react'

const EducationForm = ({ education, setResumeData }) => {

    const updateEdu = (index, field, value) => {
        setResumeData(prev => {
            const newEdu = [...prev.education];
            newEdu[index] = { ...newEdu[index], [field]: value };
            return { ...prev, education: newEdu };
        })
    }

    const deleteEdu = (index) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }))
    }

    const addEdu = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, { degree: '', school: '', year: '', description: '' }]
        }))
    }

    return (
        <div className="flex flex-col gap-6">
            {education.map((edu, index) => (
                <div key={index} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 relative group">
                    <button 
                        onClick={() => deleteEdu(index)}
                        className="absolute -top-3 -right-3 w-7 h-7 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white cursor-pointer"
                        title="Remove Education"
                    >
                        &times;
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="relative">
                            <input 
                                value={edu.degree} 
                                onChange={(e) => updateEdu(index, 'degree', e.target.value)} 
                                placeholder="Degree (e.g. B.S. Computer Science)"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#A6FF5D]/50 outline-none transition-all"
                            />
                        </div>
                        <div className="relative">
                            <input 
                                value={edu.school} 
                                onChange={(e) => updateEdu(index, 'school', e.target.value)} 
                                placeholder="Institution Name"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#A6FF5D]/50 outline-none transition-all"
                            />
                        </div>
                        <div className="relative md:col-span-2">
                            <input 
                                value={edu.year} 
                                onChange={(e) => updateEdu(index, 'year', e.target.value)} 
                                placeholder="Year (e.g. 2020 - 2024)"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#A6FF5D]/50 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button 
                onClick={addEdu}
                className="w-full border border-dashed border-white/20 hover:border-[#A6FF5D]/50 text-gray-400 hover:text-[#A6FF5D] rounded-xl py-3 text-sm font-medium transition-all cursor-pointer bg-white/[0.01] hover:bg-white/[0.03]"
            >
                + Add Education
            </button>
        </div>
    )
}
export default EducationForm
