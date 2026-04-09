import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon, HeartIcon, CoffeeIcon } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  if (dateString.toLowerCase() === 'present') return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const InfographicTemplate = ({ data }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {data.personalInfo?.name || 'Your Name'}
          </h1>
          <p className="text-xl text-indigo-600 mb-4">
            {data.personalInfo?.title || 'Professional Title'}
          </p>
          
          {/* Contact Icons */}
          <div className="flex justify-center flex-wrap gap-4 pt-4">
            {data.contact?.email && (
              <a href={`mailto:${data.contact.email}`} className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition">
                <MailIcon className="w-4 h-4" />
                <span className="text-sm">Email</span>
              </a>
            )}
            {data.contact?.phone && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
                <PhoneIcon className="w-4 h-4" />
                <span className="text-sm">{data.contact.phone}</span>
              </div>
            )}
            {data.contact?.linkedin && (
              <a href={data.contact.linkedin} className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition">
                <GlobeIcon className="w-4 h-4" />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
            {data.contact?.github && (
              <a href={data.contact.github} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition">
                <GlobeIcon className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </a>
            )}
          </div>

          {data.personalInfo?.summary && (
            <p className="text-gray-700 leading-relaxed pt-6 max-w-3xl mx-auto">
              {data.personalInfo.summary}
            </p>
          )}
        </header>

        {/* Skills with Progress Bars */}
        {data.skills?.length > 0 && (
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Skill Proficiency
            </h2>
            <div className="space-y-6">
              {data.skills.map((skillGroup, idx) => {
                const colors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-orange-500', 'bg-pink-500'];
                const bgColors = ['bg-blue-100', 'bg-purple-100', 'bg-green-100', 'bg-orange-100', 'bg-pink-100'];
                const color = colors[idx % colors.length];
                const bgColor = bgColors[idx % bgColors.length];
                
                return (
                  <div key={idx}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-3 h-3 rounded-full ${color}`}></div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {skillGroup.category}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {skillGroup.items?.map((skill, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">{skill}</span>
                            <span className="text-gray-500">{85 + (i * 3) % 15}%</span>
                          </div>
                          <div className={`w-full h-2 ${bgColor} rounded-full overflow-hidden`}>
                            <div
                              className={`h-full ${color} rounded-full transition-all duration-500`}
                              style={{ width: `${85 + (i * 3) % 15}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="border-l-4 border-indigo-500 pl-6 pb-6 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {exp.position}
                      </h3>
                      <p className="text-indigo-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <ul className="space-y-1 text-gray-700 text-sm">
                      {exp.description.split('\n').map((item, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-indigo-500">▸</span>
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

        {/* Education & Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {data.education?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-indigo-600 text-sm">{edu.institution}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {data.certifications?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Certifications
              </h2>
              <div className="space-y-3">
                {data.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {cert.name}
                      </h3>
                      {cert.issuer && (
                        <p className="text-xs text-gray-600">{cert.issuer}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer - 3 Column Layout for Interests/Links */}
        <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <HeartIcon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-semibold">Interests</h3>
              <p className="text-sm text-indigo-100">
                Technology, Innovation, Problem Solving
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <CoffeeIcon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-semibold">Hobbies</h3>
              <p className="text-sm text-indigo-100">
                Coding, Reading, Learning
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <GlobeIcon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-sm text-indigo-100">
                {data.contact?.location || 'Available Worldwide'}
              </p>
            </div>
          </div>
        </footer>

        {/* Tech Category Badges */}
        {data.skills?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Technical Categories
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.skills.map((skillGroup, idx) => {
                const badgeColors = [
                  'bg-blue-500',
                  'bg-purple-500',
                  'bg-green-500',
                  'bg-orange-500',
                  'bg-pink-500',
                  'bg-teal-500'
                ];
                const color = badgeColors[idx % badgeColors.length];
                
                return (
                  <div
                    key={idx}
                    className={`${color} text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition`}
                  >
                    {skillGroup.category}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfographicTemplate;
