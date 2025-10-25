import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { ResumeData, WorkExperience, Education, Certification, Reference } from '../types/resume';
import { saveResumeData, loadResumeData } from '../utils/storage';

interface ResumeFormProps {
  onComplete: () => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      professionalTitle: '',
      photo: ''
    },
    professionalSummary: '',
    workExperience: [],
    education: [],
    certifications: [],
    references: []
  });

  useEffect(() => {
    const savedData = loadResumeData();
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, photo: reader.result as string }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, photo: '' }
    }));
  };

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExp]
    }));
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: any) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeWorkExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      description: ''
    };
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      credentialId: ''
    };
    setFormData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const removeCertification = (id: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const addReference = () => {
    const newRef: Reference = {
      id: Date.now().toString(),
      name: '',
      title: '',
      company: '',
      email: '',
      phone: ''
    };
    setFormData(prev => ({
      ...prev,
      references: [...prev.references, newRef]
    }));
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.map(ref =>
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    }));
  };

  const removeReference = (id: string) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter(ref => ref.id !== id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveResumeData(formData);
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
          <div className="flex items-center gap-4">
            {formData.personalInfo.photo ? (
              <div className="relative">
                <img
                  src={formData.personalInfo.photo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Upload className="w-6 h-6 text-gray-400" />
              </label>
            )}
            <p className="text-sm text-gray-500">Upload a professional photo (optional)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={formData.personalInfo.fullName}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, fullName: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
            <input
              type="text"
              value={formData.personalInfo.professionalTitle}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, professionalTitle: e.target.value }
              }))}
              placeholder="e.g. Software Engineer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.personalInfo.email}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, email: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
            <input
              type="tel"
              required
              value={formData.personalInfo.phone}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, phone: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <input
              type="text"
              required
              value={formData.personalInfo.location}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, location: e.target.value }
              }))}
              placeholder="City, Country"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Summary</h2>
        <textarea
          value={formData.professionalSummary}
          onChange={(e) => setFormData(prev => ({ ...prev, professionalSummary: e.target.value }))}
          rows={5}
          placeholder="Write a brief summary of your professional background and key achievements..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
          <button
            type="button"
            onClick={addWorkExperience}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        {formData.workExperience.map((exp, index) => (
          <div key={exp.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Experience {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeWorkExperience(exp.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  value={exp.jobTitle}
                  onChange={(e) => updateWorkExperience(exp.id, 'jobTitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) => updateWorkExperience(exp.id, 'current', e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`current-${exp.id}`} className="ml-2 text-sm text-gray-700">
                  Currently working here
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateWorkExperience(exp.id, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Education</h2>
          <button
            type="button"
            onClick={addEducation}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        {formData.education.map((edu, index) => (
          <div key={edu.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Education {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Date</label>
                <input
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
          <button
            type="button"
            onClick={addCertification}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        {formData.certifications.map((cert, index) => (
          <div key={cert.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Certification {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeCertification(cert.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
                <input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Credential ID</label>
                <input
                  type="text"
                  value={cert.credentialId}
                  onChange={(e) => updateCertification(cert.id, 'credentialId', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">References</h2>
          <button
            type="button"
            onClick={addReference}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
        {formData.references.map((ref, index) => (
          <div key={ref.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">Reference {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeReference(ref.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={ref.name}
                  onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={ref.title}
                  onChange={(e) => updateReference(ref.id, 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  value={ref.company}
                  onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={ref.email}
                  onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={ref.phone}
                  onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center pb-8">
        <button
          type="submit"
          className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
        >
          Preview Resume
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;
