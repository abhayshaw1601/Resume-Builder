import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

export const exportToWord = async (resumeData) => {
    try {
        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    // Header
                    new Paragraph({
                        text: resumeData.personal_info?.name || resumeData.personal_info?.full_name || 'Your Name',
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({ text: resumeData.personal_info?.email ? `${resumeData.personal_info.email} | ` : '' }),
                            new TextRun({ text: resumeData.personal_info?.phone ? `${resumeData.personal_info.phone} | ` : '' }),
                            new TextRun({ text: resumeData.personal_info?.address || resumeData.personal_info?.location || '' }),
                        ].filter(t => t.text),
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({ text: resumeData.personal_info?.linkedin ? `${resumeData.personal_info.linkedin} | ` : '' }),
                            new TextRun({ text: resumeData.personal_info?.portfolio || resumeData.personal_info?.website || '' }),
                        ].filter(t => t.text),
                    }),

                    // Summary
                    ...(resumeData.summary || resumeData.professional_summary ? [
                        new Paragraph({ text: '', spacing: { before: 200 } }),
                        new Paragraph({ text: 'PROFESSIONAL SUMMARY', heading: HeadingLevel.HEADING_2 }),
                        new Paragraph({ text: resumeData.summary || resumeData.professional_summary })
                    ] : []),

                    // Experience
                    ...(resumeData.experience?.length > 0 ? [
                        new Paragraph({ text: '', spacing: { before: 200 } }),
                        new Paragraph({ text: 'EXPERIENCE', heading: HeadingLevel.HEADING_2 }),
                        ...resumeData.experience.flatMap(exp => [
                            new Paragraph({
                                children: [
                                    new TextRun({ text: exp.title || exp.position, bold: true }),
                                    new TextRun({ text: ` — ${exp.company}`, italics: true }),
                                ]
                            }),
                            new Paragraph({ text: exp.duration || `${exp.start_date} - ${exp.is_current ? 'Present' : exp.end_date}` }),
                            ...(exp.description ? exp.description.split('\n').map(line =>
                                new Paragraph({
                                    text: line,
                                    bullet: { level: 0 }
                                })
                            ) : []),
                            new Paragraph({ text: '' })
                        ])
                    ] : []),

                    // Projects
                    ...(resumeData.projects?.length > 0 || resumeData.project?.length > 0 ? [
                        new Paragraph({ text: '', spacing: { before: 200 } }),
                        new Paragraph({ text: 'PROJECTS', heading: HeadingLevel.HEADING_2 }),
                        ...(resumeData.projects || resumeData.project).flatMap(proj => [
                            new Paragraph({
                                children: [
                                    new TextRun({ text: proj.name, bold: true }),
                                    ...(proj.type ? [new TextRun({ text: ` | ${proj.type}`, italics: true })] : []),
                                ]
                            }),
                            ...(proj.description ? proj.description.split('\n').map(line =>
                                new Paragraph({
                                    text: line,
                                    bullet: { level: 0 }
                                })
                            ) : []),
                            new Paragraph({ text: '' })
                        ])
                    ] : []),

                    // Education
                    ...(resumeData.education?.length > 0 ? [
                        new Paragraph({ text: '', spacing: { before: 200 } }),
                        new Paragraph({ text: 'EDUCATION', heading: HeadingLevel.HEADING_2 }),
                        ...resumeData.education.flatMap(edu => [
                            new Paragraph({
                                children: [
                                    new TextRun({ text: edu.degree || '', bold: true }),
                                    ...(edu.field ? [new TextRun({ text: ` in ${edu.field}`, bold: true })] : []),
                                ]
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({ text: edu.school || edu.institution || '', italics: true }),
                                    new TextRun({ text: ` | ${edu.year || edu.graduation_date || ''}` }),
                                    ...(edu.gpa ? [new TextRun({ text: ` | GPA: ${edu.gpa}` })] : [])
                                ]
                            }),
                            new Paragraph({ text: '' })
                        ])
                    ] : []),

                    // Skills
                    ...(resumeData.skills?.length > 0 ? [
                        new Paragraph({ text: '', spacing: { before: 200 } }),
                        new Paragraph({ text: 'SKILLS', heading: HeadingLevel.HEADING_2 }),
                        new Paragraph({ text: resumeData.skills.join(', ') })
                    ] : []),
                ]
            }]
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${resumeData.personal_info?.name?.replace(/\s+/g, '_') || 'Resume'}_ATS.docx`);
        return true;
    } catch (err) {
        console.error('Error exporting word doc:', err);
        return false;
    }
};
