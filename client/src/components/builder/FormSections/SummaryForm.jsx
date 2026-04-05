import React from 'react'

const SummaryForm = ({ data, onChange }) => {
  return (
    <div className="flex flex-col">
        <label className="flex flex-col gap-2 text-sm text-gray-300 font-medium">
            Professional Summary
            <textarea 
                name="summary" 
                value={data || ''} 
                onChange={onChange} 
                rows="6"
                placeholder="Write a brief professional summary highlighting your key achievements and core competencies..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500/70 outline-none focus:border-[#A6FF5D]/50 focus:bg-white/[0.07] transition-all duration-300 resize-y leading-relaxed font-normal" 
            />
        </label>
        <p className="text-xs text-gray-500 mt-2 text-right tracking-wide">{(data || '').length} characters</p>
    </div>
  )
}

export default SummaryForm
