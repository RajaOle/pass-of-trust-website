
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, User, DollarSign, Calendar, Send } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MakeReport = () => {
  const [formData, setFormData] = useState({
    borrowerName: "",
    lenderName: "",
    loanAmount: "",
    loanDate: "",
    repaymentStatus: "",
    additionalNotes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Report submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <img alt="Goodpass" className="h-6 sm:h-8 w-auto" src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" />
            </Link>
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                Login
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Make a Report
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Report loan commitments and repayment history to help build financial reputation in your trusted community.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <FileText className="w-6 h-6 mr-2 text-blue-600" />
              Loan Report Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="borrowerName" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Borrower Name
                  </Label>
                  <Input
                    id="borrowerName"
                    name="borrowerName"
                    type="text"
                    placeholder="Enter borrower's full name"
                    value={formData.borrowerName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lenderName" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Lender Name
                  </Label>
                  <Input
                    id="lenderName"
                    name="lenderName"
                    type="text"
                    placeholder="Enter lender's full name"
                    value={formData.lenderName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanAmount" className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Loan Amount
                  </Label>
                  <Input
                    id="loanAmount"
                    name="loanAmount"
                    type="number"
                    placeholder="Enter loan amount"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanDate" className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Loan Date
                  </Label>
                  <Input
                    id="loanDate"
                    name="loanDate"
                    type="date"
                    value={formData.loanDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repaymentStatus">Repayment Status</Label>
                <select
                  id="repaymentStatus"
                  name="repaymentStatus"
                  value={formData.repaymentStatus}
                  onChange={(e) => handleInputChange(e as any)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="">Select repayment status</option>
                  <option value="fully-paid">Fully Paid</option>
                  <option value="partially-paid">Partially Paid</option>
                  <option value="overdue">Overdue</option>
                  <option value="in-progress">In Progress</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  placeholder="Add any additional information about this loan..."
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={4}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
                <Button type="button" variant="outline" className="border-gray-300">
                  Save as Draft
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            By submitting this report, you agree to our{" "}
            <Link to="/about-us/terms-of-use" className="text-blue-600 hover:underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link to="/about-us/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default MakeReport;
