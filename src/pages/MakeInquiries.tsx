
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users, FileCheck, ArrowLeft, CreditCard, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InquiryButton } from "@/components/InquiryButton";

const MakeInquiries = () => {
  const [currentCredits] = useState(25); // Mock current credits

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <img alt="Goodpass" className="h-8 w-auto" src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Make Inquiries
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search and verify financial reputation and history before making lending decisions or entering partnerships.
          </p>
        </div>

        {/* Credit Balance Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Available Credits</h3>
                  <p className="text-2xl font-bold text-blue-600">{currentCredits}</p>
                  <p className="text-sm text-gray-600">Goodpass: 1 credit • Combined: 3 credits</p>
                </div>
              </div>
              <Link to="/dashboard">
                <Button variant="outline">
                  Buy More Credits
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Search Action */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2 text-blue-600" />
              Start Your Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-600 mb-6">
                Begin your financial reputation inquiry with our comprehensive search system.
              </p>
              <InquiryButton />
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Community Verified</h3>
                  <p className="text-gray-600 text-sm">
                    All reports are verified by trusted community members, ensuring accuracy and reliability of financial history data.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Comprehensive Reports</h3>
                  <p className="text-gray-600 text-sm">
                    Get detailed insights into loan history, repayment patterns, and financial reliability from multiple sources.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Secure & Compliant</h3>
                  <p className="text-gray-600 text-sm">
                    All searches are conducted with proper consent and comply with data protection regulations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Search className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multi-Source Search</h3>
                  <p className="text-gray-600 text-sm">
                    Choose between Goodpass-only searches or enhanced searches with third-party data sources.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-white rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need to Build Your Own Reputation?
          </h2>
          <p className="text-gray-600 mb-6">
            Start building your financial reputation by having trusted contacts report your loan commitments and repayment history.
          </p>
          <Link to="/makereport">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Make a Report
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MakeInquiries;
