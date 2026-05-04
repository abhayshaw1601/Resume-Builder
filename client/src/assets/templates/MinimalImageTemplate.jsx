import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

const MinimalImageTemplate = ({ isDarkMode, data, accentColor, fontSize, headingSize, sectionSpacing }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Invalid Date") return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
            });
        } catch (e) {
            return dateStr;
        }
    };

    return (
        <div className={`max-w-5xl mx-auto ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-white'} text-zinc-800`} style={{ fontSize: fontSize || 16 }}>
            <div className="grid grid-cols-3">

                <div className="col-span-1  py-10">
                    {/* Image */}
                    {data.personal_info?.image && typeof data.personal_info.image === 'string' ? (
                        <div className="mb-6">
                            <img src={data.personal_info.image} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" style={{ background: accentColor+'70' }} />
                        </div>
                    ) : (
                        data.personal_info?.image && typeof data.personal_info.image === 'object' ? (
                            <div className="mb-6">
                                <img src={URL.createObjectURL(data.personal_info.image)} alt="Profile" className="w-32 h-32 object-cover rounded-full mx-auto" />
                            </div>
                        ) : null
                    )}
                </div>

                {/* Name + Title */}
                <div className="col-span-2 flex flex-col justify-center py-10 px-8">
                    <h1 className="font-bold text-zinc-700 tracking-widest" style={{ fontSize: headingSize || 28 }}>
                        {data.personal_info?.full_name || "Your Name"}
                    </h1>
                    <p className="uppercase text-zinc-600 font-medium text-[0.875em] tracking-widest">
                        {data?.personal_info?.profession || "Profession"}
                    </p>
                </div>

                {/* Left Sidebar */}
                <aside className="col-span-1 border-r border-zinc-400 p-6 pt-0">


                    {/* Contact */}
                    <section className="mb-8" style={{ marginBottom: sectionSpacing || 32 }}>
                        <h2 className="font-semibold tracking-widest text-zinc-600 mb-3" style={{ fontSize: headingSize ? headingSize * 0.5 : 12 }}>
                            CONTACT
                        </h2>
                        <div className="space-y-2 text-[0.875em]">
                            {data.personal_info?.phone && (
                                <a href={`tel:${data.personal_info.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:underline">
                                    <Phone size={14} style={{ color: accentColor }} />
                                    <span>{data.personal_info.phone}</span>
                                </a>
                            )}
                            {data.personal_info?.email && (
                                <a href={`mailto:${data.personal_info.email}`} className="flex items-center gap-2 hover:underline">
                                    <Mail size={14} style={{ color: accentColor }} />
                                    <span className="truncate">{data.personal_info.email}</span>
                                </a>
                            )}
                            {data.personal_info?.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} style={{ color: accentColor }} />
                                    <span>{data.personal_info.location}</span>
                                </div>
                            )}
                            {data.personal_info?.linkedin && (
                                <a href={data.personal_info.linkedin.startsWith('http') ? data.personal_info.linkedin : `https://${data.personal_info.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                    <Link size={14} style={{ color: accentColor }} />
                                    <span>LinkedIn</span>
                                </a>
                            )}
                            {data.personal_info?.github && (
                                <a href={data.personal_info.github.startsWith('http') ? data.personal_info.github : `https://${data.personal_info.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                    <Link size={14} style={{ color: accentColor }} />
                                    <span>GitHub</span>
                                </a>
                            )}
                            {data.personal_info?.website && (
                                <a href={data.personal_info.website.startsWith('http') ? data.personal_info.website : `https://${data.personal_info.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                                    <Globe size={14} style={{ color: accentColor }} />
                                    <span>Portfolio</span>
                                </a>
                            )}
                        </div>
                    </section>

                    {/* Education */}
                    {data.education && data.education.length > 0 && (
                        <section className="mb-8" style={{ marginBottom: sectionSpacing || 32 }}>
                            <h2 className="font-semibold tracking-widest text-zinc-600 mb-3" style={{ fontSize: headingSize ? headingSize * 0.5 : 12 }}>
                                EDUCATION
                            </h2>
                            <div className="space-y-4 text-[0.875em]">
                                {data.education.map((edu, index) => (
                                    <div key={index}>
                                        <p className="font-semibold uppercase">{edu.degree}</p>
                                        <p className="text-zinc-600">{edu.institution}</p>
                                        <p className="text-[0.75em] text-zinc-500">
                                            {formatDate(edu.graduation_date)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {data.skills && data.skills.length > 0 && (
                        <section>
                            <h2 className="font-semibold tracking-widest text-zinc-600 mb-3" style={{ fontSize: headingSize ? headingSize * 0.5 : 12 }}>
                                SKILLS
                            </h2>
                            <ul className="space-y-1 text-[0.875em]">
                                {data.skills.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </section>
                    )}
                </aside>

                {/* Right Content */}
                <main className="col-span-2 p-8 pt-0">

                    {/* Summary */}
                    {data.professional_summary && (
                        <section className="mb-8" style={{ marginBottom: sectionSpacing || 32 }}>
                            <h2 className="font-semibold tracking-widest mb-3" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.5 : 12 }} >
                                SUMMARY
                            </h2>
                            <p className="text-zinc-700 leading-relaxed">
                                {data.professional_summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {data.experience && data.experience.length > 0 && (
                        <section style={{ marginBottom: sectionSpacing || 32 }}>
                            <h2 className="font-semibold tracking-widest mb-4" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.5 : 12 }} >
                                EXPERIENCE
                            </h2>
                            <div className="space-y-6 mb-8">
                                {data.experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-semibold text-zinc-900">
                                                {exp.position}
                                            </h3>
                                            <span className="text-[0.75em] text-zinc-500">
                                                {formatDate(exp.start_date)} -{" "}
                                                {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                            </span>
                                        </div>
                                        <p className="text-[0.875em] mb-2" style={{ color: accentColor }} >
                                            {exp.company}
                                        </p>
                                        {exp.description && (
                                            <ul className="list-disc list-inside text-[0.875em] text-zinc-700 leading-relaxed space-y-1">
                                                {exp.description.split("\n").map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {data.project && data.project.length > 0 && (
                        <section style={{ marginBottom: sectionSpacing || 32 }}>
                            <h2 className="uppercase tracking-widest font-semibold" style={{ color: accentColor, fontSize: headingSize ? headingSize * 0.5 : 12 }}>
                                PROJECTS
                            </h2>
                            <div className="space-y-4">
                                {data.project.map((project, index) => (
                                    <div key={index}>
                                        <h3 className="text-md font-medium text-zinc-800 mt-3">{project.name}</h3>
                                        <p className="text-[0.875em] mb-1" style={{ color: accentColor }} >
                                            {project.type}
                                        </p>
                                        {project.description && (
                                            <ul className="list-disc list-inside text-[0.875em] text-zinc-700  space-y-1">
                                                {project.description.split("\n").map((line, i) => (
                                                    <li key={i}>{line}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
}


export default MinimalImageTemplate;
