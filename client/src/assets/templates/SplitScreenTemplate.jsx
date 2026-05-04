import { Linkedin, Github } from "../../components/icons/BrandIcons";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { cleanUsername } from "../../utils/formatters";

const SplitScreenTemplate = ({ isDarkMode, data, accentColor, accentBg, fontSize, headingSize, sectionSpacing }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Invalid Date") return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
        } catch (e) { return dateStr; }
    };

    return (
        <div className="w-full min-h-full flex" style={{ fontSize: fontSize || 15 }}>
            {/* Left Panel */}
            <aside className={`w-[36%] ${isDarkMode ? 'text-black' : 'text-gray-900'} p-7 flex flex-col gap-6 shrink-0`} style={{ background: accentBg || accentColor }}>
                {/* Photo */}
                {data.personal_info?.photo && (
                    <div className={`w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-black/20 shadow-lg ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}/10`}>
                        <img src={data.personal_info.photo} alt="Profile" className="w-full h-full object-cover"
                            style={{
                                transform: `scale(${data.personal_info.photo_settings?.scale || 1}) translate(${data.personal_info.photo_settings?.offsetX || 0}px, ${data.personal_info.photo_settings?.offsetY || 0}px)`,
                                filter: `grayscale(${data.personal_info.photo_settings?.grayscale || 0}%)`
                            }} />
                    </div>
                )}

                {/* Name */}
                <div className="text-center">
                    <h1 className="font-bold tracking-wide leading-tight" style={{ fontSize: headingSize || 22 }}>{data.personal_info?.full_name || "Your Name"}</h1>
                    {data.experience?.[0]?.position && (
                        <p className="text-[0.75em] mt-1 uppercase tracking-widest opacity-70">{data.experience[0].position}</p>
                    )}
                </div>

                {/* Summary */}
                {data.professional_summary && (
                    <p className="text-[0.75em] leading-relaxed opacity-80 text-center italic">
                        "{data.professional_summary}"
                    </p>
                )}

                {/* Contact */}
                <div>
                    <h2 className="font-bold uppercase tracking-widest border-b border-black/20 pb-1.5 mb-3" style={{ fontSize: headingSize ? headingSize * 0.45 : 10 }}>Contact</h2>
                    <ul className="space-y-2 text-[0.75em] opacity-90">
                        {data.personal_info?.email && (
                            <li className="flex items-center gap-2">
                                <Mail size={12} className="opacity-60 shrink-0" />
                                <a href={`mailto:${data.personal_info.email}`} className="hover:underline truncate">{data.personal_info.email}</a>
                            </li>
                        )}
                        {data.personal_info?.phone && (
                            <li className="flex items-center gap-2">
                                <Phone size={12} className="opacity-60 shrink-0" />
                                <a href={`tel:${data.personal_info.phone.replace(/\s+/g, '')}`} className="hover:underline">{data.personal_info.phone}</a>
                            </li>
                        )}
                        {data.personal_info?.location && (
                            <li className="flex items-center gap-2">
                                <MapPin size={12} className="opacity-60 shrink-0" />
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
                                <Linkedin size={12} className="opacity-60 shrink-0 mt-0.5" />
                                <a href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{cleanUsername(data.personal_info.linkedin, 'linkedin')}</a>
                            </li>
                        )}
                        {data.personal_info?.github && (
                            <li className="flex items-start gap-2">
                                <Github size={12} className="opacity-60 shrink-0 mt-0.5" />
                                <a href={data.personal_info.github.startsWith('http') ? data.personal_info.github : `https://${data.personal_info.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{cleanUsername(data.personal_info.github, 'github')}</a>
                            </li>
                        )}
                        {data.personal_info?.website && (
                            <li className="flex items-start gap-2">
                                <Globe size={12} className="opacity-60 shrink-0 mt-0.5" />
                                <a href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{data.personal_info.website.replace(/^https?:\/\/(www\.)?/, '')}</a>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Education */}
                {data.education?.length > 0 && (
                    <div>
                        <h2 className="font-bold uppercase tracking-widest border-b border-black/20 pb-1.5 mb-3" style={{ fontSize: headingSize ? headingSize * 0.45 : 10 }}>Education</h2>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <p className="font-semibold text-[0.75em]">{edu.degree}</p>
                                    <p className="text-[0.6875em] opacity-70">{edu.institution}</p>
                                    <p className="text-[0.625em] opacity-50">{formatDate(edu.graduation_date)}</p>
                                    {edu.gpa && <p className="text-[0.625em] opacity-50">GPA: {edu.gpa}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {data.skills?.length > 0 && (
                    <div>
                        <h2 className="font-bold uppercase tracking-widest border-b border-black/20 pb-1.5 mb-3" style={{ fontSize: headingSize ? headingSize * 0.45 : 10 }}>Skills</h2>
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills.map((skill, i) => (
                                <span key={i} className={`${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'}/15 border border-black/10 px-2 py-0.5 rounded text-[0.6875em]`}>{skill}</span>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Right Content */}
            <main className={`flex-1 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} ${isDarkMode ? 'text-gray-200' : 'text-gray-800'} p-8 flex flex-col gap-5`}>
                {/* Experience */}
                {data.experience?.length > 0 && (
                    <section style={{ marginBottom: sectionSpacing || 24 }}>
                        <h2 className="font-bold uppercase tracking-widest mb-5 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor, fontSize: headingSize ? headingSize * 0.6 : 18 }}>
                            Experience
                        </h2>
                        <div className="space-y-5">
                            {data.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{exp.position}</h3>
                                        <span className="text-[0.75em] text-gray-400 whitespace-nowrap ml-4">
                                            {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-[0.875em] font-semibold" style={{ color: accentColor }}>
                                        {exp.link
                                            ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{exp.company} ↗</a>
                                            : exp.company}
                                    </p>
                                    {exp.description && (
                                        <ul className={`mt-2 space-y-0.5 text-[0.875em] ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {exp.description.split("\n").filter(Boolean).map((line, j) => (
                                                <li key={j} className="flex gap-2">
                                                    <span style={{ color: accentColor }} className="shrink-0">•</span>
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
                    <section style={{ marginBottom: sectionSpacing || 24 }}>
                        <h2 className="font-bold uppercase tracking-widest mb-5 pb-2 border-b-2" style={{ color: accentColor, borderColor: accentColor, fontSize: headingSize ? headingSize * 0.6 : 18 }}>
                            Projects
                        </h2>
                        <div className="space-y-4">
                            {data.project.map((p, i) => (
                                <div key={i} className="pl-4 border-l-2" style={{ borderColor: `${accentColor}40` }}>
                                    <div className="flex items-center gap-2">
                                        <h3 className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{p.name}</h3>
                                        {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[0.75em] hover:underline" style={{ color: accentColor }}>↗ Link</a>}
                                    </div>
                                    {p.type && <p className="text-[0.6875em] text-gray-400">{p.type}</p>}
                                    {p.description && <p className={`text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>{p.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default SplitScreenTemplate;

