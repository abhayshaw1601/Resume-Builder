import { Linkedin, Github } from "../../components/icons/BrandIcons";
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap } from "lucide-react";
import { cleanUsername } from "../../utils/formatters";

const TimelineTemplate = ({ isDarkMode, data, accentColor, accentBg, fontSize, headingSize, sectionSpacing }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Invalid Date") return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
        } catch (e) { return dateStr; }
    };

    return (
        <div className={`max-w-4xl mx-auto ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} p-8`} style={{ fontSize: fontSize || 15 }}>
            {/* Header */}
            <header className={`text-center mb-8 pb-6 border-b-2 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                <h1 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-1`} style={{ fontSize: headingSize || 24 }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <div className={`flex flex-wrap justify-center gap-4 text-[0.75em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-3`}>
                    {data.personal_info?.email && (
                        <a href={`mailto:${data.personal_info.email}`} className="flex items-center gap-1 hover:underline"><Mail size={12} style={{ color: accentColor }} />{data.personal_info.email}</a>
                    )}
                    {data.personal_info?.phone && (
                        <a href={`tel:${data.personal_info.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1 hover:underline"><Phone size={12} style={{ color: accentColor }} />{data.personal_info.phone}</a>
                    )}
                    {data.personal_info?.location && (
                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.personal_info.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                        >
                            <MapPin size={12} style={{ color: accentColor }} />
                            {data.personal_info.location}
                        </a>
                    )}
                    {data.personal_info?.linkedin && (
                        <a href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                            <Linkedin size={12} style={{ color: accentColor }} />
                            {cleanUsername(data.personal_info.linkedin, 'linkedin')}
                        </a>
                    )}
                    {data.personal_info?.github && (
                        <a href={data.personal_info.github.startsWith('http') ? data.personal_info.github : `https://${data.personal_info.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                            <Github size={12} style={{ color: accentColor }} />
                            {cleanUsername(data.personal_info.github, 'github')}
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                            <Globe size={12} style={{ color: accentColor }} />
                            {data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}
                        </a>
                    )}
                </div>
                {data.professional_summary && (
                    <p className={`text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed mt-4 max-w-2xl mx-auto`}>{data.professional_summary}</p>
                )}
            </header>

            {/* Experience Timeline */}
            {data.experience?.length > 0 && (
                <section style={{ marginBottom: sectionSpacing || 28 }}>
                    <h2 className="font-bold uppercase tracking-[0.2em] mb-6" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.55 : 14 }}>
                        Professional Journey
                    </h2>
                    <div className="relative pl-8">
                        {/* Timeline line */}
                        <div className="absolute left-[11px] top-2 bottom-2 w-0.5" style={{ backgroundColor: `${accentColor}30` }}></div>
                        
                        <div className="space-y-5">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="relative">
                                    {/* Node */}
                                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md z-10"
                                        style={{ backgroundColor: accentColor }}>
                                        <Briefcase size={12} className="text-white" />
                                    </div>
                                    
                                    <div className={`${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-50'} rounded-xl p-4 border ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                                        <div className="flex justify-between items-baseline">
                                            <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{exp.position}</h3>
                                            <span className={`text-[0.6875em] px-2 py-0.5 rounded-full ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} border ${isDarkMode ? 'border-white/10' : 'border-gray-200'} whitespace-nowrap ml-3`}>
                                                {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-[0.875em] font-medium mt-0.5" style={{ color: accentColor }}>
                                            {exp.link
                                                ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{exp.company} ↗</a>
                                                : exp.company}
                                        </p>
                                        {exp.description && (
                                            <div className={`mt-2 text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed whitespace-pre-line`}>{exp.description}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project?.length > 0 && (
                <section style={{ marginBottom: sectionSpacing || 28 }}>
                    <h2 className="font-bold uppercase tracking-[0.2em] mb-5" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.55 : 14 }}>
                        Projects
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {data.project.map((p, i) => (
                            <div key={i} className={`${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-50'} rounded-xl p-4 border ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                                <div className="flex items-center gap-2">
                                    <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-[0.875em]`}>{p.name}</h3>
                                    {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[0.625em] hover:underline" style={{ color: accentColor }}>↗</a>}
                                </div>
                                {p.type && <p className="text-[0.6875em] text-gray-400">{p.type}</p>}
                                {p.description && <p className={`text-[0.75em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1 line-clamp-2`}>{p.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education Timeline */}
            {data.education?.length > 0 && (
                <section style={{ marginBottom: sectionSpacing || 28 }}>
                    <h2 className="font-bold uppercase tracking-[0.2em] mb-6" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.55 : 14 }}>
                        Education
                    </h2>
                    <div className="relative pl-8">
                        <div className="absolute left-[11px] top-2 bottom-2 w-0.5" style={{ backgroundColor: `${accentColor}30` }}></div>
                        <div className="space-y-4">
                            {data.education.map((edu, i) => (
                                <div key={i} className="relative">
                                    <div className="absolute -left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center shadow-md z-10"
                                        style={{ backgroundColor: accentColor }}>
                                        <GraduationCap size={12} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                                        <p className="text-[0.875em]" style={{ color: accentColor }}>{edu.institution}</p>
                                        <p className="text-[0.75em] text-gray-400">{formatDate(edu.graduation_date)}</p>
                                        {edu.gpa && <p className="text-[0.75em] text-gray-400">GPA: {edu.gpa}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills?.length > 0 && (
                <section>
                    <h2 className="font-bold uppercase tracking-[0.2em] mb-4" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.55 : 14 }}>
                        Skills & Expertise
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, i) => (
                            <span key={i} className="px-3 py-1 rounded-full text-[0.75em] font-medium border"
                                style={{ borderColor: `${accentColor}30`, color: accentColor, backgroundColor: `${accentColor}08` }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default TimelineTemplate;

