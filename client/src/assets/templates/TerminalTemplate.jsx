const TerminalTemplate = ({ data, accentColor, accentBg, fontSize, sectionSpacing }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Invalid Date") return "";
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
        } catch (e) { return dateStr; }
    };

    const accent = accentColor || "#22c55e";

    return (
        <div className="w-full min-h-full bg-[#1a1b26] font-mono" style={{ fontSize: fontSize || 13 }}>
            {/* Terminal Chrome */}
            <div className="bg-[#24283b] px-4 py-2.5 flex items-center gap-2 border-b border-[#414868]">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#f7768e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#e0af68]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#9ece6a]"></div>
                </div>
                <span className="text-[#565f89] text-xs ml-3">resume.sh — bash</span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 space-y-4" style={{ color: accent }}>
                {/* Header */}
                <div>
                    <div className="text-[#565f89]">$ whoami</div>
                    <div className="text-[#7dcfff] text-2xl font-bold mt-0.5">{data.personal_info?.full_name || "Your Name"}</div>
                    {data.experience?.[0]?.position && (
                        <div style={{ color: accent }} className="text-sm">{data.experience[0].position}</div>
                    )}
                </div>

                {/* Contact */}
                <div>
                    <div className="text-[#565f89]">$ cat ~/.contact</div>
                    <div className="pl-2 space-y-0.5 text-sm mt-1">
                        {data.personal_info?.email && (
                            <div><span className="text-[#bb9af7]">email</span><span className="text-[#89ddff]">=</span><span className="text-[#a9b1d6]">{data.personal_info.email}</span></div>
                        )}
                        {data.personal_info?.phone && (
                            <div><span className="text-[#bb9af7]">phone</span><span className="text-[#89ddff]">=</span><span className="text-[#a9b1d6]">{data.personal_info.phone}</span></div>
                        )}
                        {data.personal_info?.location && (
                            <div><span className="text-[#bb9af7]">location</span><span className="text-[#89ddff]">=</span><span className="text-[#a9b1d6]">{data.personal_info.location}</span></div>
                        )}
                        {data.personal_info?.linkedin && (
                            <div><span className="text-[#bb9af7]">linkedin</span><span className="text-[#89ddff]">=</span><span className="text-[#a9b1d6] break-all">{data.personal_info.linkedin}</span></div>
                        )}
                        {data.personal_info?.website && (
                            <div><span className="text-[#bb9af7]">website</span><span className="text-[#89ddff]">=</span><span className="text-[#a9b1d6] break-all">{data.personal_info.website}</span></div>
                        )}
                    </div>
                </div>

                {/* Summary */}
                {data.professional_summary && (
                    <div style={{ marginBottom: (sectionSpacing || 16) - 12 }}>
                        <div className="text-[#565f89]">$ cat summary.md</div>
                        <div className="text-[#a9b1d6] text-sm pl-2 mt-1 leading-relaxed">{data.professional_summary}</div>
                    </div>
                )}

                {/* Experience */}
                {data.experience?.length > 0 && (
                    <div style={{ marginBottom: (sectionSpacing || 16) - 12 }}>
                        <div className="text-[#565f89]">$ cat experience.log</div>
                        <div className="space-y-3 mt-1">
                            {data.experience.map((exp, i) => (
                                <div key={i} className="pl-3 border-l-2" style={{ borderColor: `${accent}60` }}>
                                    <div className="text-[#7dcfff] font-bold">{exp.position}</div>
                                    <div style={{ color: accent }} className="text-sm">
                                        {exp.link
                                            ? <a href={exp.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{exp.company} ↗</a>
                                            : exp.company}
                                    </div>
                                    <div className="text-[#565f89] text-xs">
                                        {formatDate(exp.start_date)} — {exp.is_current ? "Present" : formatDate(exp.end_date)}
                                    </div>
                                    {exp.description && (
                                        <div className="mt-1.5 space-y-0.5 text-sm">
                                            {exp.description.split("\n").filter(Boolean).map((line, j) => (
                                                <div key={j} className="flex gap-2">
                                                    <span style={{ color: accent }}>→</span>
                                                    <span className="text-[#a9b1d6]">{line}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {data.project?.length > 0 && (
                    <div style={{ marginBottom: (sectionSpacing || 16) - 12 }}>
                        <div className="text-[#565f89]">$ ls ~/projects/</div>
                        <div className="space-y-2 mt-1">
                            {data.project.map((p, i) => (
                                <div key={i} className="pl-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[#e0af68]">📁</span>
                                        <span className="text-[#7dcfff] font-semibold">{p.name}</span>
                                        {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[10px] hover:underline" style={{ color: accent }}>↗</a>}
                                    </div>
                                    {p.type && <div className="text-[#bb9af7] text-xs pl-6">[{p.type}]</div>}
                                    {p.description && <div className="text-[#a9b1d6] text-sm pl-6">{p.description}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {data.skills?.length > 0 && (
                    <div style={{ marginBottom: (sectionSpacing || 16) - 12 }}>
                        <div className="text-[#565f89]">$ echo $SKILLS</div>
                        <div className="flex flex-wrap gap-1.5 mt-1 pl-2">
                            {data.skills.map((skill, i) => (
                                <span key={i} className="px-2 py-0.5 text-xs rounded border" 
                                    style={{ borderColor: `${accent}40`, color: accent, backgroundColor: `${accent}10` }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {data.education?.length > 0 && (
                    <div>
                        <div className="text-[#565f89]">$ cat education.txt</div>
                        <div className="space-y-2 mt-1">
                            {data.education.map((edu, i) => (
                                <div key={i} className="pl-3 border-l-2 border-[#7aa2f7]">
                                    <div className="text-[#7dcfff] font-bold">{edu.degree} {edu.field && `in ${edu.field}`}</div>
                                    <div className="text-[#e0af68] text-sm">{edu.institution}</div>
                                    <div className="text-[#565f89] text-xs">{formatDate(edu.graduation_date)}</div>
                                    {edu.gpa && <div className="text-[#a9b1d6] text-xs">GPA: {edu.gpa}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Cursor */}
                <div className="flex items-center gap-2 pt-2">
                    <span className="text-[#565f89]">$</span>
                    <span className="w-2 h-4 animate-pulse" style={{ backgroundColor: accent }}></span>
                </div>
            </div>
        </div>
    );
};

export default TerminalTemplate;
