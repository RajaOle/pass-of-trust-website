
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { PhoneVerification } from "@/components/PhoneVerification";

interface RegisteredInformationProps {
  userEmail: string;
  initialPhoneNumber?: string;
  isPhoneVerified?: boolean;
  onPhoneVerificationComplete: (phoneNumber: string) => void;
}

export const RegisteredInformation: React.FC<RegisteredInformationProps> = ({
  userEmail,
  initialPhoneNumber,
  isPhoneVerified,
  onPhoneVerificationComplete,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <div className="p-3 bg-gray-50 border rounded-md">
              <p className="text-sm font-medium">{userEmail || 'Not available'}</p>
            </div>
          </div>
          <div className="space-y-2">
            <PhoneVerification
              initialPhoneNumber={initialPhoneNumber}
              isVerified={isPhoneVerified}
              onVerificationComplete={onPhoneVerificationComplete}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
