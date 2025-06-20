
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/">
                <img alt="Goodpass" className="h-6 sm:h-8 w-auto" src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" />
              </Link>
            </div>
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link to="/makereport" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">
                Make a Report
              </Link>
              <Link to="/makeinquiries" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">
                Make Inquiries
              </Link>
              <Link to="/developers" className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm xl:text-base">
                Developers
              </Link>
              <Link to="/pricing" className="text-blue-600 font-medium text-sm xl:text-base">
                Pricing
              </Link>
            </nav>
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600 text-sm xl:text-base" asChild>
                <Link to="/signin">Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm xl:text-base" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Simple, Credit-Based
              <span className="text-blue-600 block mt-1">Pricing</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Buy credits to make inquiries and access reports. Pay only for what you use with no monthly commitments.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Basic Package */}
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-gray-900">Basic</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">Rp 50K</span>
                  <div className="text-gray-600 text-sm mt-1">Rp 1,000 per credit</div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">50 inquiry credits</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Valid for 6 months</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Basic support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Standard Package */}
            <Card className="border-blue-200 hover:shadow-lg transition-shadow relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Star className="h-3 w-3" />
                  <span>Most Popular</span>
                </span>
              </div>
              <CardHeader className="text-center pb-2 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-900">Standard</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">Rp 140K</span>
                  <div className="text-gray-600 text-sm mt-1">Rp 933 per credit</div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">150 inquiry credits</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Valid for 12 months</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">6% savings</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Buy Credits
                </Button>
              </CardContent>
            </Card>

            {/* Premium Package */}
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-gray-900">Premium</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">Rp 225K</span>
                  <div className="text-gray-600 text-sm mt-1">Rp 900 per credit</div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">250 inquiry credits</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Valid for 18 months</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">10% savings</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                </ul>
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">
                  Buy Credits
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Package */}
            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-gray-900">Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">Rp 425K</span>
                  <div className="text-gray-600 text-sm mt-1">Rp 850 per credit</div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">500 inquiry credits</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Valid for 24 months</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">15% savings</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Dedicated support</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do credits work?
              </h3>
              <p className="text-gray-600">
                Each inquiry or report request uses 1 credit. Credits are valid for the specified duration and never expire within that period.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I buy more credits anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can purchase additional credits at any time. New credits will be added to your existing balance.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens if I don't use all my credits?
              </h3>
              <p className="text-gray-600">
                Credits remain valid for the specified duration (6-24 months depending on the package). You can use them at your own pace.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my data secure?
              </h3>
              <p className="text-gray-600">
                Absolutely. We use bank-level encryption and security measures to protect all your data and transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 sm:py-12">
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
              <Link to="/about-us/privacy-policy" className="hover:text-blue-600 transition-colors text-center">
                Privacy Policy
              </Link>
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

export default Pricing;
