import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { getAccentSolidColor } from '../components/builder/FormSections/ThemeSettingsForm';

export const exportToWord = async (resumeData) => {
    try {
        const rawAccent = resumeData.accent_color || '#000000';
        const hexColor = getAccentSolidColor(rawAccent).replace('#', '');

        const children = [];

        // Header Name
        children.push(
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({ 
                        text: resumeData.personal_info?.name || resumeData.personal_info?.full_name || 'Your Name', 
                        bold: true,
                        size: 48, // 24pt
                        color: hexColor 
                    })
                ]
            })
        );

        // Contact Info Row 1
        const contactTokens1 = [];
        if (resumeData.personal_info?.email) contactTokens1.push(resumeData.personal_info.email);
        if (resumeData.personal_info?.phone) contactTokens1.push(resumeData.personal_info.phone);
        if (resumeData.personal_info?.address || resumeData.personal_info?.location) contactTokens1.push(resumeData.personal_info?.address || resumeData.personal_info?.location);
        
        if (contactTokens1.length > 0) {
            children.push(
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: contactTokens1.join('  |  ') })]
                })
            );
        }

        // Contact Info Row 2
        const contactTokens2 = [];
        if (resumeData.personal_info?.linkedin) contactTokens2.push(resumeData.personal_info.linkedin);
        if (resumeData.personal_info?.portfolio || resumeData.personal_info?.website) contactTokens2.push(resumeData.personal_info?.portfolio || resumeData.personal_info?.website);

        if (contactTokens2.length > 0) {
            children.push(
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({ text: contactTokens2.join('  |  ') })]
                })
            );
        }

        // Summary
        if (resumeData.summary || resumeData.professional_summary) {
            children.push(new Paragraph({ text: '', spacing: { before: 200 } }));
            children.push(new Paragraph({ 
                children: [new TextRun({ text: 'PROFESSIONAL SUMMARY', bold: true, color: hexColor })]
            }));
            children.push(new Paragraph({ text: resumeData.summary || resumeData.professional_summary }));
        }

        // Experience
        if (resumeData.experience?.length > 0) {
            children.push(new Paragraph({ text: '', spacing: { before: 200 } }));
            children.push(new Paragraph({ 
                children: [new TextRun({ text: 'EXPERIENCE', bold: true, color: hexColor })]
            }));
            
            resumeData.experience.forEach(exp => {
                children.push(new Paragraph({
                    children: [
                        new TextRun({ text: exp.title || exp.position || 'Position', bold: true }),
                        new TextRun({ text: ` — ${exp.company || 'Company'}`, italics: true }),
                    ]
                }));
                children.push(new Paragraph({ text: exp.duration || `${exp.start_date || ''} - ${exp.is_current ? 'Present' : (exp.end_date || '')}` }));
                
                if (exp.description) {
                    exp.description.split('\n').filter(line => line.trim()).forEach(line => {
                        children.push(new Paragraph({ text: line.trim(), bullet: { level: 0 } }));
                    });
                }
                children.push(new Paragraph({ text: '' }));
            });
        }

        // Projects
        const projects = resumeData.projects || resumeData.project;
        if (projects && projects.length > 0) {
            children.push(new Paragraph({ text: '', spacing: { before: 200 } }));
            children.push(new Paragraph({ 
                children: [new TextRun({ text: 'PROJECTS', bold: true, color: hexColor })]
            }));
            
            projects.forEach(proj => {
                children.push(new Paragraph({
                    children: [
                        new TextRun({ text: proj.name || 'Project Name', bold: true }),
                        ...(proj.type ? [new TextRun({ text: ` | ${proj.type}`, italics: true })] : []),
                    ]
                }));
                if (proj.description) {
                    proj.description.split('\n').filter(line => line.trim()).forEach(line => {
                        children.push(new Paragraph({ text: line.trim(), bullet: { level: 0 } }));
                    });
                }
                children.push(new Paragraph({ text: '' }));
            });
        }

        // Education
        if (resumeData.education?.length > 0) {
            children.push(new Paragraph({ text: '', spacing: { before: 200 } }));
            children.push(new Paragraph({ 
                children: [new TextRun({ text: 'EDUCATION', bold: true, color: hexColor })]
            }));
            
            resumeData.education.forEach(edu => {
                children.push(new Paragraph({
                    children: [
                        new TextRun({ text: edu.degree || '', bold: true }),
                        ...(edu.field ? [new TextRun({ text: ` in ${edu.field}`, bold: true })] : []),
                    ]
                }));
                children.push(new Paragraph({
                    children: [
                        new TextRun({ text: edu.school || edu.institution || '', italics: true }),
                        new TextRun({ text: ` | ${edu.year || edu.graduation_date || ''}` }),
                        ...(edu.gpa ? [new TextRun({ text: ` | GPA: ${edu.gpa}` })] : [])
                    ]
                }));
                children.push(new Paragraph({ text: '' }));
            });
        }

        // Skills
        if (resumeData.skills?.length > 0) {
            children.push(new Paragraph({ text: '', spacing: { before: 200 } }));
            children.push(new Paragraph({ 
                children: [new TextRun({ text: 'SKILLS', bold: true, color: hexColor })]
            }));
            children.push(new Paragraph({ text: resumeData.skills.join(', ') }));
        }

        const doc = new Document({
            sections: [{
                properties: {},
                children: children
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
