import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

const AcademicCVTemplate = ({ data, accentColor, accentBg, fontSize, headingSize, sectionSpacing }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Invalid Date") return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
        } catch (e) { return dateStr; }
    };

    const SectionTitle = ({ children }) => (
        <h2 className="font-bold text-gray-900 pb-1.5 mb-4 border-b-2" style={{ borderColor: accentColor, fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: headingSize ? headingSize * 0.6 : 14 }}>
            {children}
        </h2>
    );

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800 p-10" style={{ fontSize: fontSize || 15, fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            {/* Header */}
            <header className="text-center pb-5 mb-6 border-b-2 border-gray-800">
                <h1 className="font-bold text-gray-900 tracking-wide" style={{ fontSize: headingSize || 24, fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-[0.75em] text-gray-600 mt-3" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {data.personal_info?.email && (
                        <span className="flex items-center gap-1"><Mail size={11} />{data.personal_info.email}</span>
                    )}
                    {data.personal_info?.phone && (
                        <span>•</span>
                    )}
                    {data.personal_info?.phone && (
                        <span className="flex items-center gap-1"><Phone size={11} />{data.personal_info.phone}</span>
                    )}
                    {data.personal_info?.location && (
                        <span>•</span>
                    )}
                    {data.personal_info?.location && (
                        <span className="flex items-center gap-1"><MapPin size={11} />{data.personal_info.location}</span>
                    )}
                    {data.personal_info?.linkedin && (
                        <span className="flex items-center gap-1"><Link size={11} /><span className="break-all">{data.personal_info.linkedin}</span></span>
                    )}
                    {data.personal_info?.website && (
                        <span className="flex items-center gap-1"><Globe size={11} /><span className="break-all">{data.personal_info.website}</span></span>
                    )}
                </div>
            </header>

            {/* Research Interests / Summary */}
            {data.professional_summary && (
                <section style={{ marginBottom: sectionSpacing || 24 }}>
                    <SectionTitle>Research Interests</SectionTitle>
                    <p className="text-gray-700 leading-relaxed text-[0.875em]">{data.professional_summary}</p>
                </section>
            )}

            {/* Education */}
            {data.education?.length > 0 && (
                <section style={{ marginBottom: sectionSpacing || 24 }}>
                    <SectionTitle>Education</SectionTitle>
                    <div className="space-y-4">
                        {data.education.map((edu, i) => (
                            <div key={i} className="pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{edu.degree} {edu.field && `— ${edu.field}`}</h3>
                                    <span className="text-[0.75em] text-gray-500 whitespace-nowrap ml-4">{formatDate(edu.graduation_date)}</span>
                                </div>
                                <p className="text-[0.875em] italic" style={{ color: accentColor }}>{edu.institution}</p>
                                {edu.gpa && <p className="text-[0.75em] text-gray-500">GPA: {edu.gpa}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Professional Experience */}
            {data.experience?.length > 0 && (
                <section style={{ marginBottom: sectionSpacing || 24 }}>
                    <SectionTitle>Academic & Professional Experience</SectionTitle>
                    <div className="space-y-4">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                                    <span className="text-[0.75em] text-gray-500 whitespace-nowrap ml-4">
                                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className="text-[0.875em] italic" style={{ color: accentColor }}>
                                    {exp.link
                                        ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{exp.company} ↗</a>
                                        : exp.company}
                                </p>
                                {exp.description && (
                                    <ul className="mt-1.5 space-y-0.5 text-[0.875em] text-gray-700 list-disc list-inside" style={{ fontFamily: "system-ui, sans-serif" }}>
                                        {exp.description.split("\n").filter(Boolean).map((line, j) => (
                                            <li key={j}>{line}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Research Projects */}
            {data.project?.length > 0 && (
                <section style={{ marginBottom: sectionSpacing || 24 }}>
                    <SectionTitle>Research Projects</SectionTitle>
                    <div className="space-y-4">
                        {data.project.map((p, i) => (
                            <div key={i} className="pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-gray-900">{p.name}</h3>
                                    {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[0.75em] hover:underline" style={{ color: accentColor }}>↗</a>}
                                </div>
                                {p.type && <p className="text-[0.75em] italic text-gray-500">{p.type}</p>}
                                {p.description && <p className="text-[0.875em] text-gray-700 mt-1" style={{ fontFamily: "system-ui, sans-serif" }}>{p.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills & Competencies */}
            {data.skills?.length > 0 && (
                <section style={{ marginBottom: sectionSpacing || 24 }}>
                    <SectionTitle>Skills & Competencies</SectionTitle>
                    <div className="text-[0.875em] text-gray-700" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}

            {/* References */}
            <section className="pt-2">
                <SectionTitle>References</SectionTitle>
                <p className="text-[0.875em] text-gray-500 italic">Available upon request</p>
            </section>
        </div>
    );
};

export default AcademicCVTemplate;
