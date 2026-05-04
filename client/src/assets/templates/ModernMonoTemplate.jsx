import { Linkedin, Github } from "../../components/icons/BrandIcons";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { cleanUsername } from "../../utils/formatters";

const ModernMonoTemplate = ({ isDarkMode, data, accentColor, accentBg, fontSize, headingSize, sectionSpacing }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Invalid Date") return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
        } catch (e) { return dateStr; }
    };

    return (
        <div className={`max-w-4xl mx-auto ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} p-10`} style={{ fontSize: fontSize || 15 }}>
            {/* Header */}
            <header className={`text-center pb-8 mb-8 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <h1 className={`font-extralight tracking-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-2`} style={{ fontSize: headingSize || 28 }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <div className={`flex justify-center flex-wrap gap-5 text-[0.75em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-4`}>
                    {data.personal_info?.email && (
                        <a href={`mailto:${data.personal_info.email}`} className="flex items-center gap-1.5 hover:underline"><Mail size={12} style={{ color: accentColor }} />{data.personal_info.email}</a>
                    )}
                    {data.personal_info?.phone && (
                        <a href={`tel:${data.personal_info.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 hover:underline"><Phone size={12} style={{ color: accentColor }} />{data.personal_info.phone}</a>
                    )}
                    {data.personal_info?.location && (
                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.personal_info.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 hover:underline"
                        >
                            <MapPin size={12} style={{ color: accentColor }} />
                            <span>{data.personal_info.location}</span>
                        </a>
                    )}
                    {data.personal_info?.linkedin && (
                        <a href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                            <Linkedin size={12} style={{ color: accentColor }} />
                            <span>{cleanUsername(data.personal_info.linkedin, 'linkedin')}</span>
                        </a>
                    )}
                    {data.personal_info?.github && (
                        <a href={data.personal_info.github.startsWith('http') ? data.personal_info.github : `https://${data.personal_info.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                            <Github size={12} style={{ color: accentColor }} />
                            <span>{cleanUsername(data.personal_info.github, 'github')}</span>
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                            <Globe size={12} style={{ color: accentColor }} />
                            <span>{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </a>
                    )}
                </div>
            </header>

            {/* Summary */}
            {data.professional_summary && (
                <section style={{ marginBottom: sectionSpacing || 32 }}>
                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed font-light text-center max-w-2xl mx-auto italic`}>
                        "{data.professional_summary}"
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section style={{ marginBottom: sectionSpacing || 32 }}>
                    <h2 className="font-light tracking-widest uppercase mb-6" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.6 : 18 }}>
                        Experience
                    </h2>
                    <div className="space-y-6">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className={`text-base font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{exp.position}</h3>
                                    <span className="text-[0.75em] text-gray-400 font-light whitespace-nowrap ml-4">
                                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-[0.875em] font-light" style={{ color: accentColor }}>
                                    {exp.link
                                        ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{exp.company} ↗</a>
                                        : exp.company}
                                </p>
                                {exp.description && (
                                    <div className={`mt-2 text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed font-light whitespace-pre-line`}>
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project?.length > 0 && (
                <section style={{ marginBottom: sectionSpacing || 32 }}>
                    <h2 className="font-light tracking-widest uppercase mb-6" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.6 : 18 }}>
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {data.project.map((p, i) => (
                            <div key={i}>
                                <div className="flex items-center gap-2">
                                    <h3 className={`text-base font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{p.name}</h3>
                                    {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[0.75em] hover:underline" style={{ color: accentColor }}>↗</a>}
                                </div>
                                {p.type && <p className="text-[0.75em] text-gray-400 font-light">{p.type}</p>}
                                {p.description && <p className={`text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-light mt-1`}>{p.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education & Skills side by side */}
            <div className={`grid grid-cols-2 gap-10 pt-6 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                {/* Education */}
                {data.education?.length > 0 && (
                    <section>
                        <h2 className="font-light tracking-widest uppercase mb-5" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.6 : 18 }}>
                            Education
                        </h2>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className={`font-medium ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                                    <p className={`text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-light`}>{edu.institution}</p>
                                    <p className="text-[0.75em] text-gray-400">{formatDate(edu.graduation_date)}</p>
                                    {edu.gpa && <p className="text-[0.75em] text-gray-400">GPA: {edu.gpa}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills?.length > 0 && (
                    <section>
                        <h2 className="font-light tracking-widest uppercase mb-5" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.6 : 18 }}>
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className={`text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-light`}>
                                    {skill}{i < data.skills.length - 1 ? "," : ""}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ModernMonoTemplate;

