import React from 'react';
import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

const ExecutiveTemplate = ({ data, accentColor, accentBg, fontSize, sectionSpacing }) => {
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
        <div className="w-full min-h-full bg-white text-gray-800 leading-relaxed flex flex-row shadow-2xl" style={{ fontSize: fontSize || 16 }}>
            {/* Left Sidebar */}
            <aside className="w-[30%] min-h-full p-6 text-white flex flex-col gap-8 shrink-0" style={{ background: accentBg || accentColor || '#1e293b' }}>
                
                {data.personal_info?.photo && (
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-lg shrink-0 bg-white">
                        <img 
                            src={data.personal_info.photo} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                            style={{
                                transform: `scale(${data.personal_info.photo_settings?.scale || 1}) translate(${data.personal_info.photo_settings?.offsetX || 0}px, ${data.personal_info.photo_settings?.offsetY || 0}px)`,
                                filter: `grayscale(${data.personal_info.photo_settings?.grayscale || 0}%)`
                            }}
                        />
                    </div>
                )}

                <div>
                    <h2 className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Contact</h2>
                    <ul className="flex flex-col gap-3 text-sm text-white/90 break-words">
                        {data.personal_info?.email && (
                            <li className="flex items-start gap-2"><Mail className="w-4 h-4 shrink-0 mt-0.5 opacity-70" /> <span>{data.personal_info.email}</span></li>
                        )}
                        {data.personal_info?.phone && (
                            <li className="flex items-start gap-2"><Phone className="w-4 h-4 shrink-0 mt-0.5 opacity-70" /> <span>{data.personal_info.phone}</span></li>
                        )}
                        {data.personal_info?.location && (
                            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5 opacity-70" /> <span>{data.personal_info.location}</span></li>
                        )}
                        {data.personal_info?.linkedin && (
                            <li className="flex items-start gap-2"><Link className="w-4 h-4 shrink-0 mt-0.5 opacity-70" /> <span>{data.personal_info.linkedin}</span></li>
                        )}
                        {data.personal_info?.website && (
                            <li className="flex items-start gap-2"><Globe className="w-4 h-4 shrink-0 mt-0.5 opacity-70" /> <span>{data.personal_info.website}</span></li>
                        )}
                    </ul>
                </div>

                {data.education && data.education.length > 0 && (
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Education</h2>
                        <div className="flex flex-col gap-4">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="flex flex-col gap-1">
                                    <h3 className="font-semibold text-white leading-tight">{edu.degree}</h3>
                                    <span className="text-xs text-white/70 italic">{edu.institution}</span>
                                    <span className="text-xs font-bold bg-white/10 w-fit px-2 py-0.5 rounded text-white/90 mt-1">{formatDate(edu.graduation_date)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {data.skills && data.skills.length > 0 && (
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Core Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="bg-white/10 border border-white/10 px-2.5 py-1 rounded text-xs font-medium text-white/90 shadow-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Right Main Body */}
            <main className="flex-1 p-8 flex flex-col pt-12 bg-[#fafafa]">
                
                <header className="mb-8">
                    <h1 className="text-5xl font-black uppercase text-gray-900 tracking-tighter mb-2" style={{ color: accentColor }}>
                        {data.personal_info?.full_name || "YOUR NAME"}
                    </h1>
                    {data.experience?.[0]?.position && (
                        <h2 className="text-xl font-medium uppercase tracking-widest" style={{ color: accentColor }}>
                            {data.experience[0].position}
                        </h2>
                    )}
                </header>

                {data.professional_summary && (
                    <section className="mb-8 relative" style={{ marginBottom: sectionSpacing || 32 }}>
                        <div className="absolute -left-4 top-0 w-1.5 h-full rounded" style={{ backgroundColor: accentColor }}></div>
                        <p className="text-sm text-gray-600 leading-loose italic font-medium">
                            "{data.professional_summary}"
                        </p>
                    </section>
                )}

                {data.experience && data.experience.length > 0 && (
                    <section style={{ marginBottom: sectionSpacing || 32 }}>
                        <h2 className="text-lg font-extrabold uppercase tracking-widest mb-6 pb-2 border-b-2 border-gray-200" style={{ color: accentColor }}>
                            Professional Experience
                        </h2>
                        <div className="flex flex-col gap-6">
                            {data.experience.map((exp, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-lg font-bold text-gray-800">{exp.position}</h3>
                                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-gray-200 text-gray-600 rounded drop-shadow-sm">
                                            {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: accentColor }}>
                                        {exp.link
                                            ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{exp.company} ↗</a>
                                            : exp.company
                                        }
                                    </h4>
                                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap font-medium">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </main>
        </div>
    )
}

export default ExecutiveTemplate;
