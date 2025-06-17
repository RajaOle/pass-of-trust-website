
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AdditionalTermsOfUse = () => {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Additional Terms of Use</h1>
          
          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">ADDITIONAL COMMUNITY GUIDELINES</h2>
              <p className="leading-relaxed mb-4">
                These Additional Terms of Use supplement the main Terms of Use and provide specific guidelines for community participation and content creation within the Goodpass platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">CONTENT STANDARDS</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Prohibited Content</h3>
                <p className="leading-relaxed mb-4">
                  Users must not post content that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contains false, misleading, or defamatory information</li>
                  <li>Violates privacy rights of individuals</li>
                  <li>Includes hate speech or discriminatory language</li>
                  <li>Contains spam, promotional content, or unsolicited advertisements</li>
                  <li>Infringes on intellectual property rights</li>
                  <li>Includes malicious code or harmful software</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">REPORTING STANDARDS</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Accuracy Requirements</h3>
                <p className="leading-relaxed mb-4">
                  All reports submitted to the platform must be:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Based on factual information and direct experience</li>
                  <li>Supported by appropriate documentation when required</li>
                  <li>Free from personal bias or emotional language</li>
                  <li>Relevant to financial conduct and creditworthiness</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">VERIFICATION PROCESS</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Identity Verification</h3>
                <p className="leading-relaxed mb-4">
                  To maintain platform integrity, users may be required to complete identity verification through:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Government-issued identification documents</li>
                  <li>Email and phone number verification</li>
                  <li>Address confirmation</li>
                  <li>Social media profile verification</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">DISPUTE RESOLUTION</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Reporting Disputes</h3>
                <p className="leading-relaxed mb-4">
                  If you believe a report about you is inaccurate or unfair, you may:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Contact our support team with evidence of inaccuracy</li>
                  <li>Request mediation between parties involved</li>
                  <li>Provide counter-documentation to support your position</li>
                  <li>Request temporary suspension of the disputed report during review</li>
                </ul>
                
                <h3 className="text-lg font-medium text-gray-900 mt-6">Resolution Timeline</h3>
                <p className="leading-relaxed mb-4">
                  We aim to resolve disputes within 14 business days of receiving a complete dispute request with supporting documentation.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">SCORE CALCULATION</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Scoring Methodology</h3>
                <p className="leading-relaxed mb-4">
                  Your Goodpass score is calculated based on:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment history and timeliness (40%)</li>
                  <li>Amount of credit utilized (30%)</li>
                  <li>Length of credit relationships (15%)</li>
                  <li>Types of credit accounts (10%)</li>
                  <li>Community feedback and ratings (5%)</li>
                </ul>
                
                <h3 className="text-lg font-medium text-gray-900 mt-6">Score Updates</h3>
                <p className="leading-relaxed mb-4">
                  Scores are updated monthly, with significant changes reflected within 7 business days of verified report submission.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">DATA RETENTION</h2>
              <p className="leading-relaxed mb-4">
                We retain user data and reports according to the following schedule:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Positive reports: Retained indefinitely unless user requests removal</li>
                <li>Negative reports: Retained for 7 years from date of resolution</li>
                <li>Account information: Retained for 2 years after account closure</li>
                <li>Communication records: Retained for 3 years</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">COMPLIANCE REQUIREMENTS</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Regulatory Compliance</h3>
                <p className="leading-relaxed mb-4">
                  Goodpass operates in compliance with applicable financial services regulations, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal Data Protection Act (PDPA) of Singapore</li>
                  <li>Anti-Money Laundering (AML) requirements</li>
                  <li>Know Your Customer (KYC) regulations</li>
                  <li>Consumer protection laws</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">ENFORCEMENT ACTIONS</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Violation Consequences</h3>
                <p className="leading-relaxed mb-4">
                  Violations of these Additional Terms may result in:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Warning notices and educational resources</li>
                  <li>Temporary suspension of reporting privileges</li>
                  <li>Permanent account suspension</li>
                  <li>Legal action for severe violations</li>
                  <li>Referral to appropriate authorities when required</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">UPDATES TO ADDITIONAL TERMS</h2>
              <p className="leading-relaxed mb-4">
                These Additional Terms of Use may be updated periodically to reflect changes in our services, legal requirements, or community needs. Users will be notified of significant changes through:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email notifications to registered users</li>
                <li>In-app notifications</li>
                <li>Updates posted on our website</li>
                <li>Community announcements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="leading-relaxed mb-4">
                For questions about these Additional Terms of Use or to report violations, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">GoodPass Support Team</p>
                <p>Email: support@goodpass.id</p>
                <p>160 Robinson Road, #14-04</p>
                <p>Singapore Business Federation Center</p>
                <p>Singapore (068914)</p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: January 2025
              </p>
            </div>
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
              <a href="https://goodpass.id/about-us/privacy-policy/" className="hover:text-blue-600 transition-colors text-center">
                Privacy Policy
              </a>
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

export default AdditionalTermsOfUse;
