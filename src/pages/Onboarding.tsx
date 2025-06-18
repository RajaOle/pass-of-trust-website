
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    // Navigate to dashboard (you can replace this with actual dashboard route)
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/">
            <img alt="Goodpass" className="h-8 w-auto" src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" />
          </Link>
        </div>
        <div className="flex justify-center mt-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Welcome to Goodpass!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your account has been created successfully
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-blue-600">
              Get Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Write reports into Goodpass to make the community a better place
              </h3>
              <p className="text-gray-600 mb-6">
                Start contributing to a more transparent and trustworthy financial ecosystem. Your reports help build community trust and support better lending decisions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Build Community Trust</h4>
                  <p className="text-sm text-gray-600">Help create a transparent ecosystem where everyone benefits from shared financial insights.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">Improve Your GP Score</h4>
                  <p className="text-sm text-gray-600">Contributing quality reports helps establish your credibility and improve your Goodpass Score.</p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleGoToDashboard}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Go to Dashboard
            </Button>

            <div className="text-center">
              <Link 
                to="/makereport" 
                className="text-blue-600 hover:text-blue-500 text-sm font-medium"
              >
                Start writing your first report →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
