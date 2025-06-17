
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Users, FileCheck, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MakeInquiries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inquiryType, setInquiryType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inquiry submitted:", { searchQuery, inquiryType });
  };

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

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2 text-blue-600" />
              Search Financial History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="search">Search by Name, Phone, or Email</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Enter name, phone number, or email address"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inquiry-type">Inquiry Type</Label>
                <select
                  id="inquiry-type"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select inquiry type</option>
                  <option value="lending">Lending Decision</option>
                  <option value="partnership">Business Partnership</option>
                  <option value="employment">Employment Verification</option>
                  <option value="rental">Rental Application</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 mr-2" />
                Search Records
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6">
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
