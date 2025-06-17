
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Mail, Phone, Chrome, Facebook, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Sign In Successful",
        description: `Welcome back! Signed in with ${loginMethod === "email" ? formData.email : formData.phone}`,
      });
    }, 1500);
  };

  const handleOAuthSignIn = (provider: string) => {
    toast({
      title: `${provider} Sign In`,
      description: `Redirecting to ${provider} authentication...`,
    });
  };

  const handleForgotPassword = () => {
    if (loginMethod === "email" && !formData.email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address first.",
        variant: "destructive",
      });
      return;
    }
    if (loginMethod === "phone" && !formData.phone) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number first.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Reset",
      description: `Password reset instructions sent to your ${loginMethod === "email" ? "email" : "phone number"}.`,
    });
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to your Goodpass account</p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Login Method Toggle */}
            <div className="flex rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setLoginMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  loginMethod === "email"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod("phone")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  loginMethod === "phone"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Phone className="w-4 h-4" />
                Phone
              </button>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email/Phone Input */}
              <div className="space-y-2">
                <Label htmlFor={loginMethod}>
                  {loginMethod === "email" ? "Email Address" : "Phone Number"}
                </Label>
                <Input
                  id={loginMethod}
                  name={loginMethod}
                  type={loginMethod === "email" ? "email" : "tel"}
                  placeholder={
                    loginMethod === "email" 
                      ? "Enter your email address" 
                      : "Enter your phone number"
                  }
                  value={loginMethod === "email" ? formData.email : formData.phone}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-gray-300 hover:bg-gray-50"
                onClick={() => handleOAuthSignIn("Google")}
              >
                <Chrome className="w-5 h-5 mr-3" />
                Continue with Google
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-gray-300 hover:bg-gray-50"
                onClick={() => handleOAuthSignIn("Facebook")}
              >
                <Facebook className="w-5 h-5 mr-3 text-blue-600" />
                Continue with Facebook
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-gray-300 hover:bg-gray-50"
                onClick={() => handleOAuthSignIn("LinkedIn")}
              >
                <Linkedin className="w-5 h-5 mr-3 text-blue-700" />
                Continue with LinkedIn
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
              >
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <Link to="/about-us/terms-of-use" className="text-blue-600 hover:underline">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link to="/about-us/privacy-policy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
