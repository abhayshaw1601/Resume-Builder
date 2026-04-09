import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor, accentBg, fontSize, headingSize, sectionSpacing }) => {
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
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed" style={{ fontSize: fontSize || 16 }}>
            {/* Header */}
            <header className="text-center mb-8 pb-6 border-b-4" style={{ borderColor: accentColor }}>
                <h1 className="font-bold mb-2" style={{ color: accentColor, fontSize: headingSize || 24 }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap justify-center gap-4 text-[0.875em] text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Link className="size-4" />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-4" />
                            <span className="break-all">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-6" style={{ marginBottom: sectionSpacing || 24 }}>
                    <h2 className="font-semibold mb-3" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.65 : 16 }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
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
                                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                        <p className="text-gray-700 font-medium">{
                                            exp.link
                                                ? <a href={exp.link} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} className="hover:underline">{exp.company} ↗</a>
                                                : exp.company
                                        }</p>
                                    </div>
                                    <div className="text-right text-[0.875em] text-gray-600">
                                        <p>{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
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
                            <div key={index} className="flex justify-between items-start border-l-3 border-gray-300 pl-6">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <li className="font-semibold text-gray-800 ">{proj.name}</li>
                                        {proj.link && (
                                            <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }} className="text-[0.75em] hover:underline" title={proj.link}>↗ Link</a>
                                        )}
                                    </div>
                                    {proj.type && <p className="text-[0.75em] text-gray-500 mb-1">{proj.type}</p>}
                                    <p className="text-gray-600">{proj.description}</p>
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
                                    <h3 className="font-semibold text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-700">{edu.institution}</p>
                                    {edu.gpa && <p className="text-[0.875em] text-gray-600">GPA: {edu.gpa}</p>}
                                </div>
                                <div className="text-[0.875em] text-gray-600">
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
                            <div key={index} className="text-gray-700">
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