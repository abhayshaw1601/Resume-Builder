import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon, BriefcaseIcon, GraduationCapIcon, AwardIcon } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  if (dateString.toLowerCase() === 'present') return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const TimelineTemplate = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4 bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {data.personalInfo?.name || 'Your Name'}
          </h1>
          <p className="text-xl text-indigo-600">
            {data.personalInfo?.title || 'Professional Title'}
          </p>
          
          {/* Contact */}
          <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600 pt-4">
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
          </div>

          {data.personalInfo?.summary && (
            <p className="text-gray-700 leading-relaxed pt-4 max-w-3xl mx-auto">
              {data.personalInfo.summary}
            </p>
          )}
        </header>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-indigo-200 h-full"></div>

          {/* Experience Timeline */}
          {data.experience?.length > 0 && (
            <div className="space-y-12">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Professional Journey
              </h2>
              {data.experience.map((exp, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-8 ${
                    idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-indigo-600 font-medium mb-2">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-3">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </p>
                      {exp.description && (
                        <ul className={`space-y-1 text-sm text-gray-700 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          {exp.description.split('\n').map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative flex items-center justify-center w-2/12">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center z-10 shadow-lg">
                      <BriefcaseIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          )}

          {/* Education Timeline */}
          {data.education?.length > 0 && (
            <div className="space-y-12 mt-12">
              {data.education.map((edu, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-8 ${
                    idx % 2 === 0 ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}>
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-indigo-600 font-medium mb-2">{edu.institution}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                      {edu.gpa && (
                        <p className="text-sm text-gray-700 mt-2">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative flex items-center justify-center w-2/12">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center z-10 shadow-lg">
                      <GraduationCapIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications Timeline */}
          {data.certifications?.length > 0 && (
            <div className="space-y-12 mt-12">
              {data.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-8 ${
                    idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {cert.name}
                      </h3>
                      {cert.issuer && (
                        <p className="text-indigo-600 font-medium">{cert.issuer}</p>
                      )}
                      {cert.date && (
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDate(cert.date)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative flex items-center justify-center w-2/12">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center z-10 shadow-lg">
                      <AwardIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-5/12"></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills Section */}
        {data.skills?.length > 0 && (
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.skills.map((skillGroup, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
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
      </div>
    </div>
  );
};

export default TimelineTemplate;
