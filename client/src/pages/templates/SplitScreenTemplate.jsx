import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  if (dateString.toLowerCase() === 'present') return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const SplitScreenTemplate = ({ data }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Hero Section - Fixed */}
      <div className="w-2/5 bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12 flex flex-col justify-center sticky top-0 h-screen">
        <div className="space-y-6">
          <div>
            <h1 className="text-5xl font-bold mb-3">
              {data.personalInfo?.name || 'Your Name'}
            </h1>
            <p className="text-2xl text-indigo-100">
              {data.personalInfo?.title || 'Professional Title'}
            </p>
          </div>

          {data.personalInfo?.summary && (
            <p className="text-lg leading-relaxed text-indigo-50">
              {data.personalInfo.summary}
            </p>
          )}

          {/* Contact Info */}
          <div className="space-y-3 pt-6">
            {data.contact?.email && (
              <div className="flex items-center gap-3">
                <MailIcon className="w-5 h-5" />
                <span>{data.contact.email}</span>
              </div>
            )}
            {data.contact?.phone && (
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5" />
                <span>{data.contact.phone}</span>
              </div>
            )}
            {data.contact?.location && (
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5" />
                <span>{data.contact.location}</span>
              </div>
            )}
            {data.contact?.linkedin && (
              <div className="flex items-center gap-3">
                <GlobeIcon className="w-5 h-5" />
                <a href={data.contact.linkedin} className="hover:text-indigo-200">
                  LinkedIn Profile
                </a>
              </div>
            )}
            {data.contact?.github && (
              <div className="flex items-center gap-3">
                <GlobeIcon className="w-5 h-5" />
                <a href={data.contact.github} className="hover:text-indigo-200">
                  GitHub Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Content Section - Scrollable */}
      <div className="w-3/5 bg-gray-50 p-12 overflow-y-auto">
        <div className="max-w-3xl space-y-12">
          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-indigo-600 pb-2 inline-block">
                Experience
              </h2>
              <div className="space-y-8">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-indigo-600 font-medium mb-3">{exp.company}</p>
                    {exp.description && (
                      <ul className="space-y-2 text-gray-700">
                        {exp.description.split('\n').map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-indigo-600 mt-1">•</span>
                            <span>{item}</span>
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
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-indigo-600 pb-2 inline-block">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-indigo-600 font-medium">{edu.institution}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-700 mt-2">GPA: {edu.gpa}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-indigo-600 pb-2 inline-block">
                Skills
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                {data.skills.map((skillGroup, idx) => (
                  <div key={idx}>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items?.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-indigo-600 pb-2 inline-block">
                Projects
              </h2>
              <div className="space-y-4">
                {data.projects.map((project, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-gray-700 mb-3">{project.description}</p>
                    )}
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(',').map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
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

export default SplitScreenTemplate;
