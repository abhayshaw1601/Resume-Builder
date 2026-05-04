
const MinimalTemplate = ({ isDarkMode, data, accentColor, fontSize, headingSize, sectionSpacing }) => {
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
        <div className={`max-w-4xl mx-auto p-8 ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} font-light`} style={{ fontSize: fontSize || 16 }}>
            {/* Header */}
            <header className="mb-10" style={{ marginBottom: sectionSpacing || 40 }}>
                <h1 className="font-thin mb-4 tracking-wide" style={{ fontSize: headingSize || 28 }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className={`flex flex-wrap gap-6 text-[0.875em] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {data.personal_info?.email && <a href={`mailto:${data.personal_info.email}`} className="hover:underline">{data.personal_info.email}</a>}
                    {data.personal_info?.phone && <a href={`tel:${data.personal_info.phone.replace(/\s+/g, '')}`} className="hover:underline">{data.personal_info.phone}</a>}
                    {data.personal_info?.location && <span>{data.personal_info.location}</span>}
                    {data.personal_info?.linkedin && (
                        <a href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">LinkedIn</a>
                    )}
                    {data.personal_info?.github && (
                        <a href={data.personal_info.github.startsWith('http') ? data.personal_info.github : `https://${data.personal_info.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                            <Link className="size-4" />
                            <span>GitHub</span>
                        </a>
                    )}
                    {data.personal_info?.website && (
                        <a href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">Portfolio</a>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-10" style={{ marginBottom: sectionSpacing || 40 }}>
                    <p className={` ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-10" style={{ marginBottom: sectionSpacing || 40 }}>
                    <h2 className="uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.5 : 12 }}>
                        Experience
                    </h2>

                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-medium">{exp.position}</h3>
                                    <span className={`text-[0.875em] ${isDarkMode ? 'text-gray-800' : 'text-gray-50'}0`}>
                                        {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </span>
                                </div>
                                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{exp.company}</p>
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
                <section className="mb-10" style={{ marginBottom: sectionSpacing || 40 }}>
                    <h2 className="uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.5 : 12 }}>
                        Projects
                    </h2>

                    <div className="space-y-4">
                        {data.project.map((proj, index) => (
                            <div key={index} className="flex flex-col gap-2 justify-between items-baseline">
                                <h3 className="text-lg font-medium ">{proj.name}</h3>
                                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{proj.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-10" style={{ marginBottom: sectionSpacing || 40 }}>
                    <h2 className="uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.5 : 12 }}>
                        Education
                    </h2>

                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{edu.institution}</p>
                                    {edu.gpa && <p className={`text-[0.875em] ${isDarkMode ? 'text-gray-800' : 'text-gray-50'}0`}>GPA: {edu.gpa}</p>}
                                </div>
                                <span className={`text-[0.875em] ${isDarkMode ? 'text-gray-800' : 'text-gray-50'}0`}>
                                    {formatDate(edu.graduation_date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section style={{ marginBottom: sectionSpacing || 40 }}>
                    <h2 className="uppercase tracking-widest mb-6 font-medium" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.5 : 12 }}>
                        Skills
                    </h2>

                    <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {data.skills.join(" • ")}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;
