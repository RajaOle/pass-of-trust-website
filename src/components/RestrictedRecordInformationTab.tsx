
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RestructureLoanFormData } from "@/hooks/useRestructureLoanForm";

interface RestrictedRecordInformationTabProps {
  form: UseFormReturn<RestructureLoanFormData>;
}

export const RestrictedRecordInformationTab = ({ form }: RestrictedRecordInformationTabProps) => {
  const watchLoanType = form.watch("loanType");

  return (
    <div className="space-y-4 mt-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Loan Title</FormLabel>
            <FormControl>
              <Input {...field} disabled className="bg-gray-100" />
            </FormControl>
            <p className="text-xs text-gray-500">This field cannot be modified during restructure</p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="loanAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Loan Amount</FormLabel>
            <FormControl>
              <Input {...field} disabled className="bg-gray-100" />
            </FormControl>
            <p className="text-xs text-gray-500">This field cannot be modified during restructure</p>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="loanType"
        rules={{ required: "Loan type is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Loan Type *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="border-blue-500 bg-blue-50">
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Installment">Installment</SelectItem>
                <SelectItem value="Single Payment">Single Payment</SelectItem>
                <SelectItem value="Open Payment">Open Payment</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-blue-600">✓ This field can be modified</p>
            <FormMessage />
          </FormItem>
        )}
      />

      {watchLoanType === "Installment" && (
        <FormField
          control={form.control}
          name="repaymentCount"
          rules={{ required: "Repayment count is required for installment loans" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repayment Count *</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 12" {...field} className="border-blue-500 bg-blue-50" />
              </FormControl>
              <p className="text-xs text-blue-600">✓ This field can be modified</p>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="dueDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Due Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} className="border-blue-500 bg-blue-50" />
            </FormControl>
            <p className="text-xs text-blue-600">✓ This field can be modified</p>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
