import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

const InfographicTemplate = ({ data, accentColor, accentBg, fontSize, headingSize, sectionSpacing }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Invalid Date") return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
        } catch (e) { return dateStr; }
    };

    // Generate a slightly varied percentage for visual interest
    const getSkillPercent = (index) => 75 + ((index * 7) % 25);

    return (
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-white text-gray-800 p-8" style={{ fontSize: fontSize || 14 }}>
            {/* Header */}
            <header className="text-center mb-6 pb-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h1 className="font-bold text-gray-900 mb-1" style={{ fontSize: headingSize || 24 }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                {data.experience?.[0]?.position && (
                    <p className="text-[0.875em] font-semibold mb-3" style={{ color: accentColor }}>{data.experience[0].position}</p>
                )}

                {/* Contact Pills */}
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {data.personal_info?.email && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.75em]" style={{ backgroundColor: `${accentColor}12`, color: accentColor }}>
                            <Mail size={11} />{data.personal_info.email}
                        </span>
                    )}
                    {data.personal_info?.phone && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.75em] bg-emerald-50 text-emerald-700">
                            <Phone size={11} />{data.personal_info.phone}
                        </span>
                    )}
                    {data.personal_info?.location && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.75em] bg-amber-50 text-amber-700">
                            <MapPin size={11} />{data.personal_info.location}
                        </span>
                    )}
                    {data.personal_info?.linkedin && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.75em] bg-blue-50 text-blue-700">
                            <Link size={11} />LinkedIn
                        </span>
                    )}
                    {data.personal_info?.website && (
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.75em] bg-purple-50 text-purple-700">
                            <Globe size={11} />Portfolio
                        </span>
                    )}
                </div>

                {data.professional_summary && (
                    <p className="text-[0.875em] text-gray-600 leading-relaxed mt-4 max-w-2xl mx-auto">{data.professional_summary}</p>
                )}
            </header>

            {/* Skills with Progress Bars */}
            {data.skills?.length > 0 && (
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4" style={{ marginBottom: sectionSpacing || 16 }}>
                    <h2 className="font-bold uppercase tracking-widest mb-4 text-center" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.55 : 14 }}>
                        Skill Proficiency
                    </h2>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                        {data.skills.map((skill, i) => {
                            const pct = getSkillPercent(i);
                            return (
                                <div key={i}>
                                    <div className="flex justify-between text-[0.75em] mb-0.5">
                                        <span className="text-gray-700 font-medium">{skill}</span>
                                        <span className="text-gray-400">{pct}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: accentColor, opacity: 0.8 }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4" style={{ marginBottom: sectionSpacing || 16 }}>
                    <h2 className="font-bold uppercase tracking-widest mb-4 text-center" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.55 : 14 }}>
                        Professional Experience
                    </h2>
                    <div className="space-y-4">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="border-l-4 pl-4 pb-3 last:pb-0" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                                    <span className="text-[0.6875em] text-gray-400 whitespace-nowrap ml-3">
                                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-[0.75em] font-semibold" style={{ color: accentColor }}>
                                    {exp.link
                                        ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{exp.company} ↗</a>
                                        : exp.company}
                                </p>
                                {exp.description && (
                                    <ul className="mt-1.5 space-y-0.5 text-[0.875em] text-gray-600">
                                        {exp.description.split("\n").filter(Boolean).map((line, j) => (
                                            <li key={j} className="flex gap-2">
                                                <span style={{ color: accentColor }}>▸</span>
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

            {/* Education & Projects Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Education */}
                {data.education?.length > 0 && (
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h2 className="font-bold uppercase tracking-widest mb-3" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.5 : 12 }}>
                            Education
                        </h2>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <p className="font-semibold text-[0.875em] text-gray-900">{edu.degree}</p>
                                    <p className="text-[0.75em]" style={{ color: accentColor }}>{edu.institution}</p>
                                    <p className="text-[0.6875em] text-gray-400">{formatDate(edu.graduation_date)}</p>
                                    {edu.gpa && <p className="text-[0.6875em] text-gray-400">GPA: {edu.gpa}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.project?.length > 0 && (
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h2 className="font-bold uppercase tracking-widest mb-3" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.5 : 12 }}>
                            Projects
                        </h2>
                        <div className="space-y-3">
                            {data.project.map((p, i) => (
                                <div key={i}>
                                    <div className="flex items-center gap-1.5">
                                        <p className="font-semibold text-[0.875em] text-gray-900">{p.name}</p>
                                        {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[0.625em] hover:underline" style={{ color: accentColor }}>↗</a>}
                                    </div>
                                    {p.type && <p className="text-[0.6875em] text-gray-400">{p.type}</p>}
                                    {p.description && <p className="text-[0.75em] text-gray-600 mt-0.5 line-clamp-2">{p.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default InfographicTemplate;
