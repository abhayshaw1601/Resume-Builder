import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockResumeData } from '../../constants/mockData';

// Import all templates
import AcademicCVTemplate from '../../assets/templates/AcademicCVTemplate';
import BentoBoxTemplate from '../../assets/templates/BentoBoxTemplate';
import ClassicTemplate from '../../assets/templates/ClassicTemplate';
import ExecutiveTemplate from '../../assets/templates/ExecutiveTemplate';
import GitHubDarkTemplate from '../../assets/templates/GitHubDarkTemplate';
import InfographicTemplate from '../../assets/templates/InfographicTemplate';
import MinimalImageTemplate from '../../assets/templates/MinimalImageTemplate';
import MinimalTemplate from '../../assets/templates/MinimalTemplate';
import ModernMonoTemplate from '../../assets/templates/ModernMonoTemplate';
import ModernTemplate from '../../assets/templates/ModernTemplate';
import PitchDeckTemplate from '../../assets/templates/PitchDeckTemplate';
import SplitScreenTemplate from '../../assets/templates/SplitScreenTemplate';
import StandardATSTemplate from '../../assets/templates/StandardATSTemplate';
import TerminalTemplate from '../../assets/templates/TerminalTemplate';
import TimelineTemplate from '../../assets/templates/TimelineTemplate';

const templates = [
    { id: 'modern', name: 'Modern', component: ModernTemplate, description: 'Clean and professional with sidebar' },
    { id: 'classic', name: 'Classic', component: ClassicTemplate, description: 'Traditional academic and corporate style' },
    { id: 'minimal', name: 'Minimal', component: MinimalTemplate, description: 'Simple and direct presentation' },
    { id: 'executive', name: 'Executive', component: ExecutiveTemplate, description: 'Sophisticated design for senior roles' },
    { id: 'github-dark', name: 'GitHub Dark', component: GitHubDarkTemplate, description: 'Developer-focused dark theme' },
    { id: 'academic', name: 'Academic CV', component: AcademicCVTemplate, description: 'Detailed structure for academia' },
    { id: 'bento', name: 'Bento Box', component: BentoBoxTemplate, description: 'Trendy grid-based layout' },
    { id: 'infographic', name: 'Infographic', component: InfographicTemplate, description: 'Visual-first modern design' },
    { id: 'minimal-image', name: 'Minimal Image', component: MinimalImageTemplate, description: 'Minimalist with profile photo' },
    { id: 'modern-mono', name: 'Modern Mono', component: ModernMonoTemplate, description: 'Monochrome professional style' },
    { id: 'pitch-deck', name: 'Pitch Deck', component: PitchDeckTemplate, description: 'Creative and presentation-like' },
    { id: 'split-screen', name: 'Split Screen', component: SplitScreenTemplate, description: 'Bold two-column layout' },
    { id: 'ats-standard', name: 'Standard ATS', component: StandardATSTemplate, description: 'Optimized for ATS systems' },
    { id: 'terminal', name: 'Terminal', component: TerminalTemplate, description: 'Nerd-friendly command line style' },
    { id: 'timeline', name: 'Timeline', component: TimelineTemplate, description: 'Experience-focused timeline view' },
];

const TemplatesGallery = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleUseTemplate = () => {
        if (isAuthenticated) {
            navigate('/app');
        } else {
            navigate('/register');
        }
    };

    return (
        <section id="templates-gallery" className="py-24 bg-[#0a0a0a] text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Choose Your Template
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Select from our professional templates designed to help you land your next big opportunity.
                        All templates are fully customizable and ATS-friendly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {templates.map((template) => (
                        <div 
                            key={template.id}
                            className="group relative bg-[#111] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#A6FF5D]/30 hover:translate-y-[-4px]"
                        >
                            <div className="aspect-[1/1.414] w-full overflow-hidden bg-[#050505] relative cursor-pointer group" onClick={() => setSelectedTemplate(template)}>
                                {/* Preview Container */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[1131px] scale-[0.35] sm:scale-[0.4] md:scale-[0.45] lg:scale-[0.38] xl:scale-[0.42] pointer-events-none group-hover:opacity-90 transition-opacity">
                                    <div className="w-full h-full text-black shadow-2xl overflow-hidden" style={{ backgroundColor: template.id.includes('dark') || template.id === 'terminal' ? '#0d1117' : 'white' }}>
                                        <template.component 
                                            data={mockResumeData} 
                                            isDarkMode={template.id.includes('dark') || template.id === 'terminal'}
                                            accentColor="#A6FF5D"
                                            accentBg="rgba(166, 255, 93, 0.1)"
                                        />
                                    </div>
                                </div>
                                
                                {/* Overlay with actions */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        Preview Template
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-1">{template.name}</h3>
                                <p className="text-sm text-gray-400">{template.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Full Preview Modal */}
            {selectedTemplate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    <div 
                        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedTemplate(null)}
                    ></div>
                    <div className="relative bg-[#111] w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden flex flex-col border border-white/10">
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div>
                                <h3 className="text-2xl font-bold">{selectedTemplate.name}</h3>
                                <p className="text-gray-400 text-sm">{selectedTemplate.description}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedTemplate(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#050505]">
                            <div className="w-[800px] max-w-full mx-auto text-black shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden min-h-[1131px]" style={{ backgroundColor: selectedTemplate.id.includes('dark') || selectedTemplate.id === 'terminal' ? '#0d1117' : 'white' }}>
                                <selectedTemplate.component 
                                    data={mockResumeData} 
                                    isDarkMode={selectedTemplate.id.includes('dark') || selectedTemplate.id === 'terminal'}
                                    accentColor="#A6FF5D"
                                    accentBg="rgba(166, 255, 93, 0.1)"
                                />
                            </div>
                        </div>
                        <div className="p-6 border-t border-white/10 flex justify-center">
                            <button 
                                onClick={handleUseTemplate}
                                className="bg-[#A6FF5D] text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform cursor-pointer"
                            >
                                Use This Template
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default TemplatesGallery;
