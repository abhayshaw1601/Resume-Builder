import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

const PitchDeckTemplate = ({ data, accentColor, accentBg, fontSize, sectionSpacing }) => {
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
                    <h1 className="text-4xl font-black tracking-tight mb-2">
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    {data.experience?.[0]?.position && (
                        <p className="text-lg font-light mb-4" style={{ color: accentColor }}>{data.experience[0].position}</p>
                    )}

                    {/* Contact Row */}
                    <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400 mt-4">
                        {data.personal_info?.email && (
                            <span className="flex items-center gap-1.5"><Mail size={11} style={{ color: accentColor }} />{data.personal_info.email}</span>
                        )}
                        {data.personal_info?.phone && (
                            <span className="flex items-center gap-1.5"><Phone size={11} style={{ color: accentColor }} />{data.personal_info.phone}</span>
                        )}
                        {data.personal_info?.location && (
                            <span className="flex items-center gap-1.5"><MapPin size={11} style={{ color: accentColor }} />{data.personal_info.location}</span>
                        )}
                        {data.personal_info?.linkedin && (
                            <span className="flex items-center gap-1.5"><Link size={11} style={{ color: accentColor }} /><span className="break-all">{data.personal_info.linkedin}</span></span>
                        )}
                        {data.personal_info?.website && (
                            <span className="flex items-center gap-1.5"><Globe size={11} style={{ color: accentColor }} /><span className="break-all">{data.personal_info.website}</span></span>
                        )}
                    </div>
                </div>
            </header>

            <div className="px-8 pb-8 space-y-6">
                {/* Summary */}
                {data.professional_summary && (
                    <section className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10" style={{ marginBottom: (sectionSpacing || 24) - 16 }}>
                        <p className="text-sm text-gray-300 leading-relaxed text-center italic max-w-2xl mx-auto">
                            "{data.professional_summary}"
                        </p>
                    </section>
                )}

                {/* Experience */}
                {data.experience?.length > 0 && (
                    <section style={{ marginBottom: (sectionSpacing || 24) - 16 }}>
                        <h2 className="text-xl font-black uppercase tracking-widest mb-5 text-center" style={{ color: accentColor }}>
                            Experience
                        </h2>
                        <div className="space-y-3">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="bg-white/5 rounded-xl p-5 border border-white/10">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-lg font-bold text-white">{exp.position}</h3>
                                        <span className="text-[11px] text-gray-500 whitespace-nowrap ml-4 font-mono">
                                            {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium" style={{ color: accentColor }}>
                                        {exp.link
                                            ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{exp.company} ↗</a>
                                            : exp.company}
                                    </p>
                                    {exp.description && (
                                        <ul className="mt-2 space-y-0.5 text-sm text-gray-400">
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
                        <h2 className="text-xl font-black uppercase tracking-widest mb-5 text-center" style={{ color: accentColor }}>
                            Projects
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {data.project.map((p, i) => (
                                <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-white text-sm">{p.name}</h3>
                                        {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[10px] hover:underline" style={{ color: accentColor }}>↗</a>}
                                    </div>
                                    {p.type && <p className="text-[11px] text-gray-500">{p.type}</p>}
                                    {p.description && <p className="text-xs text-gray-400 mt-1 line-clamp-2">{p.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills & Education side by side */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Skills */}
                    {data.skills?.length > 0 && (
                        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                            <h2 className="text-sm font-black uppercase tracking-widest mb-3" style={{ color: accentColor }}>Skills</h2>
                            <div className="flex flex-wrap gap-1.5">
                                {data.skills.map((skill, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-white"
                                        style={{ backgroundColor: `${accentColor}30`, border: `1px solid ${accentColor}50` }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {data.education?.length > 0 && (
                        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                            <h2 className="text-sm font-black uppercase tracking-widest mb-3" style={{ color: accentColor }}>Education</h2>
                            <div className="space-y-3">
                                {data.education.map((edu, i) => (
                                    <div key={i}>
                                        <p className="font-semibold text-white text-sm">{edu.degree} {edu.field && `— ${edu.field}`}</p>
                                        <p className="text-xs" style={{ color: accentColor }}>{edu.institution}</p>
                                        <p className="text-[11px] text-gray-500">{formatDate(edu.graduation_date)}</p>
                                        {edu.gpa && <p className="text-[11px] text-gray-500">GPA: {edu.gpa}</p>}
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
