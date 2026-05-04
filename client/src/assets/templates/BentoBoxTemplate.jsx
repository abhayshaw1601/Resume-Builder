import { Linkedin, Github } from "../../components/icons/BrandIcons";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { cleanUsername, getContrastText } from "../../utils/formatters";

const BentoBoxTemplate = ({ isDarkMode, data, accentColor, accentBg, fontSize, headingSize, sectionSpacing }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Invalid Date") return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
        } catch (e) { return dateStr; }
    };

    const Card = ({ children, className = "", span = 1 }) => (
        <div
            className={`bg-white rounded-xl border border-gray-100 p-5 shadow-sm ${className}`}
            style={{ gridColumn: span > 1 ? `span ${span}` : undefined }}
        >
            {children}
        </div>
    );

    return (
        <div className={`w-full ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-50'} p-6`} style={{ fontSize: fontSize || 14 }}>
            <div className="grid grid-cols-3 gap-3 auto-rows-auto">
                {/* Header Card - Span 2 */}
                <Card span={2}>
                    <h1 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} mb-1`} style={{ fontSize: headingSize || 24 }}>
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    {data.experience?.[0]?.position && (
                        <p className="text-[0.875em] font-medium mb-3" style={{ color: accentColor }}>
                            {data.experience[0].position}
                        </p>
                    )}
                    {data.professional_summary && (
                        <p className={`text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>{data.professional_summary}</p>
                    )}
                </Card>

                {/* Contact Card */}
                <Card className={getContrastText(accentBg || accentColor)} span={1}>
                    <div className="h-full rounded-lg p-1" style={{ background: accentBg || accentColor }}>
                        <div className="p-3">
                            <h2 className="font-bold uppercase tracking-widest mb-3 opacity-80" style={{ fontSize: headingSize ? headingSize * 0.5 : 12 }}>Contact</h2>
                            <ul className="space-y-2 text-[0.75em]">
                                {data.personal_info?.email && (
                                    <li className="flex items-center gap-2">
                                        <Mail size={11} className="opacity-70" />
                                        <a href={`mailto:${data.personal_info.email}`} className="hover:underline truncate">{data.personal_info.email}</a>
                                    </li>
                                )}
                                {data.personal_info?.phone && (
                                    <li className="flex items-center gap-2">
                                        <Phone size={11} className="opacity-70" />
                                        <a href={`tel:${data.personal_info.phone.replace(/\s+/g, '')}`} className="hover:underline">{data.personal_info.phone}</a>
                                    </li>
                                )}
                                {data.personal_info?.location && (
                                    <li className="flex items-center gap-2">
                                        <MapPin size={11} className="opacity-70" />
                                        <a 
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.personal_info.location)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline truncate"
                                        >
                                            {data.personal_info.location}
                                        </a>
                                    </li>
                                )}
                                {data.personal_info?.linkedin && (
                                    <li className="flex items-start gap-2">
                                        <Linkedin size={11} className="opacity-70 mt-0.5 shrink-0" />
                                        <a href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{cleanUsername(data.personal_info.linkedin, 'linkedin')}</a>
                                    </li>
                                )}
                                {data.personal_info?.github && (
                                    <li className="flex items-start gap-2">
                                        <Github size={11} className="opacity-70 mt-0.5 shrink-0" />
                                        <a href={data.personal_info.github.startsWith('http') ? data.personal_info.github : `https://${data.personal_info.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{cleanUsername(data.personal_info.github, 'github')}</a>
                                    </li>
                                )}
                                {data.personal_info?.website && (
                                    <li className="flex items-start gap-2">
                                        <Globe size={11} className="opacity-70 mt-0.5 shrink-0" />
                                        <a href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </Card>

                {/* Skills Card - Span 2 */}
                {data.skills?.length > 0 && (
                    <Card span={2}>
                        <h2 className="font-bold uppercase tracking-widest mb-3" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.5 : 12 }}>Skills</h2>
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-lg text-[0.75em] font-medium"
                                    style={{ backgroundColor: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}25` }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Education Card */}
                {data.education?.length > 0 && (
                    <Card span={1}>
                        <h2 className="font-bold uppercase tracking-widest mb-3" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.5 : 12 }}>Education</h2>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <p className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-[0.875em]`}>{edu.degree}</p>
                                    <p className="text-[0.75em]" style={{ color: accentColor }}>{edu.institution}</p>
                                    <p className="text-[0.6875em] text-gray-400">{formatDate(edu.graduation_date)}</p>
                                    {edu.gpa && <p className="text-[0.6875em] text-gray-400">GPA: {edu.gpa}</p>}
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Experience Card - Span 3 (full width) */}
                {data.experience?.length > 0 && (
                    <Card span={3}>
                        <h2 className="font-bold uppercase tracking-widest mb-4" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.5 : 12 }}>Experience</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="border-l-3 pl-3" style={{ borderColor: accentColor }}>
                                    <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-[0.875em]`}>{exp.position}</h3>
                                    <p className="text-[0.75em] font-medium" style={{ color: accentColor }}>
                                        {exp.link
                                            ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{exp.company} ↗</a>
                                            : exp.company}
                                    </p>
                                    <p className="text-[0.6875em] text-gray-400 mb-1">
                                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </p>
                                    {exp.description && (
                                        <p className={`text-[0.75em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-3 whitespace-pre-line`}>{exp.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {/* Projects Card - Span 3 (full width) */}
                {data.project?.length > 0 && (
                    <Card span={3}>
                        <h2 className="font-bold uppercase tracking-widest mb-4" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.5 : 12 }}>Projects</h2>
                        <div className="grid grid-cols-3 gap-3">
                            {data.project.map((p, i) => (
                                <div key={i} className={`${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-gray-50'} rounded-lg p-3 border ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                                    <div className="flex items-center gap-1.5">
                                        <h3 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} text-[0.875em]`}>{p.name}</h3>
                                        {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[0.625em] hover:underline" style={{ color: accentColor }}>↗</a>}
                                    </div>
                                    {p.type && <p className="text-[0.625em] text-gray-400 mb-1">{p.type}</p>}
                                    {p.description && <p className={`text-[0.75em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>{p.description}</p>}
                                </div>
                            ))}
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default BentoBoxTemplate;

