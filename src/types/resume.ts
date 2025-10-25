export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  professionalTitle?: string;
  photo?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  workExperience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  references: Reference[];
}

export interface ResumeCustomization {
  template: 'modern' | 'professional' | 'creative' | 'minimal';
  primaryColor: string;
  fontFamily: string;
}

export const DEFAULT_COLORS = [
  '#1e40af',
  '#059669',
  '#dc2626',
  '#7c3aed',
  '#ea580c',
  '#0891b2',
  '#4338ca',
  '#be123c'
];

export const FONT_OPTIONS = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Roboto', value: 'Roboto, sans-serif' },
  { name: 'Open Sans', value: '"Open Sans", sans-serif' },
  { name: 'Lato', value: 'Lato, sans-serif' },
  { name: 'Playfair Display', value: '"Playfair Display", serif' },
  { name: 'Merriweather', value: 'Merriweather, serif' }
];
