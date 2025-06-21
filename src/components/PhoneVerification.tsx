
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Badge } from "@/components/ui/badge";
import { Phone, CheckCircle, AlertCircle, RotateCcw } from "lucide-react";
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { usePhoneVerification } from "@/hooks/usePhoneVerification";

interface PhoneVerificationProps {
  initialPhoneNumber?: string;
  isVerified?: boolean;
  onVerificationComplete: (phoneNumber: string) => void;
  disabled?: boolean;
}

export const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  initialPhoneNumber = '',
  isVerified = false,
  onVerificationComplete,
  disabled = false,
}) => {
  const [phoneInput, setPhoneInput] = useState(initialPhoneNumber);
  const { state, sendVerificationCode, verifyCode, resetVerification } = usePhoneVerification();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters except +
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // If it doesn't start with +, add +1 for US numbers
    if (cleaned && !cleaned.startsWith('+')) {
      return '+1' + cleaned;
    }
    
    return cleaned;
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneInput(formatted);
  };

  const handleSendCode = async () => {
    if (!phoneInput) return;
    
    try {
      // Validate phone number
      if (!isValidPhoneNumber(phoneInput)) {
        throw new Error('Please enter a valid phone number');
      }
      
      const parsed = parsePhoneNumber(phoneInput);
      const formattedNumber = parsed?.formatInternational() || phoneInput;
      
      await sendVerificationCode(formattedNumber);
    } catch (error: any) {
      console.error('Phone validation error:', error);
    }
  };

  const handleVerifyCode = async (code: string) => {
    const result = await verifyCode(code);
    if (result.success) {
      onVerificationComplete(state.phoneNumber);
    }
  };

  if (isVerified && initialPhoneNumber) {
    return (
      <div className="space-y-2">
        <Label>Phone Number</Label>
        <div className="flex items-center space-x-2 p-3 bg-gray-50 border rounded-md">
          <Phone className="h-4 w-4 text-gray-500" />
          <span className="flex-1 text-sm font-medium">{initialPhoneNumber}</span>
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Phone className="h-5 w-5" />
          <span>Phone Verification</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {state.step === 'input' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneInput}
                onChange={handlePhoneInputChange}
                disabled={disabled || state.isLoading}
              />
              <p className="text-xs text-gray-500">
                Enter your phone number with country code (e.g., +1 for US)
              </p>
            </div>
            
            <Button 
              onClick={handleSendCode}
              disabled={!phoneInput || state.isLoading || disabled}
              className="w-full"
            >
              {state.isLoading ? "Sending..." : "Send Verification Code"}
            </Button>
          </div>
        )}

        {state.step === 'verify' && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                We've sent a verification code to {state.phoneNumber}
              </p>
              
              <div className="space-y-2">
                <Label>Enter verification code</Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    onComplete={handleVerifyCode}
                    disabled={state.isLoading}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              
              {state.error && (
                <div className="flex items-center justify-center space-x-2 mt-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{state.error}</span>
                </div>
              )}
              
              <p className="text-xs text-gray-500 mt-2">
                {state.attemptsRemaining} attempts remaining
              </p>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={resetVerification}
                disabled={state.isLoading}
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Change Number
              </Button>
              
              <Button
                variant="outline"
                onClick={() => sendVerificationCode(state.phoneNumber)}
                disabled={state.isLoading}
                className="flex-1"
              >
                Resend Code
              </Button>
            </div>
          </div>
        )}

        {state.step === 'verified' && (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="h-8 w-8" />
              <span className="text-lg font-medium">Phone Verified!</span>
            </div>
            <p className="text-sm text-gray-600">
              Your phone number {state.phoneNumber} has been successfully verified.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
