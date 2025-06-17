
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
            <div className="text-sm text-gray-500 mb-6">
              Last Modified 26 October 2021
            </div>

            <section>
              <p className="leading-relaxed mb-6">
                Credit report Inquiry is provided by Goodpass Pte. Ltd ("Goodpass") as part of a community-based character building report for any individual or companies who do not have a credit track record on any financial institutions. Goodpass provided this service on an as-is basis. Goodpass Pte. Ltd ("Goodpass") will try to verify the validity of the report to the best of its ability, however, the accuracy and the quality of the report lies on the details given by the community reporter.
              </p>
              
              <p className="leading-relaxed mb-6">
                As an Individual or Company who requested the Credit Inquiry, you understand that the information given on the Credit Report may contain very sensitive and confidential information, hence you are solely responsible to keep the information strictly confidential to you, and for the use of credit report character assessment only.
              </p>
              
              <p className="leading-relaxed mb-4">
                After inquiring about the information, you may not:
              </p>
              
              <ul className="list-disc pl-6 space-y-3 mb-6">
                <li className="leading-relaxed">
                  Make a copy, make a screenshot, take a picture, alter, modify, or any other duplication activities, other than the information that Goodpass Pte. Ltd ("Goodpass") has provided to you.
                </li>
                <li className="leading-relaxed">
                  You may not share, make it public, or tell information about the individuals/companies to other parties, other than for yourself.
                </li>
              </ul>
              
              <p className="leading-relaxed mb-6">
                Failure to comply with the rules. 2, could risk yourself being subject to criminal prosecution under the UU ITE, or Confidential Information Act.
              </p>
              
              <p className="leading-relaxed mb-6">
                Goodpass Pte. Ltd ("Goodpass") will not be responsible for any misuse of information provided to you by the use of this Credit Report Inquiry feature.
              </p>
              
              <p className="leading-relaxed mb-6">
                You have read, understood and agreed to comply with{" "}
                <Link 
                  to="/about-us/terms-of-use" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  https://goodpass.id/about-us/terms-of-use/
                </Link>{" "}
                in this Credit Report Request feature.
              </p>
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
