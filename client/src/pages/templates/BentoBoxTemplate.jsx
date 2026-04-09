import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, BriefcaseIcon, GraduationCapIcon, CodeIcon, FolderGit2Icon } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  if (dateString.toLowerCase() === 'present') return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const BentoBoxTemplate = ({ data }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
          {/* Header Card - Spans 2 columns */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {data.personalInfo?.name || 'Your Name'}
                </h1>
                <p className="text-xl text-indigo-600 mb-4">
                  {data.personalInfo?.title || 'Professional Title'}
                </p>
                {data.personalInfo?.summary && (
                  <p className="text-gray-700 leading-relaxed">
                    {data.personalInfo.summary}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MailIcon className="w-5 h-5" />
              Contact
            </h2>
            <div className="space-y-3 text-sm">
              {data.contact?.email && (
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4" />
                  <span className="break-all">{data.contact.email}</span>
                </div>
              )}
              {data.contact?.phone && (
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4" />
                  <span>{data.contact.phone}</span>
                </div>
              )}
              {data.contact?.location && (
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{data.contact.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills Card - Spans 2 columns */}
          {data.skills?.length > 0 && (
            <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CodeIcon className="w-6 h-6 text-indigo-600" />
                Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.skills.map((skillGroup, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      {skillGroup.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items?.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-sm hover:bg-indigo-100 transition"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Card */}
          {data.education?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <GraduationCapIcon className="w-6 h-6 text-indigo-600" />
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-sm text-indigo-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Card - Spans 3 columns */}
          {data.experience?.length > 0 && (
            <div className="md:col-span-3 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BriefcaseIcon className="w-6 h-6 text-indigo-600" />
                Experience
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="border-l-4 border-indigo-600 pl-4 space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-indigo-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </p>
                    {exp.description && (
                      <ul className="space-y-1 text-sm text-gray-700">
                        {exp.description.split('\n').slice(0, 3).map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-indigo-600">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Card - Spans 3 columns */}
          {data.projects?.length > 0 && (
            <div className="md:col-span-3 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <FolderGit2Icon className="w-6 h-6 text-indigo-600" />
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.projects.map((project, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.split(',').slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-white text-gray-600 rounded text-xs"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BentoBoxTemplate;
