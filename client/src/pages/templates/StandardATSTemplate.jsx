import React from 'react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  if (dateString.toLowerCase() === 'present') return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const StandardATSTemplate = ({ data }) => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="text-center space-y-2 pb-4 border-b-2 border-black">
          <h1 className="text-3xl font-bold text-black uppercase tracking-wide">
            {data.personalInfo?.name || 'Your Name'}
          </h1>
          <p className="text-lg text-black">
            {data.personalInfo?.title || 'Professional Title'}
          </p>
          
          {/* Contact */}
          <div className="flex justify-center flex-wrap gap-4 text-sm text-black pt-2">
            {data.contact?.email && <span>{data.contact.email}</span>}
            {data.contact?.phone && <span>|</span>}
            {data.contact?.phone && <span>{data.contact.phone}</span>}
            {data.contact?.location && <span>|</span>}
            {data.contact?.location && <span>{data.contact.location}</span>}
            {data.contact?.linkedin && <span>|</span>}
            {data.contact?.linkedin && (
              <a href={data.contact.linkedin} className="underline">
                LinkedIn
              </a>
            )}
          </div>
        </header>

        {/* Summary */}
        {data.personalInfo?.summary && (
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-black uppercase border-b border-black pb-1">
              Professional Summary
            </h2>
            <p className="text-black leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-black uppercase border-b border-black pb-1">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-bold text-black">
                      {exp.position}
                    </h3>
                    <span className="text-sm text-black">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-black font-semibold">{exp.company}</p>
                  {exp.description && (
                    <ul className="list-disc list-outside ml-5 space-y-1 text-black">
                      {exp.description.split('\n').map((item, i) => (
                        <li key={i} className="pl-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-black uppercase border-b border-black pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-bold text-black">
                      {edu.degree}
                    </h3>
                    <span className="text-sm text-black">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-black">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-black">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-black uppercase border-b border-black pb-1">
              Skills
            </h2>
            <div className="space-y-2">
              {data.skills.map((skillGroup, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="font-bold text-black min-w-[120px]">
                    {skillGroup.category}:
                  </span>
                  <span className="text-black">
                    {skillGroup.items?.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-black uppercase border-b border-black pb-1">
              Projects
            </h2>
            <div className="space-y-3">
              {data.projects.map((project, idx) => (
                <div key={idx} className="space-y-1">
                  <h3 className="text-base font-bold text-black">
                    {project.name}
                  </h3>
                  {project.description && (
                    <p className="text-black">{project.description}</p>
                  )}
                  {project.technologies && (
                    <p className="text-sm text-black">
                      <span className="font-semibold">Technologies:</span> {project.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications?.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-black uppercase border-b border-black pb-1">
              Certifications
            </h2>
            <ul className="space-y-1">
              {data.certifications.map((cert, idx) => (
                <li key={idx} className="text-black">
                  <span className="font-semibold">{cert.name}</span>
                  {cert.issuer && <span> - {cert.issuer}</span>}
                  {cert.date && <span> ({formatDate(cert.date)})</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default StandardATSTemplate;
