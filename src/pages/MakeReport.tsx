
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const MakeReport = () => {
  return <div className="min-h-screen bg-gray-50">
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
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Make a Report
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join Goodpass to build trust and transparency in your community. Whether you're an individual or an institution, contributing to our platform helps create a more inclusive ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section 1: Individuals */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-600 text-3xl text-center">
                Why Individuals Should Contribute to Goodpass Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" alt="Woman using laptop for financial planning" className="w-full h-full object-cover" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center">Build Your Credit Profile</h3>
                  <p className="text-gray-600 text-sm">
                    By contributing to or creating reports on Goodpass, individuals can establish a trusted GP Score, improving their chances of securing loans from banks or investors, even without a formal credit history.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center">Strengthen Community Trust</h3>
                  <p className="text-gray-600 text-sm">
                    Reporting accurate loan or behavioral data on Goodpass fosters transparency, helping individuals build a reputation for reliability and trustworthiness within their community.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center">Simplify Personal Lending</h3>
                  <p className="text-gray-600 text-sm">
                    Goodpass automates tracking and reminders for informal loans, reducing awkwardness and ensuring smoother financial interactions with peers, while contributing to a shared credit ecosystem.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <Link to="/signup">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Start Individual Report
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Institutions */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-green-600 text-3xl text-center">
                Why Institutions Should Contribute to Goodpass Commitment Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="aspect-video w-full bg-gray-200 rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80" alt="Group of people around display screens in professional setting" className="w-full h-full object-cover" />
              </div>
              
              <div className="space-y-4 mb-12">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center">Enhance Financial Inclusion</h3>
                  <p className="text-gray-600 text-sm">
                    By contributing verified commitment reports to Goodpass, institutions help build community-based credit scores, enabling unbanked individuals to access formal financing opportunities.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center">Reduce Lending Risks</h3>
                  <p className="text-gray-600 text-sm">
                    Providing accurate data to Goodpass's platform allows institutions to leverage comprehensive credit behavior insights, minimizing default risks and improving loan decision-making.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-center">Strengthen Community Trust</h3>
                  <p className="text-gray-600 text-sm">
                    Participating as a reporter in Goodpass fosters transparency and accountability, reinforcing trust within communities and supporting ethical lending practices.
                  </p>
                </div>
              </div>

              <Link to="/signup">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Start Institution Report
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            By submitting reports, you agree to our{" "}
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
    </div>;
};

export default MakeReport;
