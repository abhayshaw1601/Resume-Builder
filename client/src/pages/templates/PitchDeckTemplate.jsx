import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

const formatDate = (dateString) => {
  if (!dateString) return '';
  if (dateString.toLowerCase() === 'present') return 'Present';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const PitchDeckTemplate = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Title Slide
    {
      type: 'title',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <h1 className="text-6xl font-bold text-white mb-4">
            {data.personalInfo?.name || 'Your Name'}
          </h1>
          <p className="text-3xl text-indigo-200">
            {data.personalInfo?.title || 'Professional Title'}
          </p>
          {data.personalInfo?.summary && (
            <p className="text-xl text-white/80 max-w-3xl mt-8">
              {data.personalInfo.summary}
            </p>
          )}
        </div>
      )
    },
    // Contact Slide
    {
      type: 'contact',
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <h2 className="text-5xl font-bold text-white mb-8">Get In Touch</h2>
          <div className="space-y-6 text-2xl text-white">
            {data.contact?.email && (
              <div className="flex items-center gap-4">
                <MailIcon className="w-8 h-8" />
                <span>{data.contact.email}</span>
              </div>
            )}
            {data.contact?.phone && (
              <div className="flex items-center gap-4">
                <PhoneIcon className="w-8 h-8" />
                <span>{data.contact.phone}</span>
              </div>
            )}
            {data.contact?.location && (
              <div className="flex items-center gap-4">
                <MapPinIcon className="w-8 h-8" />
                <span>{data.contact.location}</span>
              </div>
            )}
          </div>
        </div>
      )
    }
  ];

  // Add Experience Slides
  if (data.experience?.length > 0) {
    slides.push({
      type: 'experience',
      content: (
        <div className="flex flex-col h-full p-16">
          <h2 className="text-5xl font-bold text-white mb-12">Experience</h2>
          <div className="space-y-8 overflow-y-auto">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-3xl font-semibold text-white mb-2">
                  {exp.position}
                </h3>
                <p className="text-2xl text-indigo-200 mb-2">{exp.company}</p>
                <p className="text-lg text-white/70 mb-4">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </p>
                {exp.description && (
                  <ul className="space-y-2 text-white/90">
                    {exp.description.split('\n').slice(0, 3).map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-indigo-300">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    });
  }

  // Add Skills Slide
  if (data.skills?.length > 0) {
    slides.push({
      type: 'skills',
      content: (
        <div className="flex flex-col h-full p-16">
          <h2 className="text-5xl font-bold text-white mb-12 text-center">Skills & Expertise</h2>
          <div className="grid grid-cols-2 gap-8 flex-1">
            {data.skills.map((skillGroup, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
                <h3 className="text-3xl font-semibold text-indigo-200 mb-6">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items?.map((skill, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-white/20 text-white rounded-lg text-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    });
  }

  // Add Education Slide
  if (data.education?.length > 0) {
    slides.push({
      type: 'education',
      content: (
        <div className="flex flex-col items-center justify-center h-full p-16">
          <h2 className="text-5xl font-bold text-white mb-12">Education</h2>
          <div className="space-y-8 max-w-4xl">
            {data.education.map((edu, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
                <h3 className="text-3xl font-semibold text-white mb-2">
                  {edu.degree}
                </h3>
                <p className="text-2xl text-indigo-200 mb-2">{edu.institution}</p>
                <p className="text-lg text-white/70">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
                {edu.gpa && (
                  <p className="text-xl text-white/90 mt-4">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )
    });
  }

  // Add Projects Slide
  if (data.projects?.length > 0) {
    slides.push({
      type: 'projects',
      content: (
        <div className="flex flex-col h-full p-16">
          <h2 className="text-5xl font-bold text-white mb-12 text-center">Projects</h2>
          <div className="grid grid-cols-2 gap-6 overflow-y-auto">
            {data.projects.map((project, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {project.name}
                </h3>
                {project.description && (
                  <p className="text-white/80 mb-4">{project.description}</p>
                )}
                {project.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.split(',').map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-500/50 text-white rounded text-sm"
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
      )
    });
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Slide Container - 16:9 Aspect Ratio */}
        <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-2xl overflow-hidden"
             style={{ aspectRatio: '16/9' }}>
          {/* Slide Content */}
          <div className="absolute inset-0">
            {slides[currentSlide]?.content}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition backdrop-blur-sm"
            disabled={currentSlide === 0}
          >
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition backdrop-blur-sm"
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRightIcon className="w-6 h-6 text-white" />
          </button>

          {/* Slide Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition ${
                  idx === currentSlide ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Slide Number */}
          <div className="absolute top-8 right-8 text-white/60 text-lg">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex justify-center gap-4">
            {slides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`px-6 py-2 rounded-lg transition ${
                  idx === currentSlide
                    ? 'bg-white text-indigo-900 font-semibold'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {slide.type.charAt(0).toUpperCase() + slide.type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeckTemplate;
