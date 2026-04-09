import React from 'react';
import { Terminal } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  if (dateString.toLowerCase() === 'present') return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const TerminalTemplate = ({ data }) => {
  return (
    <div className="min-h-screen bg-black p-8 font-mono text-sm">
      <div className="max-w-5xl mx-auto bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-xs">resume.sh</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 space-y-4 text-green-400">
          {/* Header */}
          <div className="space-y-1">
            <div className="text-gray-500">$ cat header.txt</div>
            <div className="text-cyan-400 text-2xl font-bold">
              {data.personalInfo?.name || 'Your Name'}
            </div>
            <div className="text-yellow-400">
              {data.personalInfo?.title || 'Professional Title'}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <div className="text-gray-500">$ cat contact.txt</div>
            <div className="space-y-1">
              {data.contact?.email && (
                <div>
                  <span className="text-purple-400">email:</span> {data.contact.email}
                </div>
              )}
              {data.contact?.phone && (
                <div>
                  <span className="text-purple-400">phone:</span> {data.contact.phone}
                </div>
              )}
              {data.contact?.location && (
                <div>
                  <span className="text-purple-400">location:</span> {data.contact.location}
                </div>
              )}
              {data.contact?.github && (
                <div>
                  <span className="text-purple-400">github:</span>{' '}
                  <a href={data.contact.github} className="text-blue-400 underline">
                    {data.contact.github}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          {data.personalInfo?.summary && (
            <div className="space-y-1">
              <div className="text-gray-500">$ cat summary.txt</div>
              <div className="text-gray-300">{data.personalInfo.summary}</div>
            </div>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <div className="space-y-3">
              <div className="text-gray-500">$ cat experience.txt</div>
              {data.experience.map((exp, idx) => (
                <div key={idx} className="pl-4 border-l-2 border-green-700 space-y-1">
                  <div className="text-cyan-400 font-bold">{exp.position}</div>
                  <div className="text-yellow-400">{exp.company}</div>
                  <div className="text-gray-500 text-xs">
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </div>
                  {exp.description && (
                    <div className="text-gray-300 space-y-1 mt-2">
                      {exp.description.split('\n').map((item, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-green-400">→</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <div className="space-y-2">
              <div className="text-gray-500">$ ls skills/</div>
              <div className="space-y-2">
                {data.skills.map((skillGroup, idx) => (
                  <div key={idx} className="pl-4">
                    <span className="text-purple-400">{skillGroup.category}/</span>
                    <div className="pl-4 text-gray-300">
                      {skillGroup.items?.join(' | ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <div className="space-y-3">
              <div className="text-gray-500">$ cat education.txt</div>
              {data.education.map((edu, idx) => (
                <div key={idx} className="pl-4 border-l-2 border-blue-700 space-y-1">
                  <div className="text-cyan-400 font-bold">{edu.degree}</div>
                  <div className="text-yellow-400">{edu.institution}</div>
                  <div className="text-gray-500 text-xs">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                  {edu.gpa && (
                    <div className="text-gray-300">GPA: {edu.gpa}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <div className="space-y-3">
              <div className="text-gray-500">$ ls projects/</div>
              {data.projects.map((project, idx) => (
                <div key={idx} className="pl-4 space-y-1">
                  <div className="text-cyan-400">📁 {project.name}</div>
                  {project.description && (
                    <div className="text-gray-300 pl-4">{project.description}</div>
                  )}
                  {project.technologies && (
                    <div className="text-purple-400 pl-4 text-xs">
                      [{project.technologies}]
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {data.certifications?.length > 0 && (
            <div className="space-y-2">
              <div className="text-gray-500">$ cat certifications.txt</div>
              <div className="space-y-1">
                {data.certifications.map((cert, idx) => (
                  <div key={idx} className="pl-4 text-gray-300">
                    <span className="text-green-400">✓</span> {cert.name}
                    {cert.issuer && <span className="text-purple-400"> - {cert.issuer}</span>}
                    {cert.date && (
                      <span className="text-gray-500 text-xs"> ({formatDate(cert.date)})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cursor */}
          <div className="flex items-center gap-2 pt-4">
            <span className="text-gray-500">$</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalTemplate;
