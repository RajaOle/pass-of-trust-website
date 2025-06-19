
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Globe } from "lucide-react";
import { CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<CreateLoanReportFormData>;
  reporteeType: "individual" | "company";
  validateWebsite: (value: string) => string | boolean;
}

export const PersonalInfoFields = ({ form, reporteeType, validateWebsite }: PersonalInfoFieldsProps) => {
  if (reporteeType === "individual") {
    return (
      <FormField
        control={form.control}
        name="borrowerName"
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name *</FormLabel>
            <FormControl>
              <Input placeholder="e.g., John Smith" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <>
      <FormField
        control={form.control}
        name="companyName"
        rules={{ required: "Company name is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name *</FormLabel>
            <FormControl>
              <Input placeholder="e.g., ABC Corporation" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="website"
        rules={{ validate: validateWebsite }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Website (Optional)
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g., www.company.com or https://company.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
