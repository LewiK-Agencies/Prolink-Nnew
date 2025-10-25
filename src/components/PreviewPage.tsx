import React, { useState, useEffect } from 'react';
import { ArrowLeft, Palette } from 'lucide-react';
import { ResumeData, ResumeCustomization, DEFAULT_COLORS, FONT_OPTIONS } from '../types/resume';
import { loadResumeData, loadCustomization, saveCustomization } from '../utils/storage';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

interface PreviewPageProps {
  onBack: () => void;
  onProceedToPayment: () => void;
}

const PreviewPage: React.FC<PreviewPageProps> = ({ onBack, onProceedToPayment }) => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [customization, setCustomization] = useState<ResumeCustomization>({
    template: 'modern',
    primaryColor: DEFAULT_COLORS[0],
    fontFamily: FONT_OPTIONS[0].value
  });
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    const data = loadResumeData();
    const savedCustomization = loadCustomization();
    if (data) setResumeData(data);
    if (savedCustomization) setCustomization(savedCustomization);
  }, []);

  const handleCustomizationChange = (updates: Partial<ResumeCustomization>) => {
    const newCustomization = { ...customization, ...updates };
    setCustomization(newCustomization);
    saveCustomization(newCustomization);
  };

  const renderTemplate = () => {
    if (!resumeData) return null;

    const props = {
      data: resumeData,
      primaryColor: customization.primaryColor,
      fontFamily: customization.fontFamily
    };

    switch (customization.template) {
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'professional':
        return <ProfessionalTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'minimal':
        return <MinimalTemplate {...props} />;
      default:
        return <ModernTemplate {...props} />;
    }
  };

  const templates = [
    { id: 'modern', name: 'Modern' },
    { id: 'professional', name: 'Professional' },
    { id: 'creative', name: 'Creative' },
    { id: 'minimal', name: 'Minimal' }
  ];

  if (!resumeData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading resume data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors self-start"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Edit</span>
            </button>

            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleCustomizationChange({ template: template.id as any })}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      customization.template === template.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {template.name}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Palette className="w-5 h-5" />
                    <span className="hidden md:inline font-medium">Colors</span>
                  </button>

                  {showColorPicker && (
                    <div className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-xl border border-gray-200 z-20 w-64">
                      <p className="text-sm font-medium text-gray-700 mb-3">Primary Color</p>
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {DEFAULT_COLORS.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleCustomizationChange({ primaryColor: color })}
                            className={`w-12 h-12 rounded-lg transition-all ${
                              customization.primaryColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <p className="text-sm font-medium text-gray-700 mb-3">Font Family</p>
                      <select
                        value={customization.fontFamily}
                        onChange={(e) => handleCustomizationChange({ fontFamily: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {FONT_OPTIONS.map((font) => (
                          <option key={font.value} value={font.value}>
                            {font.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <button
                  onClick={onProceedToPayment}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md whitespace-nowrap"
                >
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden" style={{ minHeight: '297mm' }}>
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
