import React from 'react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  primaryColor: string;
  fontFamily: string;
}

const MinimalTemplate: React.FC<TemplateProps> = ({ data, primaryColor, fontFamily }) => {
  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    return `${month}/${year}`;
  };

  return (
    <div style={{ fontFamily }} className="bg-white w-full min-h-[297mm] p-12">
      <div className="mb-8 text-center">
        {data.personalInfo.photo && (
          <img
            src={data.personalInfo.photo}
            alt={data.personalInfo.fullName}
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border"
            style={{ borderColor: primaryColor }}
          />
        )}
        <h1 className="text-5xl font-light mb-2 tracking-tight" style={{ color: primaryColor }}>
          {data.personalInfo.fullName}
        </h1>
        {data.personalInfo.professionalTitle && (
          <p className="text-lg text-gray-600 mb-4 tracking-wide">{data.personalInfo.professionalTitle}</p>
        )}
        <div className="flex justify-center gap-6 text-sm text-gray-600">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </div>

      {data.professionalSummary && (
        <div className="mb-10">
          <div className="h-px mb-4" style={{ backgroundColor: primaryColor }} />
          <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            {data.professionalSummary}
          </p>
        </div>
      )}

      {data.workExperience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs uppercase tracking-widest font-semibold mb-4 text-center" style={{ color: primaryColor }}>
            Experience
          </h2>
          <div className="h-px mb-6" style={{ backgroundColor: primaryColor }} />
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-medium text-gray-900">{exp.jobTitle}</h3>
                <span className="text-xs text-gray-500 tracking-wide">
                  {formatDate(exp.startDate)} - {exp.current ? 'PRESENT' : formatDate(exp.endDate)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {exp.company} <span className="text-gray-400">|</span> {exp.location}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs uppercase tracking-widest font-semibold mb-4 text-center" style={{ color: primaryColor }}>
            Education
          </h2>
          <div className="h-px mb-6" style={{ backgroundColor: primaryColor }} />
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                <span className="text-xs text-gray-500 tracking-wide">{formatDate(edu.graduationDate)}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                {edu.institution} <span className="text-gray-400">|</span> {edu.location}
              </p>
              {edu.description && <p className="text-sm text-gray-600">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs uppercase tracking-widest font-semibold mb-4 text-center" style={{ color: primaryColor }}>
            Certifications
          </h2>
          <div className="h-px mb-6" style={{ backgroundColor: primaryColor }} />
          <div className="grid grid-cols-2 gap-4">
            {data.certifications.map((cert) => (
              <div key={cert.id}>
                <h3 className="font-medium text-gray-900">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
                <p className="text-xs text-gray-500">{formatDate(cert.date)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.references.length > 0 && (
        <div>
          <h2 className="text-xs uppercase tracking-widest font-semibold mb-4 text-center" style={{ color: primaryColor }}>
            References
          </h2>
          <div className="h-px mb-6" style={{ backgroundColor: primaryColor }} />
          <div className="grid grid-cols-2 gap-6">
            {data.references.map((ref) => (
              <div key={ref.id} className="text-sm">
                <p className="font-medium text-gray-900">{ref.name}</p>
                <p className="text-gray-600">{ref.title}</p>
                <p className="text-gray-600">{ref.company}</p>
                <p className="text-xs text-gray-500 mt-1">{ref.email}</p>
                <p className="text-xs text-gray-500">{ref.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
