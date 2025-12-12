import React, { useState, useEffect } from 'react';
import { Home, MessageCircle, Download, CheckCircle2, Loader2, FileText } from 'lucide-react';
import { ResumeData, ResumeCustomization } from '../types/resume';
import { loadResumeData, loadCustomization, clearAllData } from '../utils/storage';
import { generatePDF } from '../utils/pdfGenerator';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

interface DownloadPageProps {
  onHome: () => void;
}

const DownloadPage: React.FC<DownloadPageProps> = ({ onHome }) => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [customization, setCustomization] = useState<ResumeCustomization | null>(null);
  const [downloadingTemplate, setDownloadingTemplate] = useState<string | null>(null);
  const [downloadedTemplates, setDownloadedTemplates] = useState<Set<string>>(new Set());
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const WHATSAPP_LINK = 'https://wa.me/+254706625195';

  useEffect(() => {
    console.log('DownloadPage: Loading resume data from localStorage');
    const data = loadResumeData();
    const savedCustomization = loadCustomization();

    console.log('DownloadPage: Data check', {
      hasResumeData: !!data,
      hasCustomization: !!savedCustomization,
      resumeDataKeys: data ? Object.keys(data) : [],
      customizationKeys: savedCustomization ? Object.keys(savedCustomization) : []
    });

    if (!data || !savedCustomization) {
      console.error('DownloadPage: Missing data!', {
        resumeData: !!data,
        customization: !!savedCustomization
      });
      setError('Resume data not found. Please create your resume first.');
      // Auto-redirect to home after 3 seconds
      setTimeout(() => {
        console.log('DownloadPage: Auto-redirecting to home due to missing data');
        onHome();
      }, 3000);
    } else {
      console.log('DownloadPage: Data loaded successfully');
      setResumeData(data);
      setCustomization(savedCustomization);
    }
  }, [onHome]);

  const handleDownload = async (templateId: string, templateName: string) => {
    if (!resumeData || !customization) return;

    setDownloadingTemplate(templateId);

    try {
      // Create a temporary container for PDF generation
      const tempContainer = document.createElement('div');
      tempContainer.id = `temp-template-${templateId}`;
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = '210mm';
      tempContainer.style.height = '297mm';
      tempContainer.style.backgroundColor = 'white';
      document.body.appendChild(tempContainer);

      // Find the template component
      const TemplateComponent = templates.find(t => t.id === templateId)?.component;
      if (!TemplateComponent) throw new Error('Template not found');

      // Render the template in the temporary container
      const { createRoot } = await import('react-dom/client');
      const root = createRoot(tempContainer);
      root.render(
        <TemplateComponent
          data={resumeData}
          primaryColor={customization.primaryColor}
          fontFamily={customization.fontFamily}
        />
      );

      // Wait for rendering to complete
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generate PDF
      await generatePDF(
        `temp-template-${templateId}`,
        `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_${templateName}_Resume.pdf`
      );

      // Clean up
      root.unmount();
      document.body.removeChild(tempContainer);

      setDownloadedTemplates(prev => new Set([...prev, templateId]));
      setShowNotification(true);

      // Check if all templates have been downloaded
      const newDownloadedTemplates = new Set([...downloadedTemplates, templateId]);
      if (newDownloadedTemplates.size === templates.length) {
        // All templates downloaded - clear localStorage after a delay
        setTimeout(() => {
          clearAllData();
          console.log('All templates downloaded. LocalStorage cleared.');
        }, 2000);
      }

      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setDownloadingTemplate(null);
    }
  };

  const templates = [
    { id: 'modern', name: 'Modern', component: ModernTemplate },
    { id: 'professional', name: 'Professional', component: ProfessionalTemplate },
    { id: 'creative', name: 'Creative', component: CreativeTemplate },
    { id: 'minimal', name: 'Minimal', component: MinimalTemplate }
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Data Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <p className="text-sm text-gray-500 mb-6">Redirecting to home in 3 seconds...</p>
          <button
            onClick={onHome}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            Go to Home Now
          </button>
        </div>
      </div>
    );
  }

  if (!resumeData || !customization) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {showNotification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6" />
            <div>
              <p className="font-bold text-lg">Download Successful!</p>
              <p className="text-sm text-green-100">All the best in your next job</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Resumes Are Ready!</h1>
            <p className="text-gray-600">Download all templates in PDF format</p>
          </div>
          <div className="flex gap-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Support</span>
            </a>
            <button
              onClick={onHome}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {templates.map(({ id, name }) => (
            <div key={id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">{name} Template</h2>
                <button
                  onClick={() => handleDownload(id, name)}
                  disabled={downloadingTemplate === id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${downloadedTemplates.has(id)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    } ${downloadingTemplate === id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {downloadingTemplate === id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Downloading...
                    </>
                  ) : downloadedTemplates.has(id) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Downloaded
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download
                    </>
                  )}
                </button>
              </div>
              <div className="p-4">
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-lg flex items-center justify-center">
                      <FileText className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium">{name} Template</p>
                    <p className="text-xs text-gray-400">Click download to generate PDF</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Need More Help?</h3>
          <p className="text-gray-600 mb-4">
            Our support team is here to help you with any questions or issues.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Support on WhatsApp
          </a>
        </div>
      </div>

    </div>
  );
};

export default DownloadPage;