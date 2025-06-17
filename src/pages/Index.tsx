
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
              <img 
                src="/lovable-uploads/Goodpass logo.png" 
                alt="Goodpass" 
                className="h-8 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#report" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Make a Report
              </a>
              <a href="#inquiries" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Make Inquiries
              </a>
              <a href="#developers" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Developers
              </a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Pricing
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                Login
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <a href="#report" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Make a Report
                </a>
                <a href="#inquiries" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Make Inquiries
                </a>
                <a href="#developers" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Developers
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Pricing
                </a>
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                  <Button variant="ghost" className="text-gray-700 justify-start">
                    Login
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white justify-start">
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Build Your Financial
              <span className="text-blue-600 block">Reputation</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Goodpass creates a trusted community where friends and family can report loan commitments, 
              helping you build a verifiable financial reputation for better access to credit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 px-8 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Goodpass Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our peer-to-peer platform enables transparent financial reporting between trusted contacts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Make Reports</h3>
                <p className="text-gray-600 leading-relaxed">
                  Report loan commitments and repayment history with trusted friends, family members, or business partners.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Make Inquiries</h3>
                <p className="text-gray-600 leading-relaxed">
                  Check financial reputation and history before making lending decisions or entering partnerships.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Build Reputation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Establish a verifiable track record that opens doors to better financial opportunities and trust.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Trusted by Communities Worldwide
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our platform is built on trust, transparency, and security. Every report is verified 
                and encrypted to protect your privacy while building your financial reputation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-blue-600 mr-3" />
                  <span className="text-gray-700">Bank-level security and encryption</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-6 h-6 text-blue-600 mr-3" />
                  <span className="text-gray-700">Community-verified reports</span>
                </div>
                <div className="flex items-center">
                  <Lock className="w-6 h-6 text-blue-600 mr-3" />
                  <span className="text-gray-700">Privacy-first approach</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <img 
                src="/lovable-uploads/Goodpass icon 3xxx.png" 
                alt="Goodpass Security" 
                className="w-64 h-64 mx-auto opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Financial Reputation?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already building trust through our community-based platform.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/Goodpass logo.png" 
                alt="Goodpass" 
                className="h-6 w-auto"
              />
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-8 text-sm text-gray-600">
              <a href="#terms" className="hover:text-blue-600 transition-colors">
                Terms of Use
              </a>
              <a href="#additional-terms" className="hover:text-blue-600 transition-colors">
                Additional Terms of Use
              </a>
              <a href="#privacy" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            © 2024 Goodpass. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
