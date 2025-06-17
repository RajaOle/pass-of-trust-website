
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, FileText, Search, TrendingUp, Lock } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img alt="Goodpass" className="h-6 sm:h-8 w-auto" src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a href="#report" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">
                Make a Report
              </a>
              <a href="#inquiries" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">
                Make Inquiries
              </a>
              <a href="#developers" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">
                Developers
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">
                Pricing
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600 text-sm xl:text-base">
                Login
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm xl:text-base">
                Sign Up
              </Button>
            </div>

            {/* Mobile menu button */}
            <button className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              <div className={`w-5 h-0.5 bg-gray-600 mb-1 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-gray-600 mb-1 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-5 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && <div className="lg:hidden py-4 border-t border-gray-100 bg-white">
              <div className="flex flex-col space-y-3">
                <a href="#report" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-2 rounded-md hover:bg-gray-50">
                  Make a Report
                </a>
                <a href="#inquiries" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-2 rounded-md hover:bg-gray-50">
                  Make Inquiries
                </a>
                <a href="#developers" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-2 rounded-md hover:bg-gray-50">
                  Developers
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-2 rounded-md hover:bg-gray-50">
                  Pricing
                </a>
                <div className="flex flex-col space-y-2 pt-3 border-t border-gray-100">
                  <Button variant="ghost" className="text-gray-700 justify-start px-2">
                    Login
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white justify-start px-2">
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Build Your Financial
              <span className="text-blue-600 block mt-1">Reputation</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Goodpass creates a trusted community where friends and family can report loan commitments, 
              helping you build a verifiable financial reputation for better access to credit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 w-full sm:w-auto">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 px-6 sm:px-8 py-3 w-full sm:w-auto">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              How Goodpass Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Our peer-to-peer platform enables transparent financial reporting between trusted contacts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Make Reports</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Report loan commitments and repayment history with trusted friends, family members, or business partners.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Search className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Make Inquiries</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Check financial reputation and history before making lending decisions or entering partnerships.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Build Reputation</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Establish a verifiable track record that opens doors to better financial opportunities and trust.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Trusted by Communities Worldwide
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                Our platform is built on trust, transparency, and security. Every report is verified 
                and encrypted to protect your privacy while building your financial reputation.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Bank-level security and encryption</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Community-verified reports</span>
                </div>
                <div className="flex items-center">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-700 text-sm sm:text-base">Privacy-first approach</span>
                </div>
              </div>
            </div>
            <div className="text-center order-1 lg:order-2">
              <div className="relative inline-block">
                <img src="/lovable-uploads/Goodpass icon 3xxx.png" alt="Goodpass Security" className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
            Ready to Build Your Financial Reputation?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Join thousands of users who are already building trust through our community-based platform.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-3 w-full sm:w-auto max-w-sm">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col items-center lg:items-start space-y-4">
              <img alt="Goodpass" className="h-6 sm:h-8 w-auto" src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" />
              <div className="text-center lg:text-left">
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                  160 Robinson Road, #14-04 Singapore Business Federation Center<br />
                  Singapore (068914)
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 lg:space-x-8 text-sm text-gray-600">
              <a href="https://goodpass.id/about-us/terms-of-use/" className="hover:text-blue-600 transition-colors text-center">
                Terms of Use
              </a>
              <a href="https://goodpass.id/about-us/terms-of-use/additional-terms-of-use/" className="hover:text-blue-600 transition-colors text-center">
                Additional Terms of Use
              </a>
              <a href="https://goodpass.id/about-us/privacy-policy/" className="hover:text-blue-600 transition-colors text-center">
                Privacy Policy
              </a>
            </div>
          </div>
          
          {/* Terms of Use Content */}
          <div className="mt-8 pt-8 border-t border-gray-200 prose prose-sm max-w-none text-gray-600">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms of Use</h3>
              <p className="text-xs text-gray-500 mb-4">Last Update: 27 Feb 2025</p>
              
              <div className="space-y-4 text-xs leading-relaxed">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">WHO WE ARE & WHAT WE DO</h4>
                  <p>Welcome to the Goodpass, Terms and Agreement!</p>
                  <p>Goodpass. Pte. Ltd. ("Goodpass") is a community based credit reporting tool, that helps our communities build Credit Score outside of the formal Financial Institution, by producing reports (loan or other reports), by the communities, and for the communities.</p>
                  <p>We help Reporters (the person making the report) remind their peers about outstanding loans or other conducts, and also help the Reportees (the person being reported) build credit score and credit worthiness track record, outside of formal Financial Institution.</p>
                  <p>We DO NOT provide access to direct funding, loans, investments or any financial instruments directly to the Reporting Party or the Reported Party. Financial transactions, agreements, commitments, and reports are made between the community, and our role here is only to record and verify and check the validity of these reports so as to generate behavioral credit scores from the Reported Parties.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">DEFINITIONS</h4>
                  <p>("Agreement") or ("Community TOU") means these Goodpass, Terms of Use and all materials referred or linked to in here.</p>
                  <p>("Community") means other members of the Goodpass, including yourself.</p>
                  <p>("We, Us, Our, Goodpass, Goodpass App, Goodpass Score or Goodpass") means Goodpass App which is owned by PT Digital Venture International, a company registered in and under the law of Indonesia.</p>
                  <p>("Reporter") is the person or entity, submitting a report about loan commitment, fraud or other reports.</p>
                  <p>("Reportee") is the person or entity being reported by You or by the Community.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">No Licenses</h4>
                  <p>We grant to you only the rights and licenses expressly stated in this Agreement, and you receive no other rights or licenses with respect to us, the Goodpass products and services, our trademarks, or any other property or right of ours.</p>
                </div>
              </div>
            </div>

            {/* Privacy Policy Content */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Policy</h3>
              <p className="text-xs text-gray-500 mb-4">Last modified: 27 February 2025</p>
              
              <div className="space-y-4 text-xs leading-relaxed">
                <p>We at Goodpass are committed to protecting your privacy. This Privacy Policy applies to information and data collected by members and Goodpass as controllers, including information collected on our Website (www.Goodpass.id) or via other channels as described below.</p>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Controller</h4>
                  <p>PT. GOODPASS PTE. LTD. is a limited liability company established in Indonesia with a Singaporean registration number 202306880R as ("Goodpass", "Goodpass & App", "Goodpass Community"). Community-based credit report services and controllers of your personal data are responsible for, based on, the use and any disclosures that can be made regarding your personal data.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">What Information We Collect</h4>
                  <p>"Personal Information" refers to any information that identifies you personally, including contact information, such as your name, National identification number, Passport, email address, company name, company address, telephone number and other information about yourself or your business.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Data Protection Officer</h4>
                  <p>If you have any questions about this Privacy Policy or our privacy practices please contact us info@goodpass.id or by mail at: 160 Robinson Road, #14-04 Singapore Business Federation Center Singapore (068914)</p>
                </div>
              </div>
            </div>

            {/* Additional Terms of Use */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Terms of Use</h3>
              <p className="text-xs text-gray-500 mb-4">Last Modified: 26 October 2021</p>
              
              <div className="space-y-4 text-xs leading-relaxed">
                <p>Credit report Inquiry is provided by Goodpass Pte. Ltd ("Goodpass") as part of a community-based character building report for any individual or companies who do not have a credit track record on any financial institutions.</p>
                
                <p>As an Individual or Company who requested the Credit Inquiry, you understand that the information given on the Credit Report may contain very sensitive and confidential information, hence you are solely responsible to keep the information strictly confidential to you, and for the use of credit report character assessment only.</p>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">After inquiring about the information, you may not:</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Make a copy, make a screenshot, take a picture, alter, modify, or any other duplication activities, other than the information that Goodpass Pte. Ltd ("Goodpass") has provided to you.</li>
                    <li>You may not share, make it public, or tell information about the individuals/companies to other parties, other than for yourself.</li>
                  </ul>
                </div>
                
                <p>Failure to comply with the rules could risk yourself being subject to criminal prosecution under the UU ITE, or Confidential Information Act.</p>
                <p>Goodpass Pte. Ltd ("Goodpass") will not be responsible for any misuse of information provided to you by the use of this Credit Report Inquiry feature.</p>
              </div>
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

export default Index;
