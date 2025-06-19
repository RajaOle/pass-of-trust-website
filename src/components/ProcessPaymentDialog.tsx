
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Activity, Clock } from "lucide-react";
import { useProcessPaymentForm, ProcessPaymentFormData } from "@/hooks/useProcessPaymentForm";
import { OpenPaymentTab } from "@/components/OpenPaymentTab";
import { InstallmentPaymentTab } from "@/components/InstallmentPaymentTab";
import { SinglePaymentTab } from "@/components/SinglePaymentTab";
import { LoanReport } from "@/types/loanReport";

interface ProcessPaymentDialogProps {
  report: LoanReport;
  onProcessPayment: (data: ProcessPaymentFormData) => void;
}

export const ProcessPaymentDialog = ({ report, onProcessPayment }: ProcessPaymentDialogProps) => {
  const [open, setOpen] = useState(false);
  const { form } = useProcessPaymentForm(report);

  const onSubmit = (data: ProcessPaymentFormData) => {
    console.log("Processing payment for report:", report.id, "with data:", data);
    onProcessPayment(data);
    form.reset();
    setOpen(false);
  };

  const renderPaymentContent = () => {
    switch (report.loanType) {
      case "Open Payment":
        return <OpenPaymentTab form={form} report={report} />;
      case "Installment":
        return <InstallmentPaymentTab form={form} report={report} />;
      case "Single Payment":
        return <SinglePaymentTab form={form} report={report} />;
      default:
        return <OpenPaymentTab form={form} report={report} />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="w-28 bg-blue-600 hover:bg-blue-700">
          <Activity className="h-4 w-4 mr-1" />
          Process
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Process Payment</span>
          </DialogTitle>
          <p className="text-sm text-gray-600">
            {report.title} - {report.loanType}
          </p>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {renderPaymentContent()}

            {report.paymentHistory && report.paymentHistory.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3 flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Payment History</span>
                </h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {report.paymentHistory.slice(0, 3).map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                      <div>
                        <span className="font-medium">{payment.amount}</span>
                        {payment.installmentNumber && (
                          <span className="text-gray-500 ml-2">
                            (Installment #{payment.installmentNumber})
                          </span>
                        )}
                      </div>
                      <span className="text-gray-500">{payment.date}</span>
                    </div>
                  ))}
                  {report.paymentHistory.length > 3 && (
                    <p className="text-xs text-gray-500 text-center">
                      +{report.paymentHistory.length - 3} more payments
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Process Payment
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
