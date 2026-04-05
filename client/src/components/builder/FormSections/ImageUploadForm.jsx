import React, { useState, useRef } from 'react'
import { UploadCloudIcon, CropIcon, ImageMinusIcon, SlidersHorizontalIcon, CheckIcon } from 'lucide-react'

const ImageUploadForm = ({ data, onChange }) => {
  const fileInputRef = useRef(null)
  
  // Local state for the advanced editor UI toggle
  const [isEditing, setIsEditing] = useState(false)
  const [isProcessingBg, setIsProcessingBg] = useState(false)

  // Ensure settings object exists
  const settings = data?.photo_settings || { scale: 1, offsetX: 0, offsetY: 0, grayscale: 0, brightness: 100 }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.')
        return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
        // Trigger a fake event to mimic standard text inputs for the handleChange map
        onChange({ target: { name: 'photo', value: event.target.result } })
        
        // Reset settings for new photos
        onChange({ target: { name: 'photo_settings', value: { scale: 1, offsetX: 0, offsetY: 0, grayscale: 0, brightness: 100 } } })
    }
    reader.readAsDataURL(file)
  }

  const handleSettingChange = (setting, value) => {
    onChange({ target: { name: 'photo_settings', value: { ...settings, [setting]: value } } })
  }

  const mockRemoveBackground = () => {
    setIsProcessingBg(true)
    // Simulate complex ML processing delay
    setTimeout(() => {
        setIsProcessingBg(false)
        onChange({ target: { name: 'has_removed_bg', value: true } })
        alert("Mock: Background removed successfully! (Backend API will plug in here later).")
    }, 2500)
  }

  return (
    <div className="flex flex-col gap-4">
        {/* Upload Zone */}
        {!data?.photo ? (
            <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-white/20 hover:border-[#A6FF5D]/50 bg-white/5 hover:bg-[#A6FF5D]/5 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer group"
            >
                <UploadCloudIcon className="text-gray-400 group-hover:text-[#A6FF5D] mb-2 transition-colors" size={28} />
                <span className="text-sm text-gray-300 font-medium">Click to upload picture</span>
                <span className="text-xs text-gray-500 mt-1">.JPG or .PNG (Max 5MB)</span>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                />
            </div>
        ) : (
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col gap-4 relative overflow-hidden">
                {/* Active Photo Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full border border-[#A6FF5D] overflow-hidden flex items-center justify-center bg-black shrink-0 relative">
                            {isProcessingBg && (
                                <div className="absolute inset-0 bg-[#A6FF5D]/20 animate-pulse z-10"></div>
                            )}
                            <img 
                                src={data.photo} 
                                alt="Profile" 
                                className="w-full h-full object-cover transition-all"
                                style={{
                                    transform: `scale(${settings.scale}) translate(${settings.offsetX}px, ${settings.offsetY}px)`,
                                    filter: `grayscale(${settings.grayscale}%) brightness(${settings.brightness}%)`
                                }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-white">Profile Photo Active</span>
                            <span className="text-xs text-[#A6FF5D]">Ready for document rendering</span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => {
                            onChange({ target: { name: 'photo', value: null } })
                            onChange({ target: { name: 'has_removed_bg', value: false } })
                        }}
                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                        title="Remove completely"
                    >
                        &times;
                    </button>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-colors ${isEditing ? 'bg-[#A6FF5D] text-black' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    >
                        {isEditing ? <CheckIcon size={14} /> : <CropIcon size={14} />}
                        {isEditing ? 'Done Editing' : 'Crop & Align'}
                    </button>

                    <button 
                        onClick={mockRemoveBackground}
                        disabled={isProcessingBg || data?.has_removed_bg}
                        className="flex items-center justify-center gap-2 bg-[#A6FF5D]/10 hover:bg-[#A6FF5D]/20 border border-[#A6FF5D]/20 text-[#A6FF5D] py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-50"
                    >
                        <ImageMinusIcon size={14} />
                        {isProcessingBg ? 'Scanning...' : data?.has_removed_bg ? 'Background Removed' : 'Remove Background'}
                    </button>
                </div>

                {/* Advanced Editor Sliders (Conditionally Rendered) */}
                {isEditing && (
                    <div className="bg-black/30 rounded-lg p-4 flex flex-col gap-4 mt-2 border border-white/5 animate-fade-in shadow-inner">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-widest mb-1 border-b border-white/10 pb-2">
                            <SlidersHorizontalIcon size={12} /> Pro Adjustments
                        </div>
                        
                        {/* Zoom Factor */}
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Zoom Scale</span>
                                <span className="text-[#A6FF5D]">{settings.scale}x</span>
                            </div>
                            <input 
                                type="range" 
                                min="0.5" max="3" step="0.1" 
                                value={settings.scale} 
                                onChange={(e) => handleSettingChange('scale', parseFloat(e.target.value))}
                                className="w-full accent-[#A6FF5D] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" 
                            />
                        </div>

                        {/* X Alignment */}
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Horizontal Alignment</span>
                            </div>
                            <input 
                                type="range" 
                                min="-100" max="100" step="1" 
                                value={settings.offsetX} 
                                onChange={(e) => handleSettingChange('offsetX', parseInt(e.target.value))}
                                className="w-full accent-[#A6FF5D] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" 
                            />
                        </div>

                        {/* Y Alignment */}
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Vertical Alignment</span>
                            </div>
                            <input 
                                type="range" 
                                min="-100" max="100" step="1" 
                                value={settings.offsetY} 
                                onChange={(e) => handleSettingChange('offsetY', parseInt(e.target.value))}
                                className="w-full accent-[#A6FF5D] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" 
                            />
                        </div>

                        {/* Grayscale filter */}
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-gray-400">Grayscale Filter</span>
                                <span className="text-gray-500">{settings.grayscale}%</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" max="100" step="1" 
                                value={settings.grayscale} 
                                onChange={(e) => handleSettingChange('grayscale', parseInt(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" 
                            />
                        </div>
                        
                    </div>
                )}
            </div>
        )}
    </div>
  )
}
export default ImageUploadForm
