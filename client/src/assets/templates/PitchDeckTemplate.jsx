import { Linkedin, Github } from "../../components/icons/BrandIcons";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { cleanUsername } from "../../utils/formatters";

const PitchDeckTemplate = ({ isDarkMode, data, accentColor, accentBg, fontSize, headingSize, sectionSpacing }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Invalid Date") return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
        } catch (e) { return dateStr; }
    };

    return (
        <div className="w-full min-h-full bg-gray-900 text-white" style={{ fontSize: fontSize || 14 }}>
            {/* Hero Header */}
            <header className="p-10 pb-8 text-center relative overflow-hidden">
                {/* Background accent gradient */}
                <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(ellipse at top, ${accentColor}, transparent 70%)` }}></div>
                
                <div className="relative z-10">
                    <h1 className="font-black tracking-tight mb-2" style={{ fontSize: headingSize || 32 }}>
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    {data.experience?.[0]?.position && (
                        <p className="text-lg font-light mb-4" style={{ color: accentColor }}>{data.experience[0].position}</p>
                    )}

                    {/* Contact Row */}
                    <div className="flex flex-wrap justify-center gap-4 text-[0.75em] text-gray-400 mt-4">
                        {data.personal_info?.email && (
                            <a href={`mailto:${data.personal_info.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors"><Mail size={11} style={{ color: accentColor }} />{data.personal_info.email}</a>
                        )}
                        {data.personal_info?.phone && (
                            <a href={`tel:${data.personal_info.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:text-white transition-colors"><Phone size={11} style={{ color: accentColor }} />{data.personal_info.phone}</a>
                        )}
                        {data.personal_info?.location && (
                            <a 
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.personal_info.location)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 hover:text-white transition-colors"
                            >
                                <MapPin size={11} style={{ color: accentColor }} />
                                {data.personal_info.location}
                            </a>
                        )}
                        {data.personal_info?.linkedin && (
                            <a href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <Linkedin size={11} style={{ color: accentColor }} />
                                <span>{cleanUsername(data.personal_info.linkedin, 'linkedin')}</span>
                            </a>
                        )}
                        {data.personal_info?.github && (
                            <a href={data.personal_info.github.startsWith('http') ? data.personal_info.github : `https://${data.personal_info.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <Github size={11} style={{ color: accentColor }} />
                                <span>{cleanUsername(data.personal_info.github, 'github')}</span>
                            </a>
                        )}
                        {data.personal_info?.website && (
                            <a href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <Globe size={11} style={{ color: accentColor }} />
                                <span>{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                            </a>
                        )}
                    </div>
                </div>
            </header>

            <div className="px-8 pb-8 space-y-6">
                {/* Summary */}
                {data.professional_summary && (
                    <section className={`${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}/5 backdrop-blur-sm rounded-xl p-5 border border-white/10`} style={{ marginBottom: (sectionSpacing || 24) - 16 }}>
                        <p className="text-[0.875em] text-gray-300 leading-relaxed text-center italic max-w-2xl mx-auto">
                            "{data.professional_summary}"
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience?.length > 0 && (
                    <section style={{ marginBottom: (sectionSpacing || 24) - 16 }}>
                        <h2 className="font-black uppercase tracking-widest mb-5 text-center" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.65 : 20 }}>
                            Experience
                        </h2>
                        <div className="space-y-3">
                            {data.experience.map((exp, i) => (
                                <div key={i} className={`${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}/5 rounded-xl p-5 border border-white/10`}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-lg font-bold text-white">{exp.position}</h3>
                                        <span className={`text-[0.6875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} whitespace-nowrap ml-4 font-mono`}>
                                            {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-[0.875em] font-medium" style={{ color: accentColor }}>
                                        {exp.link
                                            ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{exp.company} ↗</a>
                                            : exp.company}
                                    </p>
                                    {exp.description && (
                                        <ul className="mt-2 space-y-0.5 text-[0.875em] text-gray-400">
                                            {exp.description.split("\n").filter(Boolean).map((line, j) => (
                                                <li key={j} className="flex gap-2">
                                                    <span style={{ color: accentColor }}>•</span>
                                                    <span>{line}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project?.length > 0 && (
                    <section style={{ marginBottom: (sectionSpacing || 24) - 16 }}>
                        <h2 className="font-black uppercase tracking-widest mb-5 text-center" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.65 : 20 }}>
                            Projects
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {data.project.map((p, i) => (
                                <div key={i} className={`${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}/5 rounded-xl p-4 border border-white/10`}>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-white text-[0.875em]">{p.name}</h3>
                                        {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[0.625em] hover:underline" style={{ color: accentColor }}>↗</a>}
                                    </div>
                                    {p.type && <p className={`text-[0.6875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{p.type}</p>}
                                    {p.description && <p className="text-[0.75em] text-gray-400 mt-1 line-clamp-2">{p.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Education side by side */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <div className={`${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}/5 rounded-xl p-5 border border-white/10`}>
                            <h2 className="font-black uppercase tracking-widest mb-3" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.55 : 14 }}>Skills</h2>
                            <div className="flex flex-wrap gap-1.5">
                                {data.skills.map((skill, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded-lg text-[0.6875em] font-medium text-white"
                                        style={{ backgroundColor: `${accentColor}30`, border: `1px solid ${accentColor}50` }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {data.education?.length > 0 && (
                        <div className={`${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}/5 rounded-xl p-5 border border-white/10`}>
                            <h2 className="font-black uppercase tracking-widest mb-3" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.55 : 14 }}>Education</h2>
                            <div className="space-y-3">
                                {data.education.map((edu, i) => (
                                    <div key={i}>
                                        <p className="font-semibold text-white text-[0.875em]">{edu.degree} {edu.field && `— ${edu.field}`}</p>
                                        <p className="text-[0.75em]" style={{ color: accentColor }}>{edu.institution}</p>
                                        <p className={`text-[0.6875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{formatDate(edu.graduation_date)}</p>
                                        {edu.gpa && <p className={`text-[0.6875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>GPA: {edu.gpa}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PitchDeckTemplate;

