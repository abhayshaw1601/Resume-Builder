import React, { useState } from 'react'

const GRADIENT_PRESETS = [
    { name: 'Cyber Green', value: '#A6FF5D', type: 'solid' },
    { name: 'Ocean Blue', value: '#3B82F6', type: 'solid' },
    { name: 'Royal Purple', value: '#8B5CF6', type: 'solid' },
    { name: 'Warm Crimson', value: '#EF4444', type: 'solid' },
    { name: 'Teal Pro', value: '#14B8A6', type: 'solid' },
    { name: 'Amber Gold', value: '#F59E0B', type: 'solid' },
    { name: 'Slate Dark', value: '#475569', type: 'solid' },
    { name: 'Rose Pink', value: '#EC4899', type: 'solid' },
    { name: 'Midnight Navy', value: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', type: 'gradient' },
    { name: 'Royal Emerald', value: 'linear-gradient(135deg, #134e5e, #71b280)', type: 'gradient' },
    { name: 'Sunset Gold', value: 'linear-gradient(135deg, #f7971e, #ffd200)', type: 'gradient' },
    { name: 'Deep Violet', value: 'linear-gradient(135deg, #4b0082, #7b2d8b, #9b59b6)', type: 'gradient' },
    { name: 'Steel Pro', value: 'linear-gradient(135deg, #1c1c2e, #2d3561)', type: 'gradient' },
    { name: 'Forest Pine', value: 'linear-gradient(135deg, #1a3a2a, #2d6a4f)', type: 'gradient' },
    { name: 'Crimson Fade', value: 'linear-gradient(135deg, #6a0000, #c0392b)', type: 'gradient' },
    { name: 'Ocean Depths', value: 'linear-gradient(135deg, #0077b6, #00b4d8)', type: 'gradient' },
]

// Extracts a usable solid color from any value (gradient or solid)
export const getAccentSolidColor = (value) => {
    if (!value) return '#A6FF5D'
    if (value.startsWith('linear-gradient')) {
        const match = value.match(/#[0-9a-fA-F]{3,6}/)
        return match ? match[0] : '#A6FF5D'
    }
    return value
}

const ThemeSettingsForm = ({ accentColor, setResumeData }) => {
    const [customColor, setCustomColor] = useState(
        accentColor?.startsWith('linear-gradient') ? '#A6FF5D' : (accentColor || '#A6FF5D')
    )

    const handleSelect = (value) => {
        setResumeData(prev => ({ ...prev, accent_color: value }))
    }

    const handleCustomColor = (e) => {
        setCustomColor(e.target.value)
        setResumeData(prev => ({ ...prev, accent_color: e.target.value }))
    }

    const isActive = (value) => accentColor === value

    return (
        <div className="flex flex-col gap-6">
            <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Solid Colors</p>
                <div className="grid grid-cols-4 gap-3">
                    {GRADIENT_PRESETS.filter(p => p.type === 'solid').map(preset => (
                        <button
                            key={preset.name}
                            onClick={() => handleSelect(preset.value)}
                            title={preset.name}
                            className={`relative h-10 rounded-lg transition-all duration-200 shadow-md cursor-pointer border-2 ${isActive(preset.value) ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                            style={{ backgroundColor: preset.value }}
                        >
                            {isActive(preset.value) && (
                                <span className="absolute inset-0 flex items-center justify-center text-black font-extrabold text-xs">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Professional Gradients</p>
                <div className="grid grid-cols-2 gap-3">
                    {GRADIENT_PRESETS.filter(p => p.type === 'gradient').map(preset => (
                        <button
                            key={preset.name}
                            onClick={() => handleSelect(preset.value)}
                            className={`relative h-12 rounded-xl transition-all duration-200 cursor-pointer border-2 overflow-hidden ${isActive(preset.value) ? 'border-white scale-105 shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'border-transparent hover:border-white/30 hover:scale-102'}`}
                            style={{ background: preset.value }}
                        >
                            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold drop-shadow-lg tracking-wide">
                                {isActive(preset.value) ? '✓ ' : ''}{preset.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">Custom Color</p>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
                    <input
                        type="color"
                        value={customColor}
                        onChange={handleCustomColor}
                        className="w-10 h-10 rounded-lg border-none cursor-pointer bg-transparent"
                    />
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{customColor.toUpperCase()}</p>
                        <p className="text-xs text-gray-500">Pick any custom accent color</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThemeSettingsForm
