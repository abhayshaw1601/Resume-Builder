import { Linkedin, Github } from "../../components/icons/BrandIcons";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { cleanUsername } from "../../utils/formatters";

const ClassicTemplate = ({ isDarkMode, data, accentColor, accentBg, fontSize, headingSize, sectionSpacing }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Invalid Date") return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short"
            });
        } catch (e) {
            return dateStr;
        }
    };

    return (
        <div className={`max-w-4xl mx-auto p-8 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} leading-relaxed`} style={{ fontSize: fontSize || 16 }}>
            {/* Header */}
            <header className="text-center mb-8 pb-6 border-b-4" style={{ borderColor: accentColor }}>
                <h1 className="font-bold mb-2" style={{ color: accentColor, fontSize: headingSize || 24 }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className={`flex flex-wrap justify-center gap-4 text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {data.personal_info?.email && (
                        <a href={`mailto:${data.personal_info.email}`} className="flex items-center gap-1 hover:underline">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </a>
                    )}
                    {data.personal_info?.phone && (
                        <a href={`tel:${data.personal_info.phone.replace(/\s+/g, '')}`} className="flex items-center gap-1 hover:underline">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </a>
                    )}
                    {data.personal_info?.location && (
                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.personal_info.location)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:underline"
                        >
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </a>
                    )}
                    {data.personal_info?.linkedin && (
                        <a href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                            <Linkedin className="size-4" />
                            <span className="break-all">{cleanUsername(data.personal_info.linkedin, 'linkedin')}</span>
                        </a>
                    )}
                    {data.personal_info?.github && (
                        <a href={data.personal_info.github.startsWith('http') ? data.personal_info.github : `https://${data.personal_info.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                            <Github className="size-4" />
                            <span className="break-all">{cleanUsername(data.personal_info.github, 'github')}</span>
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                            <Globe className="size-4" />
                            <span className="break-all">{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                        </a>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-6" style={{ marginBottom: sectionSpacing || 24 }}>
                    <h2 className="font-semibold mb-3" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.65 : 16 }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6" style={{ marginBottom: sectionSpacing || 24 }}>
                    <h2 className="font-semibold mb-4" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.65 : 16 }}>
                        PROFESSIONAL EXPERIENCE
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{exp.position}</h3>
                                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium`}>{
                                            exp.link
                                                ? <a href={exp.link} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} className="hover:underline">{exp.company} ↗</a>
                                                : exp.company
                                        }</p>
                                    </div>
                                    <div className={`text-right text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <p>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed whitespace-pre-line`}>
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-6" style={{ marginBottom: sectionSpacing || 24 }}>
                    <h2 className="font-semibold mb-4" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.65 : 16 }}>
                        PROJECTS
                    </h2>

                    <ul className="space-y-3 ">
                        {data.project.map((proj, index) => (
                            <div key={index} className={`flex justify-between items-start border-l-3 ${isDarkMode ? 'border-white/20' : 'border-gray-300'} pl-6`}>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <li className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} `}>{proj.name}</li>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} className="text-[0.75em] hover:underline" title={proj.link}>↗ Link</a>
                                        )}
                                    </div>
                                    {proj.type && <p className={`text-[0.75em] ${isDarkMode ? 'text-gray-800' : 'text-gray-50'}0 mb-1`}>{proj.type}</p>}
                                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{proj.description}</p>
                                </div>
                            </div>
                        ))}
                    </ul>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-6" style={{ marginBottom: sectionSpacing || 24 }}>
                    <h2 className="font-semibold mb-4" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.65 : 16 }}>
                        EDUCATION
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{edu.institution}</p>
                                    {edu.gpa && <p className={`text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>GPA: {edu.gpa}</p>}
                                </div>
                                <div className={`text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <p>{formatDate(edu.graduation_date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-6" style={{ marginBottom: sectionSpacing || 24 }}>
                    <h2 className="font-semibold mb-4" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.65 : 16 }}>
                        CORE SKILLS
                    </h2>

                    <div className="flex gap-4 flex-wrap">
                        {data.skills.map((skill, index) => (
                            <div key={index} className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                • {skill}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default ClassicTemplate;

