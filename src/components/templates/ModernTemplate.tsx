import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  primaryColor: string;
  fontFamily: string;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data, primaryColor, fontFamily }) => {
  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    return `${month}/${year}`;
  };

  return (
    <div style={{ fontFamily }} className="bg-white w-full min-h-[297mm] p-8">
      <div className="flex gap-6 mb-8">
        {data.personalInfo.photo && (
          <img
            src={data.personalInfo.photo}
            alt={data.personalInfo.fullName}
            className="w-32 h-32 rounded-full object-cover border-4"
            style={{ borderColor: primaryColor }}
          />
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
            {data.personalInfo.fullName}
          </h1>
          {data.personalInfo.professionalTitle && (
            <p className="text-xl text-gray-600 mb-4">{data.personalInfo.professionalTitle}</p>
          )}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" style={{ color: primaryColor }} />
              {data.personalInfo.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" style={{ color: primaryColor }} />
              {data.personalInfo.phone}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
              {data.personalInfo.location}
            </div>
          </div>
        </div>
      </div>

      {data.professionalSummary && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.professionalSummary}</p>
        </div>
      )}

      {data.workExperience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
            Work Experience
          </h2>
          {data.workExperience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold" style={{ color: primaryColor }}>
                  {exp.jobTitle}
                </h3>
                <span className="text-sm text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-1">{exp.company} | {exp.location}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-semibold" style={{ color: primaryColor }}>
                  {edu.degree}
                </h3>
                <span className="text-sm text-gray-600">{formatDate(edu.graduationDate)}</span>
              </div>
              <p className="text-gray-700 font-medium mb-1">{edu.institution} | {edu.location}</p>
              {edu.description && <p className="text-gray-600 text-sm">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {data.certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3 pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
            Certifications
          </h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold" style={{ color: primaryColor }}>{cert.name}</h3>
                  <p className="text-sm text-gray-700">{cert.issuer}</p>
                  {cert.credentialId && <p className="text-sm text-gray-600">ID: {cert.credentialId}</p>}
                </div>
                <span className="text-sm text-gray-600">{formatDate(cert.date)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {data.references.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-3 pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
            References
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {data.references.map((ref) => (
              <div key={ref.id} className="text-sm">
                <p className="font-semibold" style={{ color: primaryColor }}>{ref.name}</p>
                <p className="text-gray-700">{ref.title}</p>
                <p className="text-gray-700">{ref.company}</p>
                <p className="text-gray-600">{ref.email}</p>
                <p className="text-gray-600">{ref.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
