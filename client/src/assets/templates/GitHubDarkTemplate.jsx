import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

const GitHubDarkTemplate = ({ data, accentColor, accentBg, fontSize, headingSize, sectionSpacing }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Invalid Date") return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
        } catch (e) { return dateStr; }
    };

    const accent = accentColor || "#58a6ff";

    return (
        <div className="w-full min-h-full flex" style={{ fontSize: fontSize || 14, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
            {/* Sidebar */}
            <aside className="w-[32%] bg-[#0d1117] text-gray-300 p-6 flex flex-col gap-6 shrink-0 border-r border-[#30363d]">
                {/* Avatar placeholder + name */}
                <div className="text-center pb-4 border-b border-[#30363d]">
                    {data.personal_info?.photo && (
                        <img src={data.personal_info.photo} alt="" className="w-24 h-24 rounded-full mx-auto mb-3 border-2" style={{ borderColor: accent }} />
                    )}
                    <h1 className="font-bold text-white" style={{ fontSize: headingSize || 20 }}>{data.personal_info?.full_name || "Your Name"}</h1>
                    {data.experience?.[0]?.position && (
                        <p className="text-[0.75em] mt-1 font-mono" style={{ color: accent }}>{data.experience[0].position}</p>
                    )}
                </div>

                {/* Contact */}
                <div>
                    <h2 className="text-[0.625em] font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>Contact</h2>
                    <ul className="space-y-2 text-[0.75em]">
                        {data.personal_info?.email && (
                            <li className="flex items-center gap-2"><Mail size={12} style={{ color: accent }} />{data.personal_info.email}</li>
                        )}
                        {data.personal_info?.phone && (
                            <li className="flex items-center gap-2"><Phone size={12} style={{ color: accent }} />{data.personal_info.phone}</li>
                        )}
                        {data.personal_info?.location && (
                            <li className="flex items-center gap-2"><MapPin size={12} style={{ color: accent }} />{data.personal_info.location}</li>
                        )}
                        {data.personal_info?.linkedin && (
                            <li className="flex items-start gap-2"><Link size={12} style={{ color: accent }} className="mt-0.5 shrink-0" /><span className="break-all">{data.personal_info.linkedin}</span></li>
                        )}
                        {data.personal_info?.website && (
                            <li className="flex items-start gap-2"><Globe size={12} style={{ color: accent }} className="mt-0.5 shrink-0" /><span className="break-all">{data.personal_info.website}</span></li>
                        )}
                    </ul>
                </div>

                {/* Education */}
                {data.education?.length > 0 && (
                    <div>
                        <h2 className="font-bold uppercase tracking-widest mb-3" style={{ color: accent, fontSize: headingSize ? headingSize * 0.45 : 10 }}>Education</h2>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <p className="font-semibold text-white text-[0.75em]">{edu.degree}</p>
                                    <p className="text-[0.75em] text-gray-400">{edu.institution}</p>
                                    <p className="text-[0.625em] text-gray-500">{formatDate(edu.graduation_date)}</p>
                                    {edu.gpa && <p className="text-[0.625em] text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {data.skills?.length > 0 && (
                    <div>
                        <h2 className="font-bold uppercase tracking-widest mb-3" style={{ color: accent, fontSize: headingSize ? headingSize * 0.45 : 10 }}>Tech Stack</h2>
                        <div className="flex flex-wrap gap-1.5">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-2 py-0.5 text-[0.6875em] rounded border text-gray-300" style={{ borderColor: `${accent}40`, backgroundColor: `${accent}10` }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-[#161b22] text-gray-300 p-6 flex flex-col gap-5">
                {/* Summary */}
                {data.professional_summary && (
                    <section className="bg-[#0d1117] rounded-lg p-4 border border-[#30363d]" style={{ marginBottom: (sectionSpacing || 16) - 16 }}>
                        <p className="text-[0.875em] leading-relaxed text-gray-400">{data.professional_summary}</p>
                    </section>
                )}

                {/* Experience */}
                {data.experience?.length > 0 && (
                    <section style={{ marginBottom: (sectionSpacing || 16) - 16 }}>
                        <h2 className="font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: accent, borderColor: accent, fontSize: headingSize ? headingSize * 0.6 : 14 }}>
                            Experience
                        </h2>
                        <div className="space-y-4">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="pl-4 border-l-2" style={{ borderColor: `${accent}50` }}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-semibold text-white">{exp.position}</h3>
                                        <span className="text-[0.6875em] text-gray-500 whitespace-nowrap ml-3 font-mono">
                                            {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-[0.75em] font-medium" style={{ color: accent }}>
                                        {exp.link
                                            ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{exp.company} ↗</a>
                                            : exp.company}
                                    </p>
                                    {exp.description && (
                                        <div className="mt-2 space-y-0.5 text-[0.875em] text-gray-400">
                                            {exp.description.split("\n").filter(Boolean).map((line, j) => (
                                                <div key={j} className="flex gap-2">
                                                    <span style={{ color: accent }}>▹</span>
                                                    <span>{line}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project?.length > 0 && (
                    <section style={{ marginBottom: (sectionSpacing || 16) - 16 }}>
                        <h2 className="font-bold uppercase tracking-widest mb-4 pb-2 border-b" style={{ color: accent, borderColor: accent, fontSize: headingSize ? headingSize * 0.6 : 14 }}>
                            Projects
                        </h2>
                        <div className="space-y-3">
                            {data.project.map((p, i) => (
                                <div key={i} className="bg-[#0d1117] rounded-lg p-3 border border-[#30363d]">
                                    <div className="flex items-center gap-2">
                                        <span style={{ color: accent }}>📁</span>
                                        <h3 className="font-semibold text-white text-[0.875em]">{p.name}</h3>
                                        {p.link && (
                                            <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[0.625em] hover:underline ml-auto" style={{ color: accent }}>↗ Link</a>
                                        )}
                                    </div>
                                    {p.type && <p className="text-[0.625em] text-gray-500 mt-0.5 ml-6">{p.type}</p>}
                                    {p.description && <p className="text-[0.75em] text-gray-400 mt-1 ml-6">{p.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default GitHubDarkTemplate;
