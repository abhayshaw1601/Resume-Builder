import React from 'react'

const TemplateSelectorForm = ({ currentTemplate, setResumeData }) => {
    
    const templates = [
        { id: 'classic', name: 'Classic Minimal' },
        { id: 'modern', name: 'Modern Minimal' },
        { id: 'minimal-text', name: 'Text Heavy' },
        { id: 'minimal-image', name: 'Minimal Portrait' },
        { id: 'executive', name: 'Executive Split' },
        { id: 'standard-ats', name: 'Standard ATS' },
        { id: 'github-dark', name: 'GitHub Dark' },
        { id: 'modern-mono', name: 'Modern Mono' },
        { id: 'split-screen', name: 'Split Screen' },
        { id: 'bento-box', name: 'Bento Box' },
        { id: 'timeline', name: 'Timeline' },
        { id: 'terminal', name: 'Terminal' },
        { id: 'academic-cv', name: 'Academic CV' },
        { id: 'infographic', name: 'Infographic' },
        { id: 'pitch-deck', name: 'Pitch Deck' }
    ]

    const handleSelect = (id) => {
        setResumeData(prev => ({ ...prev, template: id }))
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {templates.map(tmp => (
                <button
                    key={tmp.id}
                    onClick={() => handleSelect(tmp.id)}
                    className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all duration-300 font-semibold cursor-pointer ${currentTemplate === tmp.id ? 'bg-[#A6FF5D]/10 border-[#A6FF5D] text-[#A6FF5D] shadow-[0_0_15px_rgba(166,255,93,0.15)] scale-105 z-10' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/10'}`}
                >
                    <span className="text-xs tracking-wider uppercase text-center leading-tight">{tmp.name}</span>
                </button>
            ))}
        </div>
    )
}

export default TemplateSelectorForm
