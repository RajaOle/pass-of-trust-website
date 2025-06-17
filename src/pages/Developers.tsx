
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Database, Key, Globe, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Developers = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <img alt="Goodpass" className="h-6 sm:h-8 w-auto" src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" />
            </Link>
            <nav className="hidden lg:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <Link to="/makereport" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Make a Report
              </Link>
              <Link to="/makeinquiries" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Make Inquiries
              </Link>
              <Link to="/developers" className="text-blue-600 font-medium">
                Developers
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                Login
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Build with
              <span className="text-blue-600 block mt-1">Goodpass API</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Integrate financial reputation data into your applications with our secure, 
              developer-friendly API. Enable trust-based lending and financial services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Get API Keys
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 px-8 py-3">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Developer Tools & Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to integrate Goodpass into your applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">RESTful API</h3>
                <p className="text-gray-600 leading-relaxed">
                  Simple, intuitive REST API with comprehensive endpoints for reports, inquiries, and reputation data.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Key className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication</h3>
                <p className="text-gray-600 leading-relaxed">
                  Secure API key authentication with rate limiting and usage monitoring for production apps.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Database className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Webhooks</h3>
                <p className="text-gray-600 leading-relaxed">
                  Real-time notifications for new reports, inquiries, and reputation updates via webhooks.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">SDKs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Official SDKs for JavaScript, Python, PHP, and more languages to speed up integration.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Documentation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Comprehensive guides, API reference, and code examples to get you started quickly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dedicated developer support, community forums, and technical assistance when you need it.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* API Example Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Simple Integration
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Get started with just a few lines of code. Our API is designed to be intuitive 
                and easy to integrate into existing applications.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Make reputation inquiries</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Submit financial reports</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Access reputation scores</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Real-time notifications</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 overflow-auto">
              <pre className="text-green-400 text-sm">
                <code>{`// Make an inquiry
const response = await fetch('https://api.goodpass.id/v1/inquiries', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    subject_id: 'user123',
    inquiry_type: 'credit_check'
  })
});

const inquiry = await response.json();
console.log(inquiry.reputation_score);`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of developers building trust-based financial applications with Goodpass.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
            Start Building Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col items-center lg:items-start space-y-4">
              <img alt="Goodpass" className="h-8 w-auto" src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" />
              <p className="text-sm text-gray-600 text-center lg:text-left max-w-xs">
                160 Robinson Road, #14-04 Singapore Business Federation Center<br />
                Singapore (068914)
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
              <Link to="/about-us/terms-of-use" className="hover:text-blue-600 transition-colors">
                Terms of Use
              </Link>
              <Link to="/about-us/privacy-policy" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>Copyright © 2025 GoodPass</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Developers;
