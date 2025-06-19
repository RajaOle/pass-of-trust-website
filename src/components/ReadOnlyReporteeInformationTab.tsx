
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RestructureLoanFormData } from "@/hooks/useRestructureLoanForm";

interface ReadOnlyReporteeInformationTabProps {
  form: UseFormReturn<RestructureLoanFormData>;
}

export const ReadOnlyReporteeInformationTab = ({ form }: ReadOnlyReporteeInformationTabProps) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
        <p className="text-sm text-yellow-800">
          📝 Reportee information is read-only during restructure. All original data is preserved.
        </p>
      </div>

      <FormField
        control={form.control}
        name="borrowerName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Borrower/Company Name</FormLabel>
            <FormControl>
              <Input {...field} disabled className="bg-gray-100" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input {...field} disabled className="bg-gray-100" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} disabled className="bg-gray-100" />
            </FormControl>
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
              <Input {...field} disabled className="bg-gray-100" />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
