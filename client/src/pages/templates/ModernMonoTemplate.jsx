import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  if (dateString.toLowerCase() === 'present') return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const ModernMonoTemplate = ({ data }) => {
  return (
    <div className="min-h-screen bg-white p-12">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Header */}
        <header className="text-center space-y-4 pb-12 border-b border-gray-200">
          <h1 className="text-5xl font-light tracking-tight text-gray-900">
            {data.personalInfo?.name || 'Your Name'}
          </h1>
          <p className="text-xl text-indigo-600 font-light">
            {data.personalInfo?.title || 'Professional Title'}
          </p>
          
          {/* Contact */}
          <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-600 pt-4">
            {data.contact?.email && (
              <div className="flex items-center gap-1">
                <MailIcon className="w-4 h-4" />
                <span>{data.contact.email}</span>
              </div>
            )}
            {data.contact?.phone && (
              <div className="flex items-center gap-1">
                <PhoneIcon className="w-4 h-4" />
                <span>{data.contact.phone}</span>
              </div>
            )}
            {data.contact?.location && (
              <div className="flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                <span>{data.contact.location}</span>
              </div>
            )}
            {data.contact?.linkedin && (
              <div className="flex items-center gap-1">
                <GlobeIcon className="w-4 h-4" />
                <a href={data.contact.linkedin} className="hover:text-indigo-600">
                  LinkedIn
                </a>
              </div>
            )}
            {data.contact?.github && (
              <div className="flex items-center gap-1">
                <GlobeIcon className="w-4 h-4" />
                <a href={data.contact.github} className="hover:text-indigo-600">
                  GitHub
                </a>
              </div>
            )}
            {data.contact?.website && (
              <div className="flex items-center gap-1">
                <GlobeIcon className="w-4 h-4" />
                <a href={data.contact.website} className="hover:text-indigo-600">
                  Website
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Summary */}
        {data.personalInfo?.summary && (
          <section className="space-y-6">
            <h2 className="text-2xl font-light text-indigo-600 tracking-wide">
              About
            </h2>
            <p className="text-gray-700 leading-relaxed font-light text-lg">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-2xl font-light text-indigo-600 tracking-wide">
              Experience
            </h2>
            <div className="space-y-10">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xl font-normal text-gray-900">
                      {exp.position}
                    </h3>
                    <span className="text-sm text-gray-500 font-light">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-600 font-light">{exp.company}</p>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed pt-2 space-y-1">
                      {exp.description.split('\n').map((item, i) => (
                        <p key={i} className="font-light">{item}</p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-gray-200">
          {/* Education */}
          {data.education?.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-light text-indigo-600 tracking-wide">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1">
                    <h3 className="text-lg font-normal text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600 font-light">{edu.institution}</p>
                    <p className="text-sm text-gray-500 font-light">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-light text-indigo-600 tracking-wide">
                Skills
              </h2>
              <div className="space-y-4">
                {data.skills.map((skillGroup, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items?.map((skill, i) => (
                        <span
                          key={i}
                          className="text-sm text-gray-700 font-light"
                        >
                          {skill}{i < skillGroup.items.length - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernMonoTemplate;
