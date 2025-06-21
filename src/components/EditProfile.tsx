
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload, FileText, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";
import { useKYC } from "@/hooks/useKYC";

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
  const { kycProfile, loading: kycLoading } = useKYC();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a valid image (JPEG, PNG) or PDF file");
        return;
      }
      if (file.size > maxSize) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setUploadedFile(file);
      toast.success("Document uploaded successfully");
    }
  };

  const handleThirdPartyKYC = () => {
    // Simulate third-party KYC verification
    setIsSubmitting(true);
    setTimeout(() => {
      setKycVerified(true);
      setIsSubmitting(false);
      toast.success("KYC verification completed successfully!");
    }, 2000);
  };

  const onSubmit = (data: ProfileFormData) => {
    console.log("Form data:", data);
    console.log("Uploaded file:", uploadedFile);
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      if (data.kycMethod === "upload" && uploadedFile) {
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
      <Card>
        <CardHeader>
          <CardTitle>Registered Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="p-3 bg-gray-50 border rounded-md">
                <p className="text-sm font-medium">{user?.email || 'Not available'}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <div className="p-3 bg-gray-50 border rounded-md">
                <p className="text-sm font-medium">{kycProfile?.phone_number || 'Not provided'}</p>
                {kycProfile?.phone_verified && (
                  <Badge variant="outline" className="mt-1 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your full address"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Document Identification */}
          <Card>
            <CardHeader>
              <CardTitle>Document Identification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="documentType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Document Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="national-id" id="national-id" />
                          <Label htmlFor="national-id">National ID</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="passport" id="passport" />
                          <Label htmlFor="passport">Passport</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="driving-license" id="driving-license" />
                          <Label htmlFor="driving-license">Driving License</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identificationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Identification Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your identification number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* KYC Verification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>KYC Verification</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="kycMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Verification Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="upload" id="upload" />
                          <Label htmlFor="upload">Upload Document</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="third-party" id="third-party" />
                          <Label htmlFor="third-party">Third-party KYC Service (e.g., Persona)</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("kycMethod") === "upload" && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Upload your document</p>
                      <p className="text-xs text-gray-500">
                        Supported formats: JPEG, PNG, PDF (max 5MB)
                      </p>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      >
                        Choose File
                      </label>
                    </div>
                  </div>

                  {uploadedFile && (
                    <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        {uploadedFile.name}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {form.watch("kycMethod") === "third-party" && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="thirdPartyLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Third-party Service Link</FormLabel>
                        <FormControl>
                          <Input placeholder="https://persona.com/verify/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleThirdPartyKYC}
                    disabled={!form.watch("thirdPartyLink") || isSubmitting}
                    className="w-full"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Verifying..." : "Complete KYC Verification"}
                  </Button>
                </div>
              )}

              {!kycVerified && (
                <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm text-yellow-800">KYC verification is required to make a record</span>
                </div>
              )}
            </CardContent>
          </Card>

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
