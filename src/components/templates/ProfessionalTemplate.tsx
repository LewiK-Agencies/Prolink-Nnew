import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  primaryColor: string;
  fontFamily: string;
}

const ProfessionalTemplate: React.FC<TemplateProps> = ({ data, primaryColor, fontFamily }) => {
  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    return `${month}/${year}`;
  };

  return (
    <div style={{ fontFamily }} className="bg-white w-full min-h-[297mm] flex">
      <div className="w-1/3 p-6 text-white" style={{ backgroundColor: primaryColor }}>
        {data.personalInfo.photo && (
          <div className="mb-6">
            <img
              src={data.personalInfo.photo}
              alt={data.personalInfo.fullName}
              className="w-32 h-32 rounded-full object-cover border-4 border-white mx-auto"
            />
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-white/30">Contact</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="break-words">{data.personalInfo.email}</span>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{data.personalInfo.location}</span>
            </div>
          </div>
        </div>

        {data.certifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-white/30">Certifications</h2>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mb-3 text-sm">
                <p className="font-semibold">{cert.name}</p>
                <p className="text-white/80 text-xs">{cert.issuer}</p>
                <p className="text-white/70 text-xs">{formatDate(cert.date)}</p>
              </div>
            ))}
          </div>
        )}

        {data.references.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-3 pb-2 border-b-2 border-white/30">References</h2>
            {data.references.map((ref) => (
              <div key={ref.id} className="mb-3 text-xs">
                <p className="font-semibold">{ref.name}</p>
                <p className="text-white/80">{ref.title}</p>
                <p className="text-white/70">{ref.company}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
            {data.personalInfo.fullName}
          </h1>
          {data.personalInfo.professionalTitle && (
            <p className="text-xl text-gray-700 font-medium">{data.personalInfo.professionalTitle}</p>
          )}
        </div>

        {data.professionalSummary && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: primaryColor }}>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">{data.professionalSummary}</p>
          </div>
        )}

        {data.workExperience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: primaryColor }}>
              Work Experience
            </h2>
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-base font-bold text-gray-900">{exp.jobTitle}</h3>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-2">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 font-medium mb-1">{exp.company} | {exp.location}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 uppercase tracking-wide" style={{ color: primaryColor }}>
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-xs text-gray-600 whitespace-nowrap ml-2">{formatDate(edu.graduationDate)}</span>
                </div>
                <p className="text-sm text-gray-700 font-medium">{edu.institution} | {edu.location}</p>
                {edu.description && <p className="text-gray-600 text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
