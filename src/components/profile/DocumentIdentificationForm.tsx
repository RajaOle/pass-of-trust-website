
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface ProfileFormData {
  fullName: string;
  identificationNumber: string;
  dateOfBirth: string;
  address: string;
  documentType: "national-id" | "passport" | "driving-license";
  kycMethod: "upload" | "third-party";
  thirdPartyLink?: string;
}

interface DocumentIdentificationFormProps {
  form: UseFormReturn<ProfileFormData>;
}

export const DocumentIdentificationForm: React.FC<DocumentIdentificationFormProps> = ({ form }) => {
  return (
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
  );
};
