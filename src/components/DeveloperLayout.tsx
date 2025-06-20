
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "Introduction", href: "#introduction" },
  { title: "Authentication", href: "#authentication" },
  { title: "Making Inquiries", href: "#inquiries" },
  { title: "Submitting Financial Reports", href: "#reports" },
  { title: "Webhooks", href: "#webhooks" },
  { title: "SDKs", href: "#sdks" },
  { title: "Reputation Score Use Cases", href: "#use-cases" },
  { title: "Support / FAQ", href: "#support" },
];

export const DeveloperLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.href.slice(1));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link to="/" className="flex items-center ml-2 lg:ml-0">
                <img 
                  alt="Goodpass" 
                  className="h-6 sm:h-8 w-auto" 
                  src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" 
                />
              </Link>
            </div>
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
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600" asChild>
                <Link to="/signin">Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 pt-16 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="h-full overflow-y-auto px-4 py-6">
            <div className="mb-6">
              <div className="flex flex-col space-y-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get API Keys
                </Button>
                <Button size="sm" variant="outline" className="border-gray-300 text-gray-700">
                  View Documentation
                </Button>
              </div>
            </div>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    "w-full text-left block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    activeSection === item.href.slice(1)
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  {item.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Introduction Section */}
            <section id="introduction" className="mb-16">
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Goodpass API Documentation
                </h1>
                <p className="text-xl text-gray-600">
                  Welcome to the Goodpass API. Build trust-based financial applications with our secure, 
                  developer-friendly API for financial reputation data.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Getting Started</h2>
                  <p className="text-gray-600 mb-6">
                    The Goodpass API allows you to integrate financial reputation data into your applications. 
                    You can make reputation inquiries, submit financial reports, and receive real-time updates 
                    via webhooks.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          <strong>Base URL:</strong> <code className="bg-blue-100 px-2 py-1 rounded">https://api.goodpass.id/v1</code>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Reputation Inquiries</h3>
                      <p className="text-gray-600 text-sm">
                        Check financial reputation scores and credit history for loan decisions.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Reports</h3>
                      <p className="text-gray-600 text-sm">
                        Submit loan reports and payment history to build reputation profiles.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Real-time Webhooks</h3>
                      <p className="text-gray-600 text-sm">
                        Receive instant notifications for reputation updates and new reports.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Multiple SDKs</h3>
                      <p className="text-gray-600 text-sm">
                        Official libraries for JavaScript, Python, PHP, and more languages.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Authentication Section */}
            <section id="authentication" className="mb-16">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication</h1>
                <p className="text-lg text-gray-600">
                  All API requests must be authenticated using API keys. Learn how to authenticate 
                  your requests securely.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Keys</h2>
                  <p className="text-gray-600 mb-4">
                    API keys are used to authenticate requests to the Goodpass API. You can obtain your API keys 
                    from the developer dashboard. Keep your API keys secure and never expose them in client-side code.
                  </p>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          <strong>Security Note:</strong> Never expose your API keys in client-side code or public repositories. 
                          Always use them server-side or in secure environments.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Key Types</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Key Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Prefix
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Environment
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Usage
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Live API Key
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <code className="bg-gray-100 px-2 py-1 rounded">gp_live_</code>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Production
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Production applications
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            Test API Key
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <code className="bg-gray-100 px-2 py-1 rounded">gp_test_</code>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Sandbox
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Development and testing
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Making Inquiries Section */}
            <section id="inquiries" className="mb-16">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Making Inquiries</h1>
                <p className="text-lg text-gray-600">
                  Learn how to create and manage reputation inquiries to assess financial trustworthiness 
                  for lending decisions.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Create an Inquiry</h2>
                  <p className="text-gray-600 mb-4">
                    Submit a reputation inquiry to assess a user's financial trustworthiness. 
                    The API will return a reputation score and risk assessment.
                  </p>
                  
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      POST
                    </span>
                    <code className="ml-2 text-sm text-gray-700">/v1/inquiries</code>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reputation Score Ranges</h2>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Excellent (750-850)</span>
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                          Low Risk
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Exceptional credit history with minimal risk factors
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Good (650-749)</span>
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                          Moderate Risk
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Good credit history with some minor risk factors
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Submitting Financial Reports Section */}
            <section id="reports" className="mb-16">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Submitting Financial Reports</h1>
                <p className="text-lg text-gray-600">
                  Learn how to submit loan reports and financial data to build comprehensive reputation profiles.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Report Types</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Loan Reports</h3>
                      <p className="text-gray-600 text-sm">
                        Submit loan origination, payment history, and closure reports.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Updates</h3>
                      <p className="text-gray-600 text-sm">
                        Report payment status, delays, and default information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Webhooks Section */}
            <section id="webhooks" className="mb-16">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Webhooks</h1>
                <p className="text-lg text-gray-600">
                  Receive real-time notifications when reputation data changes or new reports are submitted.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Event Types</h2>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <span className="font-medium text-gray-900">reputation.updated</span>
                      <p className="text-sm text-gray-600 mt-1">
                        Triggered when a user's reputation score changes
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <span className="font-medium text-gray-900">report.submitted</span>
                      <p className="text-sm text-gray-600 mt-1">
                        Triggered when a new financial report is submitted
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SDKs Section */}
            <section id="sdks" className="mb-16">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">SDKs</h1>
                <p className="text-lg text-gray-600">
                  Official software development kits for popular programming languages and frameworks.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available SDKs</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">JavaScript/Node.js</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        Full-featured SDK for JavaScript and Node.js applications.
                      </p>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">npm install @goodpass/sdk</code>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Python</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        Python SDK with full API coverage and type hints.
                      </p>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">pip install goodpass</code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Use Cases Section */}
            <section id="use-cases" className="mb-16">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Reputation Score Use Cases</h1>
                <p className="text-lg text-gray-600">
                  Explore practical applications of reputation scores in financial services and lending.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Use Cases</h2>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Loan Underwriting</h4>
                      <p className="text-blue-700 text-sm">
                        Use reputation scores to assess creditworthiness and set appropriate interest rates.
                      </p>
                    </div>
                    <div className="border-l-4 border-green-400 bg-green-50 p-4">
                      <h4 className="font-medium text-green-900 mb-2">Risk Assessment</h4>
                      <p className="text-green-700 text-sm">
                        Evaluate default probability and adjust lending terms accordingly.
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-400 bg-purple-50 p-4">
                      <h4 className="font-medium text-purple-900 mb-2">Portfolio Management</h4>
                      <p className="text-purple-700 text-sm">
                        Monitor portfolio risk and identify potential issues early.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Support Section */}
            <section id="support" className="mb-16">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Support / FAQ</h1>
                <p className="text-lg text-gray-600">
                  Get help with common questions and find resources for troubleshooting.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">How do I get started?</h3>
                      <p className="text-gray-600 text-sm">
                        Sign up for a developer account, get your API keys, and start making requests to our sandbox environment.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">What are the rate limits?</h3>
                      <p className="text-gray-600 text-sm">
                        Free tier: 100 requests/hour. Pro tier: 1,000 requests/hour. Enterprise: Custom limits.
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">How do I contact support?</h3>
                      <p className="text-gray-600 text-sm">
                        Email us at developers@goodpass.id or use the chat widget in your dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};
