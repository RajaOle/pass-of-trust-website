
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";

interface ReporteeTypeSelectorProps {
  form: UseFormReturn<CreateLoanReportFormData>;
}

export const ReporteeTypeSelector = ({ form }: ReporteeTypeSelectorProps) => {
  return (
    <FormField
      control={form.control}
      name="reporteeType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Reportee Type</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                // Reset ID type when changing reportee type
                form.setValue("idType", "");
              }}
              defaultValue={field.value}
              className="flex flex-row space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <label htmlFor="individual">Individual</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <label htmlFor="company">Company</label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
