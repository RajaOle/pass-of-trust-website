
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ProcessPaymentFormData } from "@/hooks/useProcessPaymentForm";
import { LoanReport } from "@/types/loanReport";
import { calculateOutstandingAmount, formatCurrency } from "@/utils/paymentCalculations";
import { PaymentProofUpload } from "@/components/PaymentProofUpload";

interface SinglePaymentTabProps {
  form: UseFormReturn<ProcessPaymentFormData>;
  report: LoanReport;
}

export const SinglePaymentTab = ({ form, report }: SinglePaymentTabProps) => {
  const outstandingAmount = calculateOutstandingAmount(report);

  const handleUseFullAmount = () => {
    form.setValue("paymentAmount", formatCurrency(outstandingAmount));
    form.setValue("paymentType", "full");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-sm font-medium text-gray-700">Initial Amount</p>
          <p className="text-lg font-semibold text-green-600">{report.loanAmount}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Outstanding Amount</p>
          <p className="text-lg font-semibold text-red-600">{formatCurrency(outstandingAmount)}</p>
        </div>
      </div>

      <div className="p-4 bg-green-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Full Payment</p>
            <p className="text-sm text-gray-600">Pay the complete outstanding amount</p>
          </div>
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleUseFullAmount}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            Pay Full Amount
          </Button>
        </div>
      </div>

      <FormField
        control={form.control}
        name="paymentAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Amount</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter payment amount"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <PaymentProofUpload form={form} />

      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes (Optional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Add any additional notes about this payment"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
