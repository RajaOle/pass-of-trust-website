
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <img alt="Goodpass" className="h-6 sm:h-8 w-auto" src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" />
            </Link>
            <Link to="/">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-700">
            <div className="text-sm text-gray-500 mb-6">
              Last Modified 26 October 2021
            </div>

            <section>
              <p className="leading-relaxed mb-6">
                At Goodpass Pte. Ltd ("Goodpass"), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform and services.
              </p>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Personal Information</h3>
              <p className="leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li className="leading-relaxed">Register for an account</li>
                <li className="leading-relaxed">Make reports or inquiries</li>
                <li className="leading-relaxed">Contact us for support</li>
                <li className="leading-relaxed">Subscribe to our newsletters or communications</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Usage Information</h3>
              <p className="leading-relaxed mb-6">
                We automatically collect certain information about your device and how you interact with our platform, including IP address, browser type, operating system, access times, and pages viewed.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li className="leading-relaxed">Provide and maintain our services</li>
                <li className="leading-relaxed">Process credit reports and inquiries</li>
                <li className="leading-relaxed">Verify the accuracy of reported information</li>
                <li className="leading-relaxed">Communicate with you about our services</li>
                <li className="leading-relaxed">Improve our platform and user experience</li>
                <li className="leading-relaxed">Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Information Sharing and Disclosure</h2>
              <p className="leading-relaxed mb-6">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li className="leading-relaxed">With authorized community reporters for verification purposes</li>
                <li className="leading-relaxed">When required by law or legal process</li>
                <li className="leading-relaxed">To protect our rights, property, or safety</li>
                <li className="leading-relaxed">With service providers who assist us in operating our platform</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Data Security</h2>
              <p className="leading-relaxed mb-6">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Your Rights</h2>
              <p className="leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li className="leading-relaxed">Right to access your personal information</li>
                <li className="leading-relaxed">Right to correct inaccurate information</li>
                <li className="leading-relaxed">Right to delete your personal information</li>
                <li className="leading-relaxed">Right to restrict processing of your information</li>
                <li className="leading-relaxed">Right to data portability</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Contact Us</h2>
              <p className="leading-relaxed mb-6">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700">
                  <strong>Goodpass Pte. Ltd</strong><br />
                  160 Robinson Road, #14-04 Singapore Business Federation Center<br />
                  Singapore (068914)
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 sm:py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col items-center lg:items-start space-y-4">
              <Link to="/">
                <img alt="Goodpass" className="h-6 sm:h-8 w-auto" src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" />
              </Link>
              <div className="text-center lg:text-left">
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                  160 Robinson Road, #14-04 Singapore Business Federation Center<br />
                  Singapore (068914)
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-sm text-gray-600">
              <Link to="/about-us/terms-of-use" className="hover:text-blue-600 transition-colors text-center">
                Terms of Use
              </Link>
              <Link to="/about-us/terms-of-use/additional-terms-of-use" className="hover:text-blue-600 transition-colors text-center">
                Additional Terms of Use
              </Link>
              <Link to="/about-us/privacy-policy" className="hover:text-blue-600 transition-colors text-center">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 text-center text-gray-500 text-xs sm:text-sm space-y-2">
            <p>Copyright © 2025 GoodPass</p>
            <p>Powered by GoodPass</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
