import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

const ModernMonoTemplate = ({ data, accentColor, accentBg, fontSize, headingSize, sectionSpacing }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Invalid Date") return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
        } catch (e) { return dateStr; }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-800 p-10" style={{ fontSize: fontSize || 15 }}>
            {/* Header */}
            <header className="text-center pb-8 mb-8 border-b border-gray-200">
                <h1 className="font-extralight tracking-tight text-gray-900 mb-2" style={{ fontSize: headingSize || 28 }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <div className="flex justify-center flex-wrap gap-5 text-[0.75em] text-gray-500 mt-4">
                    {data.personal_info?.email && (
                        <span className="flex items-center gap-1.5"><Mail size={12} style={{ color: accentColor }} />{data.personal_info.email}</span>
                    )}
                    {data.personal_info?.phone && (
                        <span className="flex items-center gap-1.5"><Phone size={12} style={{ color: accentColor }} />{data.personal_info.phone}</span>
                    )}
                    {data.personal_info?.location && (
                        <span className="flex items-center gap-1.5"><MapPin size={12} style={{ color: accentColor }} />{data.personal_info.location}</span>
                    )}
                    {data.personal_info?.linkedin && (
                        <span className="flex items-center gap-1.5"><Link size={12} style={{ color: accentColor }} /><span className="break-all">{data.personal_info.linkedin}</span></span>
                    )}
                    {data.personal_info?.website && (
                        <span className="flex items-center gap-1.5"><Globe size={12} style={{ color: accentColor }} /><span className="break-all">{data.personal_info.website}</span></span>
                    )}
                </div>
            </header>

            {/* Summary */}
            {data.professional_summary && (
                <section style={{ marginBottom: sectionSpacing || 32 }}>
                    <p className="text-gray-600 leading-relaxed font-light text-center max-w-2xl mx-auto italic">
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
                                    <h3 className="text-base font-medium text-gray-900">{exp.position}</h3>
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
                                    <div className="mt-2 text-[0.875em] text-gray-600 leading-relaxed font-light whitespace-pre-line">
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
                                    <h3 className="text-base font-medium text-gray-900">{p.name}</h3>
                                    {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[0.75em] hover:underline" style={{ color: accentColor }}>↗</a>}
                                </div>
                                {p.type && <p className="text-[0.75em] text-gray-400 font-light">{p.type}</p>}
                                {p.description && <p className="text-[0.875em] text-gray-600 font-light mt-1">{p.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education & Skills side by side */}
            <div className="grid grid-cols-2 gap-10 pt-6 border-t border-gray-200">
                {/* Education */}
                {data.education?.length > 0 && (
                    <section>
                        <h2 className="font-light tracking-widest uppercase mb-5" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.6 : 18 }}>
                            Education
                        </h2>
                        <div className="space-y-3">
                            {data.education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-medium text-gray-900">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                                    <p className="text-[0.875em] text-gray-500 font-light">{edu.institution}</p>
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
                                <span key={i} className="text-[0.875em] text-gray-600 font-light">
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
