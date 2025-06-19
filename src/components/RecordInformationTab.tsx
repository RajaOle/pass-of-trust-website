
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";

interface RecordInformationTabProps {
  form: UseFormReturn<CreateLoanReportFormData>;
  showCollateral: boolean;
  setShowCollateral: (show: boolean) => void;
}

export const RecordInformationTab = ({ 
  form, 
  showCollateral, 
  setShowCollateral 
}: RecordInformationTabProps) => {
  const watchLoanType = form.watch("loanType");

  return (
    <div className="space-y-4 mt-4">
      <FormField
        control={form.control}
        name="title"
        rules={{ required: "Loan title is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Loan Title *</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Home Mortgage Loan" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="loanAmount"
        rules={{ required: "Loan amount is required" }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Loan Amount *</FormLabel>
            <FormControl>
              <Input placeholder="e.g., $350,000" {...field} />
            </FormControl>
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
                <SelectTrigger>
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Installment">Installment</SelectItem>
                <SelectItem value="Single Payment">Single Payment</SelectItem>
                <SelectItem value="Open Payment">Open Payment</SelectItem>
              </SelectContent>
            </Select>
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
                <Input type="number" placeholder="e.g., 12" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="addCollateral"
            checked={showCollateral}
            onChange={(e) => setShowCollateral(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="addCollateral" className="text-sm font-medium">
            Add Collateral Information (Optional)
          </label>
        </div>

        {showCollateral && (
          <>
            <FormField
              control={form.control}
              name="collateralType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collateral Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select collateral type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Real Estate">Real Estate</SelectItem>
                      <SelectItem value="Vehicle">Vehicle</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                      <SelectItem value="Cash Deposit">Cash Deposit</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="collateralAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collateral Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $400,000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </div>

      <FormField
        control={form.control}
        name="dueDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Due Date (Optional)</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
