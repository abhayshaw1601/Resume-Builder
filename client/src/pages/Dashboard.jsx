import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [allresume, setallresume] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newResumeName, setNewResumeName] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadResumeName, setUploadResumeName] = useState('')
  const [deleteId, setDeleteId] = useState(null)
  const [isExtracting, setIsExtracting] = useState(false)

  // Fetch real resumes from API
  const fetchResumes = async () => {
    try {
      setLoading(true)
      const { data } = await API.get('/resumes')
      setallresume(data)
    } catch (error) {
      console.error('Failed to fetch resumes:', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResumes()
  }, [])

  const [isCreating, setIsCreating] = useState(false)

  const handleCreateConfirm = async () => {
    if (!newResumeName.trim() || isCreating) return;

    if (allresume.some(r => r.title.toLowerCase() === newResumeName.trim().toLowerCase())) {
        alert("A resume with this title already exists. Please choose a different name.");
        return;
    }

    try {
      setIsCreating(true)
      const { data } = await API.post('/resumes', { title: newResumeName.trim() })
      setShowCreateModal(false)
      setNewResumeName('')
      navigate(`/app/builder/${data._id}`)
    } catch (error) {
      console.error('Create resume error:', error.message)
      setIsCreating(false)
    }
  }

  const handleUploadConfirm = async () => {
    if (!selectedFile || !uploadResumeName.trim() || isExtracting) return;

    if (allresume.some(r => r.title.toLowerCase() === uploadResumeName.trim().toLowerCase())) {
        alert("A resume with this title already exists. Please choose a different name.");
        return;
    }

    try {
      setIsExtracting(true)
      const formData = new FormData();
      formData.append('resume', selectedFile);
      formData.append('title', uploadResumeName.trim());

      const { data } = await API.post('/resumes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setShowUploadModal(false);
      setSelectedFile(null);
      setUploadResumeName('');
      
      // Redirect to builder to check errors as requested
      navigate(`/app/builder/${data._id}`);
    } catch (error) {
      console.error('Upload error:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Failed to extract resume data. Please try again.');
      setIsExtracting(false);
    }
  }

  const [deletingIds, setDeletingIds] = useState([])

  const handleDelete = async (id) => {
    // Immediate UI feedback
    setDeletingIds(prev => [...prev, id])
    setDeleteId(null)
      
    // Trigger unmount slightly after particle explosion (400ms)
    setTimeout(() => {
        setallresume(prev => prev.filter(r => r._id !== id))
        setDeletingIds(prev => prev.filter(dId => dId !== id))
    }, 400)

    try {
      // Fire HTTP request asynchronously without blocking UI timing
      await API.delete(`/resumes/${id}`)
    } catch (error) {
      console.error('Delete resume error:', error.message)
      // Note: A robust system might rollback allresume here on failure
    }
  }

  return (
    <div className="w-full text-white relative">
      <style>{`
        @keyframes particle-explode {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
      `}</style>
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A6FF5D]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back, <span className="text-[#A6FF5D]">{user?.name?.split(' ')[0] || 'User'}</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">Manage your resumes, edit templates, and track your ATS match scores.</p>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-5 py-2.5 rounded-full text-sm font-medium transition duration-300 flex items-center gap-2 cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Upload Resume
          </button>
        </div>
      </div>

      {/* Resumes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {/* Create New Card */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-white/[0.02] border border-dashed border-white/20 hover:border-[#A6FF5D]/50 hover:bg-[#A6FF5D]/5 rounded-2xl h-[320px] flex flex-col items-center justify-center p-6 text-center transition-all duration-300 cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-[#A6FF5D]/20 border border-transparent group-hover:border-[#A6FF5D]/30 flex items-center justify-center mb-4 transition-colors duration-300 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400 group-hover:text-[#A6FF5D] transition-colors duration-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </div>
          <h3 className="text-xl font-medium text-white group-hover:text-[#A6FF5D] transition-colors duration-300">Create New</h3>
          <p className="text-sm text-gray-500 mt-2">Start from scratch or use an exact template.</p>
        </button>

        {/* Loading Skeletons */}
        {loading && Array.from({ length: 3 }).map((_, i) => (
          <div key={`skeleton-${i}`} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl h-[320px] flex flex-col overflow-hidden animate-pulse">
            <div className="flex-1 bg-white/5 border-b border-white/[0.06]" />
            <div className="p-5 flex flex-col gap-2">
              <div className="w-2/3 h-4 bg-white/10 rounded" />
              <div className="w-1/3 h-3 bg-white/5 rounded" />
            </div>
          </div>
        ))}

        {/* Empty State */}
        {!loading && allresume.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No resumes yet</h3>
            <p className="text-sm text-gray-500 max-w-sm">Click "Create New" to build your first resume and land your dream job.</p>
          </div>
        )}

        {/* Existing Resumes */}
        {!loading && allresume.map((resume) => (
          <div key={resume._id} className="relative w-full h-[400px]">
            {/* Particle Explosion Layer */}
            {deletingIds.includes(resume._id) && (
                <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div 
                            key={i} 
                            className="absolute w-2 h-2 rounded-full bg-red-500 opacity-0"
                            style={{
                                animation: `particle-explode 0.4s ease-out forwards`,
                                '--tx': `${(Math.random() - 0.5) * 300}px`,
                                '--ty': `${(Math.random() - 0.5) * 300}px`,
                            }}
                        />
                    ))}
                </div>
            )}

            <div 
              onClick={() => navigate(`/app/preview/${resume._id}`)}
              className={`w-full h-full bg-white/[0.03] border border-white/[0.06] hover:border-[#A6FF5D]/30 rounded-2xl flex flex-col overflow-hidden transition-all duration-300 group relative cursor-pointer ${
                  deletingIds.includes(resume._id) ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'
              }`}
            >

              {/* Thumbnail placeholder */}
              <div className="flex-1 bg-white/5 border-b border-white/[0.06] p-4 relative overflow-hidden group-hover:opacity-80 transition-opacity">
                <div className="w-full h-full bg-black/40 rounded-lg shadow-inner flex flex-col p-4 gap-2 border border-white/5 relative">
                  <div className="w-1/2 h-3 rounded mb-2" style={{ backgroundColor: resume.accent_color || '#A6FF5D', opacity: 0.8 }}></div>
                  <div className="w-full h-1 bg-gray-700 mt-2 rounded"></div>
                  <div className="w-4/5 h-1 bg-gray-700 rounded"></div>
                  <div className="w-3/4 h-1 bg-gray-700 rounded"></div>
                  <div className="w-full flex gap-2 mt-4">
                    <div className="w-1/3 h-16 bg-white/5 rounded"></div>
                    <div className="w-2/3 h-16 bg-white/5 rounded flex-col flex gap-1.5 p-1.5">
                      <div className="w-full h-1 bg-gray-600 rounded"></div>
                      <div className="w-full h-1 bg-gray-600 rounded"></div>
                      <div className="w-2/3 h-1 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay Actions */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/app/builder/${resume._id}`);
                    }}
                    className="w-12 h-12 rounded-full bg-[#A6FF5D] shadow-[0_0_20px_rgba(166,255,93,0.3)] text-black flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                    title="Edit resume"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteId(resume._id);
                    }}
                    className="w-12 h-12 rounded-full bg-red-500/20 hover:bg-red-500/80 text-red-400 hover:text-white flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
                    title="Delete resume"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </button>
                </div>
              </div>

              {/* Meta info */}
              <div className="p-5 flex flex-col justify-end">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white truncate pr-2 text-sm" title={resume.title}>{resume.title}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 border border-white/10 px-2 py-0.5 rounded-full shrink-0">
                    {resume.template || 'classic'}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Updated {new Date(resume.updatedAt).toLocaleDateString()}</p>
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setDeleteId(null)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-sm p-6 shadow-2xl flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-red-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Delete Resume?</h2>
                <p className="text-sm text-gray-400">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Resume Modal */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowCreateModal(false)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative scale-100 flex flex-col gap-6"
          >
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Create New Resume</h2>
              <p className="text-sm text-gray-400">Give your new resume a title to get started.</p>
            </div>

            <div className="relative group">
              <input
                type="text"
                id="createResumeName"
                value={newResumeName}
                onChange={(e) => setNewResumeName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateConfirm()
                }}
                required
                placeholder=" "
                autoFocus
                className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-[#A6FF5D]/50 focus:bg-white/[0.07] transition-all duration-300 peer"
              />
              <label
                htmlFor="createResumeName"
                className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#A6FF5D] cursor-text"
              >
                Resume Title
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateConfirm}
                className="bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-black px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50"
                disabled={!newResumeName.trim() || isCreating}
              >
                {isCreating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Resume Modal */}
      {showUploadModal && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => {
            setShowUploadModal(false)
            setSelectedFile(null)
            setUploadResumeName('')
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative scale-100 flex flex-col gap-6"
          >
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Upload Resume</h2>
              <p className="text-sm text-gray-400">Upload an existing resume to verify its ATS scores.</p>
            </div>

            {/* Drag and Drop Zone */}
            {!selectedFile ? (
                <div className="w-full h-40 bg-white/5 border-2 border-dashed border-white/20 hover:border-[#A6FF5D]/50 rounded-xl flex flex-col items-center justify-center transition-colors relative group">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400 group-hover:text-[#A6FF5D] mb-3 transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <p className="text-sm text-gray-300 font-medium mb-1">Drag and drop file here</p>
                    <p className="text-xs text-gray-500 mb-3">- OR -</p>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded text-xs font-medium transition-colors pointer-events-none">
                        Browse Files
                    </button>
                    <input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                            if(e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                const isValid = 
                                    file.type === 'application/pdf' || 
                                    file.type === 'application/msword' || 
                                    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                                    file.name.toLowerCase().endsWith('.pdf') ||
                                    file.name.toLowerCase().endsWith('.doc') ||
                                    file.name.toLowerCase().endsWith('.docx');
                                
                                if (isValid) {
                                    setSelectedFile(file);
                                } else {
                                    alert('Please upload only PDF or Word formatting files (.pdf, .doc, .docx).');
                                }
                            }
                        }}
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <div className="relative group">
                        <input 
                            type="text" 
                            id="uploadResumeName"
                            value={uploadResumeName}
                            onChange={(e) => setUploadResumeName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleUploadConfirm()
                            }}
                            required
                            placeholder=" "
                            autoFocus
                            className="block w-full px-4 pt-5 pb-2 text-sm text-white bg-white/5 border border-white/10 rounded-xl appearance-none focus:outline-none focus:border-[#A6FF5D]/50 focus:bg-white/[0.07] transition-all duration-300 peer"
                        />
                        <label
                            htmlFor="uploadResumeName"
                            className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-[#A6FF5D] cursor-text"
                        >
                            Resume Title
                        </label>
                    </div>

                    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-10 h-10 rounded bg-[#A6FF5D]/20 flex items-center justify-center shrink-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#A6FF5D]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            </div>
                            <div className="truncate pr-4">
                                <p className="text-sm font-medium text-white truncate">{selectedFile.name}</p>
                                <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setSelectedFile(null)}
                            className="text-gray-400 hover:text-[#A6FF5D] p-2 shrink-0 transition-colors cursor-pointer"
                            title="Remove or replace file"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-end gap-3 mt-2">
              <button
                onClick={() => {
                    setShowUploadModal(false)
                    setSelectedFile(null)
                    setUploadResumeName('')
                }}
                className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadConfirm}
                className="bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-black px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50"
                disabled={!selectedFile || !uploadResumeName.trim() || isExtracting}
              >
                {isExtracting ? 'Extracting...' : 'Upload & Extract'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Resume Modal */}
      {/* ... (existing code continues) ... */}
      
      {/* Extraction Loading Overlay */}
      {isExtracting && (
          <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl">
              <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-full border-4 border-[#A6FF5D]/10 border-t-[#A6FF5D] animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-[#A6FF5D] animate-pulse" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">AI is Extracting...</h2>
              <p className="text-gray-400 text-center max-w-xs">Building your professional resume from your file. This may take 5-10 seconds.</p>
          </div>
      )}
    </div>
  )
}

export default Dashboard