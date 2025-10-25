import * as React from 'react';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Users } from 'lucide-react';
import { ResumeData } from '../../types/resume';

interface TemplateProps {
  data: ResumeData;
  primaryColor: string;
  fontFamily: string;
}

const CreativeTemplate: React.FC<TemplateProps> = ({ data, primaryColor, fontFamily }) => {
  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    return `${month}/${year}`;
  };

  return (
    <div style={{ fontFamily }} className="bg-white w-full min-h-[297mm]">
      <div className="p-8" style={{ backgroundColor: `${primaryColor}15` }}>
        <div className="flex gap-6 items-start">
          {data.personalInfo.photo && (
            <img
              src={data.personalInfo.photo}
              alt={data.personalInfo.fullName}
              className="w-28 h-28 rounded-2xl object-cover shadow-lg border-4 border-white"
            />
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-2" style={{ color: primaryColor }}>
              {data.personalInfo.fullName}
            </h1>
            {data.personalInfo.professionalTitle && (
              <p className="text-2xl text-gray-700 mb-4 italic">{data.personalInfo.professionalTitle}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                <Mail className="w-4 h-4" style={{ color: primaryColor }} />
                <span className="text-gray-700">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                <Phone className="w-4 h-4" style={{ color: primaryColor }} />
                <span className="text-gray-700">{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
                <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
                <span className="text-gray-700">{data.personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {data.professionalSummary && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                <Briefcase className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>About Me</h2>
            </div>
            <p className="text-gray-700 leading-relaxed ml-13">{data.professionalSummary}</p>
          </div>
        )}

        {data.workExperience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                <Briefcase className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>Experience</h2>
            </div>
            {data.workExperience.map((exp, index) => (
              <div key={exp.id} className="ml-13 mb-4 relative">
                {index < data.workExperience.length - 1 && (
                  <div className="absolute left-0 top-8 bottom-0 w-0.5" style={{ backgroundColor: `${primaryColor}30` }} />
                )}
                <div className="pl-6 relative">
                  <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: primaryColor }} />
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h3>
                    <span className="text-sm px-3 py-1 rounded-full text-white whitespace-nowrap ml-2" style={{ backgroundColor: primaryColor }}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium mb-2">{exp.company} | {exp.location}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {data.education.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                <GraduationCap className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>Education</h2>
            </div>
            {data.education.map((edu) => (
              <div key={edu.id} className="ml-13 mb-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-2">{formatDate(edu.graduationDate)}</span>
                </div>
                <p className="text-gray-700 font-medium">{edu.institution} | {edu.location}</p>
                {edu.description && <p className="text-gray-600 text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {data.certifications.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                  <Award className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>Certifications</h2>
              </div>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="ml-13 mb-3">
                  <h3 className="font-bold text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-700">{cert.issuer}</p>
                  <p className="text-sm text-gray-600">{formatDate(cert.date)}</p>
                </div>
              ))}
            </div>
          )}

          {data.references.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${primaryColor}20` }}>
                  <Users className="w-5 h-5" style={{ color: primaryColor }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>References</h2>
              </div>
              {data.references.map((ref) => (
                <div key={ref.id} className="ml-13 mb-3 text-sm">
                  <p className="font-bold text-gray-900">{ref.name}</p>
                  <p className="text-gray-700">{ref.title}</p>
                  <p className="text-gray-700">{ref.company}</p>
                  <p className="text-gray-600 text-xs">{ref.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
