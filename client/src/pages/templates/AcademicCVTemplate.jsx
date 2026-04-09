import React from 'react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  if (dateString.toLowerCase() === 'present') return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

const AcademicCVTemplate = ({ data }) => {
  return (
    <div className="min-h-screen bg-white p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-3 pb-6 border-b-2 border-gray-800">
          <h1 className="text-4xl font-serif font-bold text-gray-900">
            {data.personalInfo?.name || 'Your Name'}
          </h1>
          <p className="text-lg text-gray-700">
            {data.personalInfo?.title || 'Academic Title'}
          </p>
          
          {/* Contact */}
          <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600 pt-2">
            {data.contact?.email && <span>{data.contact.email}</span>}
            {data.contact?.phone && <span>•</span>}
            {data.contact?.phone && <span>{data.contact.phone}</span>}
            {data.contact?.location && <span>•</span>}
            {data.contact?.location && <span>{data.contact.location}</span>}
          </div>
        </header>

        {/* Research Interests / Summary */}
        {data.personalInfo?.summary && (
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-400 pb-1">
              Research Interests
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-400 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx} className="space-y-1 pb-4 border-b border-gray-200 last:border-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 italic">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  {edu.description && (
                    <p className="text-sm text-gray-700 pt-1">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Academic Experience / Teaching */}
        {data.experience?.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-400 pb-1">
              Academic & Professional Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="space-y-1 pb-4 border-b border-gray-200 last:border-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-base font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 italic">{exp.company}</p>
                  {exp.description && (
                    <ul className="list-disc list-inside space-y-1 text-gray-700 pt-2">
                      {exp.description.split('\n').map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Publications */}
        {data.publications?.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-400 pb-1">
              Publications
            </h2>
            <div className="space-y-3">
              {data.publications.map((pub, idx) => (
                <div key={idx} className="text-gray-700 text-sm leading-relaxed">
                  <span className="font-semibold">{pub.authors}</span> ({pub.year}).{' '}
                  <span className="italic">{pub.title}</span>.{' '}
                  <span>{pub.venue}</span>
                  {pub.doi && (
                    <span className="text-blue-600"> DOI: {pub.doi}</span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Research Projects */}
        {data.projects?.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-400 pb-1">
              Research Projects
            </h2>
            <div className="space-y-4">
              {data.projects.map((project, idx) => (
                <div key={idx} className="space-y-1 pb-4 border-b border-gray-200 last:border-0">
                  <h3 className="text-base font-semibold text-gray-900">
                    {project.name}
                  </h3>
                  {project.description && (
                    <p className="text-gray-700">{project.description}</p>
                  )}
                  {project.technologies && (
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Methods/Tools:</span> {project.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Awards */}
        {data.certifications?.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-400 pb-1">
              Certifications & Awards
            </h2>
            <div className="space-y-2">
              {data.certifications.map((cert, idx) => (
                <div key={idx} className="text-gray-700 pb-2 border-b border-gray-200 last:border-0">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold">{cert.name}</span>
                    {cert.date && (
                      <span className="text-sm text-gray-600">
                        {formatDate(cert.date)}
                      </span>
                    )}
                  </div>
                  {cert.issuer && (
                    <p className="text-sm text-gray-600 italic">{cert.issuer}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Competencies */}
        {data.skills?.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-400 pb-1">
              Skills & Competencies
            </h2>
            <div className="space-y-3">
              {data.skills.map((skillGroup, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="font-semibold text-gray-900 min-w-[140px]">
                    {skillGroup.category}:
                  </span>
                  <span className="text-gray-700">
                    {skillGroup.items?.join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Professional Memberships */}
        {data.memberships?.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-400 pb-1">
              Professional Memberships
            </h2>
            <ul className="space-y-1">
              {data.memberships.map((membership, idx) => (
                <li key={idx} className="text-gray-700">
                  {membership.organization}
                  {membership.role && <span className="italic"> - {membership.role}</span>}
                  {membership.year && <span className="text-sm text-gray-600"> ({membership.year})</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* References */}
        <section className="space-y-3 pt-4">
          <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-400 pb-1">
            References
          </h2>
          <p className="text-gray-700 italic">Available upon request</p>
        </section>
      </div>
    </div>
  );
};

export default AcademicCVTemplate;
