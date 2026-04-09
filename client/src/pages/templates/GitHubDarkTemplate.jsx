import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon, Code2Icon, DatabaseIcon, ServerIcon, CpuIcon } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  if (dateString.toLowerCase() === 'present') return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const GitHubDarkTemplate = ({ data }) => {
  const techIcons = {
    frontend: Code2Icon,
    backend: ServerIcon,
    database: DatabaseIcon,
    other: CpuIcon
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Left Sidebar */}
        <div className="w-80 flex-shrink-0 space-y-6">
          {/* Contact Info */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-neon-green text-xl font-bold mb-4 border-b border-neon-green pb-2">
              Contact
            </h2>
            <div className="space-y-3 text-sm">
              {data.contact?.email && (
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4 text-neon-green" />
                  <span className="break-all">{data.contact.email}</span>
                </div>
              )}
              {data.contact?.phone && (
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-neon-green" />
                  <span>{data.contact.phone}</span>
                </div>
              )}
              {data.contact?.location && (
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4 text-neon-green" />
                  <span>{data.contact.location}</span>
                </div>
              )}
              {data.contact?.linkedin && (
                <div className="flex items-center gap-2">
                  <GlobeIcon className="w-4 h-4 text-neon-green" />
                  <a href={data.contact.linkedin} className="hover:text-neon-green transition">
                    LinkedIn
                  </a>
                </div>
              )}
              {data.contact?.github && (
                <div className="flex items-center gap-2">
                  <GlobeIcon className="w-4 h-4 text-neon-green" />
                  <a href={data.contact.github} className="hover:text-neon-green transition">
                    GitHub
                  </a>
                </div>
              )}
              {data.contact?.website && (
                <div className="flex items-center gap-2">
                  <GlobeIcon className="w-4 h-4 text-neon-green" />
                  <a href={data.contact.website} className="hover:text-neon-green transition">
                    Website
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <h2 className="text-neon-green text-xl font-bold mb-4 border-b border-neon-green pb-2">
              Tech Stack
            </h2>
            <div className="space-y-4">
              {data.skills?.map((skillGroup, idx) => {
                const IconComponent = techIcons[skillGroup.category?.toLowerCase()] || CpuIcon;
                return (
                  <div key={idx}>
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="w-4 h-4 text-neon-green" />
                      <h3 className="text-sm font-semibold text-slate-300">
                        {skillGroup.category}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items?.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-slate-700 text-xs rounded border border-slate-600 hover:border-neon-green transition"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Header */}
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <h1 className="text-4xl font-bold text-neon-green mb-2">
              {data.personalInfo?.name || 'Your Name'}
            </h1>
            <p className="text-xl text-slate-300 mb-4">
              {data.personalInfo?.title || 'Professional Title'}
            </p>
            {data.personalInfo?.summary && (
              <p className="text-slate-400 leading-relaxed">
                {data.personalInfo.summary}
              </p>
            )}
          </div>

          {/* Experience */}
          {data.experience?.length > 0 && (
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-neon-green mb-6 border-b border-neon-green pb-2">
                Experience
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="border-l-2 border-slate-700 pl-4 hover:border-neon-green transition">
                    <h3 className="text-lg font-semibold text-slate-100">
                      {exp.position}
                    </h3>
                    <p className="text-neon-green font-medium">{exp.company}</p>
                    <p className="text-sm text-slate-400 mb-3">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </p>
                    {exp.description && (
                      <ul className="space-y-2 text-slate-300 text-sm">
                        {exp.description.split('\n').map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-neon-green">▹</span>
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

          {/* Projects */}
          {data.projects?.length > 0 && (
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <h2 className="text-2xl font-bold text-neon-green mb-6 border-b border-neon-green pb-2">
                Projects
              </h2>
              <div className="space-y-6">
                {data.projects.map((project, idx) => (
                  <div key={idx} className="border-l-2 border-slate-700 pl-4 hover:border-neon-green transition">
                    <h3 className="text-lg font-semibold text-slate-100">
                      {project.name}
                    </h3>
                    {project.description && (
                      <p className="text-slate-300 text-sm mt-2">
                        {project.description}
                      </p>
                    )}
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.technologies.split(',').map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-slate-700 text-xs rounded border border-slate-600 text-neon-green"
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

      <style jsx>{`
        .text-neon-green {
          color: #00ff88;
        }
        .border-neon-green {
          border-color: #00ff88;
        }
        .hover\:border-neon-green:hover {
          border-color: #00ff88;
        }
        .hover\:text-neon-green:hover {
          color: #00ff88;
        }
      `}</style>
    </div>
  );
};

export default GitHubDarkTemplate;
