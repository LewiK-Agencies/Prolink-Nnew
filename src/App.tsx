import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import ResumeForm from './components/ResumeForm';
import PreviewPage from './components/PreviewPage';
import PaymentPage from './components/PaymentPage';
import DownloadPage from './components/DownloadPage';
import { hasCompletedPayment, setPaymentCompleted, validateDownloadToken, loadResumeData, loadCustomization } from './utils/storage';

type AppPage = 'home' | 'form' | 'preview' | 'payment' | 'download';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're on the /download route
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    console.log('App: Route check', { path, token });

    if (path === '/download' || path === '/download/') {
      // User is trying to access download page
      if (!token) {
        console.error('App: No token provided in URL, redirecting to home');
        setPaymentError('Access denied. Please complete payment first.');
        setCurrentPage('home');
        window.history.replaceState({}, '', '/');
        return;
      }

      // Validate the token from cookie
      const isValidToken = validateDownloadToken(token);
      const resumeData = loadResumeData();
      const customization = loadCustomization();

      console.log('App: Download page validation', {
        isValidToken,
        hasResumeData: !!resumeData,
        hasCustomization: !!customization
      });

      if (isValidToken && resumeData && customization) {
        // Valid token and data exists - allow access to download page
        console.log('App: Valid token and data, showing download page');
        setPaymentCompleted();
        setCurrentPage('download');
        // Clean up URL but keep the route
        window.history.replaceState({}, '', '/download');
      } else if (isValidToken && (!resumeData || !customization)) {
        // Valid token but missing data
        console.error('App: Valid token but missing resume data');
        setPaymentError('Resume data not found. Please create your resume again.');
        setCurrentPage('form');
        window.history.replaceState({}, '', '/');
      } else {
        // Invalid token
        console.error('App: Invalid token');
        setPaymentError('Invalid access token. Please complete payment again.');
        setCurrentPage('home');
        window.history.replaceState({}, '', '/');
      }
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full text-center">
              <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center transform hover:rotate-6 transition-transform">
                  <FileText className="w-12 h-12 text-blue-600" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Professional Resume Builder
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Create stunning resumes with our 4 professional templates. Customize colors, fonts, and download in PDF format.
              </p>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Fill Your Information</h3>
                      <p className="text-blue-100 text-sm">Add your personal details, work experience, education, and more</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Choose Template</h3>
                      <p className="text-blue-100 text-sm">Select from 4 beautiful templates and customize colors</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Make Payment</h3>
                      <p className="text-blue-100 text-sm">Secure payment to unlock all templates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Download PDFs</h3>
                      <p className="text-blue-100 text-sm">Get all 4 templates as PDF files instantly</p>
                    </div>
                  </div>
                </div>
              </div>
              {paymentError && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="font-medium">{paymentError}</p>
                </div>
              )}
              <button
                onClick={() => {
                  setCurrentPage('form');
                  setPaymentError(null);
                }}
                className="px-8 py-4 bg-white text-blue-600 text-lg font-bold rounded-xl hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                Start Building Your Resume
              </button>
            </div>
          </div>
        );

      case 'form':
        return <ResumeForm onComplete={() => setCurrentPage('preview')} />;

      case 'preview':
        return (
          <PreviewPage
            onBack={() => setCurrentPage('form')}
            onProceedToPayment={() => {
              if (hasCompletedPayment()) {
                setCurrentPage('download');
              } else {
                setCurrentPage('payment');
              }
            }}
          />
        );

      case 'payment':
        return <PaymentPage onBack={() => setCurrentPage('preview')} />;

      case 'download':
        return <DownloadPage onHome={() => setCurrentPage('home')} />;

      default:
        return null;
    }
  };

  return <div className="min-h-screen">{renderPage()}</div>;
}

export default App;