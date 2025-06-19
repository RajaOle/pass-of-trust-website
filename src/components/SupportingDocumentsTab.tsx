
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";

interface SupportingDocumentsTabProps {
  form: UseFormReturn<CreateLoanReportFormData>;
}

export const SupportingDocumentsTab = ({
  form
}: SupportingDocumentsTabProps) => {
  return (
    <div className="space-y-4 mt-4">
      <FormField
        control={form.control}
        name="supportingDocuments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Supporting Documents (Optional)</FormLabel>
            <FormControl>
              <Input 
                type="file" 
                multiple 
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" 
                onChange={(e) => field.onChange(e.target.files)} 
              />
            </FormControl>
            <p className="text-sm text-gray-500">
              You can upload supporting documents about proof of collateral, promises, contract (if any) and proof of transfer to support your report, which will be verified by our team. You can upload multiple files: PDF, DOC, DOCX, JPG, JPEG, and PNG
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
