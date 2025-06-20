import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Phone, ArrowLeft } from "lucide-react";
import { countries, Country } from "@/data/countries";

interface FormData {
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  selectedCountry: Country;
}

interface FormErrors {
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
}

interface PasswordValidationErrors {
  minLength?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  number?: boolean;
  specialChar?: boolean;
  noSpaces?: boolean;
  match?: boolean;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    selectedCountry: countries[0], // Default to US
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordValidationErrors, setPasswordValidationErrors] = useState<PasswordValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    // Remove spaces and check if it's a valid number
    const cleanPhone = phone.replace(/\s/g, '');
    // Should be between 7-15 digits (international standard)
    const phoneRegex = /^\d{7,15}$/;
    return phoneRegex.test(cleanPhone);
  };

  const validatePassword = (password: string, confirmPassword: string = "") => {
    const validationErrors: PasswordValidationErrors = {};
    
    // Minimum length of 8 characters
    if (password.length < 8) {
      validationErrors.minLength = true;
    }
    
    // Contains at least one uppercase letter (A-Z)
    if (!/[A-Z]/.test(password)) {
      validationErrors.uppercase = true;
    }
    
    // Contains at least one lowercase letter (a-z)
    if (!/[a-z]/.test(password)) {
      validationErrors.lowercase = true;
    }
    
    // Contains at least one number (0-9)
    if (!/[0-9]/.test(password)) {
      validationErrors.number = true;
    }
    
    // Contains at least one special character (!@#$%^&*)
    if (!/[!@#$%^&*]/.test(password)) {
      validationErrors.specialChar = true;
    }
    
    // Contains no spaces
    if (/\s/.test(password)) {
      validationErrors.noSpaces = true;
    }
    
    // Password and confirm password are identical
    if (confirmPassword && password !== confirmPassword) {
      validationErrors.match = true;
    }
    
    return validationErrors;
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    let cleaned = value.replace(/\D/g, '');
    return cleaned;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phoneNumber') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formattedPhone }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Validate password in real-time
    if (name === 'password') {
      const validationErrors = validatePassword(value, formData.confirmPassword);
      setPasswordValidationErrors(validationErrors);
    }
    
    if (name === 'confirmPassword') {
      const validationErrors = validatePassword(formData.password, value);
      setPasswordValidationErrors(validationErrors);
    }
  };

  const handleCountryChange = (countryCode: string) => {
    const selectedCountry = countries.find(c => c.code === countryCode);
    if (selectedCountry) {
      setFormData(prev => ({ ...prev, selectedCountry }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password, formData.confirmPassword);
      if (Object.keys(passwordValidation).length > 0) {
        newErrors.password = 'Password does not meet all requirements';
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Log the complete phone number for debugging
      console.log('Complete phone number:', `${formData.selectedCountry.dialCode}${formData.phoneNumber}`);
      
      toast({
        title: "Account created successfully!",
        description: "Welcome to Goodpass. Redirecting to get started...",
      });
      
      // Navigate to onboarding page instead of just resetting form
      navigate("/onboarding");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // In a real implementation, this would integrate with Google OAuth
    toast({
      title: "Google Sign Up",
      description: "Google OAuth integration would be implemented here.",
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/">
            <img alt="Goodpass" className="h-8 w-auto" src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* SSO Buttons - Only Google */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignUp}
                type="button"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Email and Phone Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone number</Label>
                <div className="flex space-x-2">
                  <Select 
                    value={formData.selectedCountry.code} 
                    onValueChange={handleCountryChange}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue>
                        <div className="flex items-center space-x-2">
                          <span>{formData.selectedCountry.flag}</span>
                          <span className="text-sm">{formData.selectedCountry.dialCode}</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-60 bg-white">
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center space-x-2">
                            <span>{country.flag}</span>
                            <span className="text-sm">{country.name}</span>
                            <span className="text-sm text-gray-500">{country.dialCode}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                      placeholder="123456789"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Selected: {formData.selectedCountry.dialCode}{formData.phoneNumber ? formData.phoneNumber : 'xxxxxxxxx'}
                </p>
                {errors.phoneNumber && (
                  <p className="text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password}</p>
                )}
                
                {/* Password validation errors */}
                {Object.keys(passwordValidationErrors).length > 0 && (
                  <div className="space-y-1">
                    {passwordValidationErrors.minLength && (
                      <p className="text-sm text-red-600">• Password must be at least 8 characters long</p>
                    )}
                    {passwordValidationErrors.uppercase && (
                      <p className="text-sm text-red-600">• Password must contain at least one uppercase letter (A-Z)</p>
                    )}
                    {passwordValidationErrors.lowercase && (
                      <p className="text-sm text-red-600">• Password must contain at least one lowercase letter (a-z)</p>
                    )}
                    {passwordValidationErrors.number && (
                      <p className="text-sm text-red-600">• Password must contain at least one number (0-9)</p>
                    )}
                    {passwordValidationErrors.specialChar && (
                      <p className="text-sm text-red-600">• Password must contain at least one special character (!@#$%^&*)</p>
                    )}
                    {passwordValidationErrors.noSpaces && (
                      <p className="text-sm text-red-600">• Password must not contain spaces</p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                )}
                
                {/* Password match validation */}
                {passwordValidationErrors.match && (
                  <p className="text-sm text-red-600">• Passwords do not match</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </form>

            <p className="text-xs text-center text-gray-500">
              By signing up, you agree to our{' '}
              <Link to="/about-us/terms-of-use" className="text-blue-600 hover:text-blue-500">
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link to="/about-us/privacy-policy" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
