
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";

interface SupportingDocumentsTabProps {
  form: UseFormReturn<CreateLoanReportFormData>;
}

export const SupportingDocumentsTab = ({ form }: SupportingDocumentsTabProps) => {
  return (
    <div className="space-y-4 mt-4">
      <FormField
        control={form.control}
        name="supportingDocuments"
        rules={{ required: "Supporting documents are required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Supporting Documents *</FormLabel>
            <FormControl>
              <Input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) => field.onChange(e.target.files)}
              />
            </FormControl>
            <p className="text-sm text-gray-500">
              You can upload multiple files. Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG
            </p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="supportingDocumentsDescription"
        rules={{ required: "Description of supporting documents is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description of Supporting Documents *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="e.g., Any proof of transfer, contract, any chat about promises, etc."
                {...field}
              />
            </FormControl>
            <p className="text-sm text-gray-500">
              Please describe what documents you are uploading and their relevance to the loan report
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
