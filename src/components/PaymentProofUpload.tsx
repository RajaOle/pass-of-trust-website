
import React, { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { upload, X } from "lucide-react";
import { ProcessPaymentFormData } from "@/hooks/useProcessPaymentForm";

interface PaymentProofUploadProps {
  form: UseFormReturn<ProcessPaymentFormData>;
}

export const PaymentProofUpload = ({ form }: PaymentProofUploadProps) => {
  const paymentProof = form.watch("paymentProof") || [];

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const currentFiles = form.getValues("paymentProof") || [];
      form.setValue("paymentProof", [...currentFiles, ...newFiles]);
    }
  }, [form]);

  const removeFile = useCallback((index: number) => {
    const currentFiles = form.getValues("paymentProof") || [];
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    form.setValue("paymentProof", updatedFiles);
  }, [form]);

  return (
    <FormField
      control={form.control}
      name="paymentProof"
      render={() => (
        <FormItem>
          <FormLabel>Payment Proof (Optional)</FormLabel>
          <FormControl>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="payment-proof-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("payment-proof-upload")?.click()}
                  className="w-full"
                >
                  <upload className="h-4 w-4 mr-2" />
                  Upload Payment Proof
                </Button>
              </div>
              
              {paymentProof.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                  {paymentProof.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
