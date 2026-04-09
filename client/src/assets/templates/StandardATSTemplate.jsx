import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

const StandardATSTemplate = ({ data, accentColor, accentBg, fontSize, headingSize, sectionSpacing }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Invalid Date") return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
        } catch (e) { return dateStr; }
    };

    const SectionTitle = ({ children }) => (
        <h2
            className="font-bold uppercase tracking-[0.2em] pb-2 mb-4"
            style={{ color: accentColor, borderBottom: `2px solid ${accentColor}`, fontSize: headingSize ? headingSize * 0.5 : 12 }}
        >
            {children}
        </h2>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800 p-8" style={{ fontSize: fontSize || 15 }}>
            {/* Header */}
            <header className="text-center mb-6 pb-5" style={{ borderBottom: `3px solid ${accentColor}` }}>
                <h1 className="font-bold tracking-wide text-gray-900 mb-1" style={{ fontSize: headingSize || 24 }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-[0.75em] text-gray-600 mt-3">
                    {data.personal_info?.email && (
                        <span className="flex items-center gap-1"><Mail size={12} /> {data.personal_info.email}</span>
                    )}
                    {data.personal_info?.phone && (
                        <span className="flex items-center gap-1"><Phone size={12} /> {data.personal_info.phone}</span>
                    )}
                    {data.personal_info?.location && (
                        <span className="flex items-center gap-1"><MapPin size={12} /> {data.personal_info.location}</span>
                    )}
                    {data.personal_info?.linkedin && (
                        <span className="flex items-center gap-1"><Link size={12} /> <span className="break-all">{data.personal_info.linkedin}</span></span>
                    )}
                    {data.personal_info?.website && (
                        <span className="flex items-center gap-1"><Globe size={12} /> <span className="break-all">{data.personal_info.website}</span></span>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section style={{ marginBottom: sectionSpacing || 20 }}>
                    <SectionTitle>Professional Summary</SectionTitle>
                    <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && (
                <section style={{ marginBottom: sectionSpacing || 20 }}>
                    <SectionTitle>Professional Experience</SectionTitle>
                    <div className="space-y-4">
                        {data.experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                                    <span className="text-[0.75em] text-gray-500 whitespace-nowrap ml-4">
                                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="font-semibold text-[0.875em]" style={{ color: accentColor }}>
                                    {exp.link
                                        ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{exp.company} ↗</a>
                                        : exp.company}
                                </p>
                                {exp.description && (
                                    <ul className="mt-1.5 space-y-0.5 text-gray-700 text-[0.875em]">
                                        {exp.description.split("\n").filter(Boolean).map((line, j) => (
                                            <li key={j} className="flex gap-2">
                                                <span style={{ color: accentColor }} className="mt-0.5 shrink-0">•</span>
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
                <section style={{ marginBottom: sectionSpacing || 20 }}>
                    <SectionTitle>Projects</SectionTitle>
                    <div className="space-y-3">
                        {data.project.map((p, i) => (
                            <div key={i}>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-gray-900">{p.name}</h3>
                                    {p.link && (
                                        <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[0.75em] hover:underline" style={{ color: accentColor }}>↗ Link</a>
                                    )}
                                </div>
                                {p.type && <p className="text-[0.75em] text-gray-500">{p.type}</p>}
                                {p.description && <p className="text-[0.875em] text-gray-700 mt-0.5">{p.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education?.length > 0 && (
                <section style={{ marginBottom: sectionSpacing || 20 }}>
                    <SectionTitle>Education</SectionTitle>
                    <div className="space-y-3">
                        {data.education.map((edu, i) => (
                            <div key={i} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-bold text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                                    <p className="text-[0.875em] text-gray-700">{edu.institution}</p>
                                    {edu.gpa && <p className="text-[0.75em] text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-[0.75em] text-gray-500 whitespace-nowrap ml-4">{formatDate(edu.graduation_date)}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills?.length > 0 && (
                <section style={{ marginBottom: sectionSpacing || 20 }}>
                    <SectionTitle>Core Skills</SectionTitle>
                    <div className="flex flex-wrap gap-x-1 gap-y-0.5 text-[0.875em] text-gray-700">
                        {data.skills.map((skill, i) => (
                            <span key={i}>
                                {skill}{i < data.skills.length - 1 ? <span className="mx-1" style={{ color: accentColor }}>|</span> : ""}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default StandardATSTemplate;
