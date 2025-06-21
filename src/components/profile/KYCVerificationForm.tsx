
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload, FileText, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "@/components/ui/sonner";

interface ProfileFormData {
  fullName: string;
  identificationNumber: string;
  dateOfBirth: string;
  address: string;
  documentType: "national-id" | "passport" | "driving-license";
  kycMethod: "upload" | "third-party";
  thirdPartyLink?: string;
}

interface KYCVerificationFormProps {
  form: UseFormReturn<ProfileFormData>;
  kycVerified: boolean;
  isSubmitting: boolean;
  onThirdPartyKYC: () => void;
}

export const KYCVerificationForm: React.FC<KYCVerificationFormProps> = ({
  form,
  kycVerified,
  isSubmitting,
  onThirdPartyKYC,
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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

  return (
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
              onClick={onThirdPartyKYC}
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
  );
};
