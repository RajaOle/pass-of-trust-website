
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";

interface ContactInfoFieldsProps {
  form: UseFormReturn<CreateLoanReportFormData>;
  reporteeType: "individual" | "company";
  validatePhoneNumber: (value: string) => string | boolean;
  validateEmail: (value: string, reporteeType: "individual" | "company") => string | boolean;
  formatPhoneNumber: (value: string) => string;
}

export const ContactInfoFields = ({ 
  form, 
  reporteeType, 
  validatePhoneNumber, 
  validateEmail, 
  formatPhoneNumber 
}: ContactInfoFieldsProps) => {
  const getIdTypeOptions = () => {
    if (reporteeType === "individual") {
      return [
        { value: "National ID", label: "National ID" },
        { value: "Passport", label: "Passport" },
        { value: "Driver's License", label: "Driver's License" }
      ];
    } else {
      return [
        { value: "Tax ID", label: "Tax ID" },
        { value: "Company Registration Number", label: "Company Registration Number" }
      ];
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name="phoneNumber"
        rules={{ validate: validatePhoneNumber }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number *</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., +1234567890" 
                {...field}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  field.onChange(formatted);
                }}
              />
            </FormControl>
            <p className="text-sm text-gray-500">
              Include country code (e.g., +1 for US, +44 for UK)
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        rules={{ 
          validate: (value) => validateEmail(value, reporteeType)
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Email {reporteeType === "individual" ? "*" : "(Optional)"}
            </FormLabel>
            <FormControl>
              <Input type="email" placeholder="e.g., contact@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="idType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Identification Type (Optional)</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {getIdTypeOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="idNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID Number (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter ID number" {...field} />
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
            <FormLabel>Address (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter full address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
