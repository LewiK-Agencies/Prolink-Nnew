import React, { useEffect } from 'react';
import { CreditCard, ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { generateCheckoutToken, setCheckoutState } from '../utils/storage';

// Domain constant for easy changes


interface PaymentPageProps {
  onBack: () => void;
}

// Extend Window interface for PayHero
declare global {
  interface Window {
    PayHero: {
      init: (config: any) => void;
    };
  }
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onBack }) => {
  useEffect(() => {
    // Load resume data for customer details
    const data = localStorage.getItem('resumeBuilderData');

    // Initialize PayHero immediately when page loads
    const initializePayHero = () => {
      if (typeof window.PayHero !== 'undefined') {
        
        // Generate our own token and set checkout state
        const token = generateCheckoutToken();
        setCheckoutState('initiated');
        
        
        const amount = 1; // 1 KES for resume templates
        const DOMAIN = 'http://localhost:4173';
        const config = {
          paymentUrl: "https://app.payhero.co.ke/lipwa/2003",
          width: "100%",
          height: "100%",
          containerId: "payHero",
          channelID: 3429,
          amount: amount,
          phone: "", // Leave blank so user can enter their M-Pesa number
          name: data ? JSON.parse(data).personalInfo?.fullName || "Customer" : "Customer",
          reference: "CV payments",
          buttonName: `Pay Now KES ${amount}`,
          buttonColor: "#2563eb", // Blue color to match the app theme
          successUrl: `${DOMAIN}/?payment=success&token=${token}`,
          failedUrl: DOMAIN,
          callbackUrl: null
        };

        
        // Wait for the container to be rendered, then initialize PayHero
        setTimeout(() => {
          const container = document.getElementById('payHero');
          if (container) {
            
            // Initialize PayHero with the correct parameters
            window.PayHero.init(config);

            // Listen for payment events
            window.addEventListener('message', function(event) {
              // Filter out React DevTools messages
              if (event.data.source && event.data.source.includes('react-devtools')) {
                return;
              }
              
              if (event.data.paymentSuccess) {
                setCheckoutState('completed');
                // Redirect will be handled by successUrl
              }
            });

          }
        }, 100); // Small delay to ensure DOM is updated
      } else {
        // Retry after a short delay
        setTimeout(initializePayHero, 1000);
      }
    };
    
    initializePayHero();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Preview</span>
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-10 h-10" />
              <h1 className="text-3xl font-bold">Complete Your Purchase</h1>
            </div>
            <p className="text-blue-100 text-lg">
              Unlock all resume templates and download in PDF format
            </p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What You Get</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">4 Professional Templates</h3>
                    <p className="text-gray-600 text-sm">Access to Modern, Professional, Creative, and Minimal designs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Download All Templates</h3>
                    <p className="text-gray-600 text-sm">Download your resume in all 4 templates as PDF files</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Full Customization</h3>
                    <p className="text-gray-600 text-sm">Personalize colors and fonts to match your style</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Instant Download</h3>
                    <p className="text-gray-600 text-sm">Get immediate access after payment completion</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Secure Payment via PayHero</span>
              </div>
              <p className="text-center text-sm text-gray-500">
                Your payment is processed securely. We never store your payment information.
              </p>
            </div>

            <div id="payHero" className="w-full payhero-container"></div>

            <p className="text-center text-xs text-gray-500 mt-4">
              By proceeding, you agree to our terms of service and privacy policy
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact us for support
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;