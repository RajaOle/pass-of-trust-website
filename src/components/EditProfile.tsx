
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { useKYC } from "@/hooks/useKYC";
import { RegisteredInformation } from "@/components/profile/RegisteredInformation";
import { PersonalInformationForm } from "@/components/profile/PersonalInformationForm";
import { DocumentIdentificationForm } from "@/components/profile/DocumentIdentificationForm";
import { KYCVerificationForm } from "@/components/profile/KYCVerificationForm";

interface ProfileFormData {
  fullName: string;
  identificationNumber: string;
  dateOfBirth: string;
  address: string;
  documentType: "national-id" | "passport" | "driving-license";
  kycMethod: "upload" | "third-party";
  thirdPartyLink?: string;
}

export const EditProfile = () => {
  const { user } = useAuth();
  const { kycProfile, loading: kycLoading, updateKYCProfile } = useKYC();
  const [kycVerified, setKycVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProfileFormData>({
    defaultValues: {
      fullName: "",
      identificationNumber: "",
      dateOfBirth: "",
      address: "",
      documentType: "national-id",
      kycMethod: "upload",
      thirdPartyLink: ""
    }
  });

  // Update form when KYC profile loads
  useEffect(() => {
    if (kycProfile) {
      const fullName = `${kycProfile.first_name || ''} ${kycProfile.last_name || ''}`.trim();
      const address = [
        kycProfile.address_line1,
        kycProfile.address_line2,
        kycProfile.city,
        kycProfile.state,
        kycProfile.postal_code,
        kycProfile.country
      ].filter(Boolean).join(', ');

      form.reset({
        fullName: fullName,
        identificationNumber: kycProfile.national_id_number || "",
        dateOfBirth: kycProfile.date_of_birth || "",
        address: address,
        documentType: "national-id",
        kycMethod: "upload",
        thirdPartyLink: ""
      });

      setKycVerified(kycProfile.kyc_status === 'approved');
    }
  }, [kycProfile, form]);

  const handleThirdPartyKYC = () => {
    // Simulate third-party KYC verification
    setIsSubmitting(true);
    setTimeout(() => {
      setKycVerified(true);
      setIsSubmitting(false);
      toast.success("KYC verification completed successfully!");
    }, 2000);
  };

  const handlePhoneVerificationComplete = async (phoneNumber: string) => {
    try {
      if (kycProfile) {
        await updateKYCProfile({
          phone_number: phoneNumber,
          phone_verified: true,
        });
        toast.success("Phone number verified and saved successfully!");
      }
    } catch (error) {
      console.error('Error updating phone verification:', error);
      toast.error("Failed to save phone verification status");
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    console.log("Form data:", data);
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      if (data.kycMethod === "upload") {
        setKycVerified(true);
        toast.success("Profile updated and KYC verified successfully!");
      } else if (data.kycMethod === "third-party" && data.thirdPartyLink) {
        // Third-party verification would be handled separately
        toast.success("Profile updated. Please complete KYC verification via the provided link.");
      } else {
        toast.success("Profile updated successfully!");
      }
      setIsSubmitting(false);
    }, 1500);
  };

  if (kycLoading) {
    return <div className="flex justify-center p-8">Loading profile information...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600 mt-2">Update your profile information and complete KYC verification.</p>
        </div>
        {kycVerified && (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4 mr-1" />
            KYC Verified
          </Badge>
        )}
      </div>

      {/* Registered Information Display */}
      <RegisteredInformation
        userEmail={user?.email || ''}
        initialPhoneNumber={kycProfile?.phone_number}
        isPhoneVerified={kycProfile?.phone_verified}
        onPhoneVerificationComplete={handlePhoneVerificationComplete}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <PersonalInformationForm form={form} />

          {/* Document Identification */}
          <DocumentIdentificationForm form={form} />

          {/* KYC Verification */}
          <KYCVerificationForm
            form={form}
            kycVerified={kycVerified}
            isSubmitting={isSubmitting}
            onThirdPartyKYC={handleThirdPartyKYC}
          />

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
