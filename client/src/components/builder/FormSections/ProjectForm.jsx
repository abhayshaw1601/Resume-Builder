import React from 'react'

const ProjectForm = ({ projects, setResumeData }) => {

    const updateProject = (index, field, value) => {
        setResumeData(prev => {
            const newProjects = [...prev.projects]
            newProjects[index] = { ...newProjects[index], [field]: value }
            return { ...prev, projects: newProjects }
        })
    }

    const deleteProject = (index) => {
        setResumeData(prev => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index)
        }))
    }

    const addProject = () => {
        setResumeData(prev => ({
            ...prev,
            projects: [...(prev.projects || []), { name: '', description: '', link: '', type: '' }]
        }))
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-[#A6FF5D]/5 border border-[#A6FF5D]/10 rounded-xl p-3 flex items-start gap-3">
                <div className="p-1 bg-[#A6FF5D]/20 rounded-md">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A6FF5D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </div>
                <div>
                    <p className="text-[11px] font-bold text-[#A6FF5D] uppercase tracking-wider mb-0.5">Pro Tip</p>
                    <p className="text-xs text-gray-400 leading-tight">Keep project descriptions to <span className="text-white italic">3-4 high-impact bullets</span> to ensure your resume stays on a single page.</p>
                </div>
            </div>

            {(projects || []).map((proj, index) => (
                <div key={index} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 relative group">
                    <button
                        onClick={() => deleteProject(index)}
                        className="absolute -top-3 -right-3 w-7 h-7 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white cursor-pointer"
                        title="Remove Project"
                    >
                        &times;
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="relative md:col-span-2">
                            <input
                                value={proj.name}
                                onChange={(e) => updateProject(index, 'name', e.target.value)}
                                placeholder="Project Name (e.g. TaskManager App)"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#A6FF5D]/50 outline-none transition-all font-semibold"
                            />
                        </div>
                        <div className="relative">
                            <input
                                value={proj.type}
                                onChange={(e) => updateProject(index, 'type', e.target.value)}
                                placeholder="Type (e.g. Web App, Mobile)"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#A6FF5D]/50 outline-none transition-all"
                            />
                        </div>
                        <div className="relative">
                            <div className="flex items-center gap-2 bg-black/20 border border-white/10 rounded-lg px-3 py-2 focus-within:border-[#A6FF5D]/50 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                <input
                                    value={proj.link}
                                    onChange={(e) => updateProject(index, 'link', e.target.value)}
                                    placeholder="Project URL (optional)"
                                    className="flex-1 bg-transparent text-sm text-white outline-none"
                                />
                            </div>
                        </div>
                        <div className="relative md:col-span-2">
                            <textarea
                                value={proj.description}
                                onChange={(e) => updateProject(index, 'description', e.target.value)}
                                placeholder="Describe the project, tech stack, and your role..."
                                rows="3"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#A6FF5D]/50 outline-none transition-all resize-y leading-relaxed"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={addProject}
                className="w-full border border-dashed border-white/20 hover:border-[#A6FF5D]/50 text-gray-400 hover:text-[#A6FF5D] rounded-xl py-3 text-sm font-medium transition-all cursor-pointer bg-white/[0.01] hover:bg-white/[0.03]"
            >
                + Add Project
            </button>
        </div>
    )
}

export default ProjectForm
