
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { Edit } from "lucide-react";
import { LoanReport } from "@/types/loanReport";
import { useAddInfoForm, AddInfoFormData } from "@/hooks/useAddInfoForm";
import { AddInfoReporteeTab } from "@/components/AddInfoReporteeTab";
import { AddInfoSupportingDocumentsTab } from "@/components/AddInfoSupportingDocumentsTab";

interface AddInfoDialogProps {
  report: LoanReport;
  onAddInfo?: (data: AddInfoFormData) => void;
}

export const AddInfoDialog = ({ report, onAddInfo }: AddInfoDialogProps) => {
  const [open, setOpen] = useState(false);
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const [showBankAccount, setShowBankAccount] = useState(false);
  
  const {
    form,
    validatePhoneNumber,
    validateEmail,
    validateWebsite,
    validateBankAccountNumber,
    formatPhoneNumber
  } = useAddInfoForm(report);

  // Initialize checkbox states based on existing data
  useEffect(() => {
    const hasAnySocialMedia = report.instagramProfile || report.tiktokProfile || report.linkedinProfile;
    const hasBankInfo = report.bankName || report.bankAccountNumber;
    
    setShowSocialMedia(!!hasAnySocialMedia);
    setShowBankAccount(!!hasBankInfo);
  }, [report]);

  const onSubmit = (data: AddInfoFormData) => {
    console.log("Adding info to report:", data);
    if (onAddInfo) {
      onAddInfo(data);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-28">
          <Edit className="h-4 w-4 mr-1" />
          Add Info
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Supplemental Information</DialogTitle>
          <p className="text-sm text-gray-600">
            Add missing information to enhance the loan report. Existing data is preserved and cannot be modified.
          </p>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="reportee" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="reportee">Reportee Information</TabsTrigger>
                <TabsTrigger value="documents">Supporting Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reportee">
                <AddInfoReporteeTab
                  form={form}
                  report={report}
                  validatePhoneNumber={validatePhoneNumber}
                  validateEmail={validateEmail}
                  validateWebsite={validateWebsite}
                  validateBankAccountNumber={validateBankAccountNumber}
                  formatPhoneNumber={formatPhoneNumber}
                  showSocialMedia={showSocialMedia}
                  setShowSocialMedia={setShowSocialMedia}
                  showBankAccount={showBankAccount}
                  setShowBankAccount={setShowBankAccount}
                />
              </TabsContent>
              
              <TabsContent value="documents">
                <AddInfoSupportingDocumentsTab />
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Save Additional Information
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
