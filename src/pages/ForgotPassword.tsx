
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Reset Link Sent",
        description: "Please check your email for password reset instructions.",
      });
    }, 1500);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleBackToLogin = () => {
    setIsSubmitted(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <img 
              alt="Goodpass" 
              className="h-8 w-auto mx-auto" 
              src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" 
            />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isSubmitted ? "Check Your Email" : "Forgot Password"}
          </h1>
          <p className="text-gray-600">
            {isSubmitted 
              ? "We've sent you password reset instructions" 
              : "Enter your email to reset your password"
            }
          </p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">
              {isSubmitted ? "Email Sent" : "Reset Password"}
            </CardTitle>
            <CardDescription className="text-center">
              {isSubmitted 
                ? "Follow the instructions in your email to reset your password" 
                : "We'll send you a link to reset your password"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isSubmitted ? (
              /* Password Reset Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      className="h-12 pl-10"
                    />
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              /* Confirmation Message */
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">Email Sent Successfully</h3>
                  <p className="text-gray-600 text-sm">
                    We've sent password reset instructions to:
                  </p>
                  <p className="text-blue-600 font-medium">{email}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">Next Steps:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Check your email inbox (and spam folder)</li>
                    <li>• Click the reset link in the email</li>
                    <li>• Create a new password</li>
                    <li>• Sign in with your new password</li>
                  </ul>
                </div>
                <p className="text-xs text-gray-500">
                  Didn't receive the email? Check your spam folder or try again in a few minutes.
                </p>
              </div>
            )}

            {/* Back to Sign In */}
            <div className="text-center">
              <Button
                variant="ghost"
                asChild={!isSubmitted}
                onClick={isSubmitted ? handleBackToLogin : undefined}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                {!isSubmitted ? (
                  <Link to="/signin" className="flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Link>
                ) : (
                  <span className="flex items-center cursor-pointer">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Try Different Email
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-500">
          Need help?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
