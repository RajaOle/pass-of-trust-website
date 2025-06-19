
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useCreateLoanReportForm, CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";
import { RecordInformationTab } from "@/components/RecordInformationTab";
import { ReporteeInformationTab } from "@/components/ReporteeInformationTab";
import { SupportingDocumentsTab } from "@/components/SupportingDocumentsTab";

interface CreateLoanReportDialogProps {
  onCreateReport: (data: CreateLoanReportFormData) => void;
}

export const CreateLoanReportDialog = ({
  onCreateReport
}: CreateLoanReportDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("record");
  const [showCollateral, setShowCollateral] = React.useState(false);
  const [showSocialMedia, setShowSocialMedia] = React.useState(false);
  const [showBankAccount, setShowBankAccount] = React.useState(false);
  
  const { form, validatePhoneNumber, validateEmail, validateWebsite, validateBankAccountNumber, formatPhoneNumber } = useCreateLoanReportForm();

  const watchLoanType = form.watch("loanType");
  const watchReporteeType = form.watch("reporteeType");

  const onSubmit = (data: CreateLoanReportFormData) => {
    onCreateReport(data);
    form.reset();
    setOpen(false);
    setActiveTab("record");
    setShowCollateral(false);
    setShowSocialMedia(false);
    setShowBankAccount(false);
  };

  const handleNext = async () => {
    if (activeTab === "record") {
      // Validate required fields in Record Information tab
      const fieldsToValidate = ["title", "loanAmount", "loanType"];
      
      // Also validate repaymentCount if loan type is Installment
      if (watchLoanType === "Installment") {
        fieldsToValidate.push("repaymentCount");
      }
      
      const isValid = await form.trigger(fieldsToValidate);
      if (!isValid) return;
      
      setActiveTab("reportee");
    } else if (activeTab === "reportee") {
      // Validate required fields in Reportee Information tab
      let fieldsToValidate: string[] = [];
      
      if (watchReporteeType === "individual") {
        fieldsToValidate = ["borrowerName", "phoneNumber", "email"];
      } else {
        // For companies, only companyName and phoneNumber are required
        fieldsToValidate = ["companyName", "phoneNumber"];
      }
      
      // Always validate these fields if they have values
      const optionalFields = ["email", "website", "bankAccountNumber"];
      for (const field of optionalFields) {
        const value = form.getValues(field as keyof CreateLoanReportFormData);
        if (value) {
          fieldsToValidate.push(field);
        }
      }
      
      const isValid = await form.trigger(fieldsToValidate);
      if (!isValid) return;
      
      setActiveTab("documents");
    }
  };

  const handlePrevious = () => {
    if (activeTab === "documents") {
      setActiveTab("reportee");
    } else if (activeTab === "reportee") {
      setActiveTab("record");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Report</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="record">Record Information</TabsTrigger>
                <TabsTrigger value="reportee">Reportee Information</TabsTrigger>
                <TabsTrigger value="documents">Supporting Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="record">
                <RecordInformationTab 
                  form={form}
                  showCollateral={showCollateral}
                  setShowCollateral={setShowCollateral}
                />
              </TabsContent>

              <TabsContent value="reportee">
                <ReporteeInformationTab 
                  form={form}
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
                <SupportingDocumentsTab form={form} />
              </TabsContent>
            </Tabs>

            <div className="flex justify-between space-x-2 pt-4">
              <div>
                {activeTab !== "record" && (
                  <Button type="button" variant="outline" onClick={handlePrevious}>
                    Previous
                  </Button>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                
                {activeTab === "documents" ? (
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Create Report
                  </Button>
                ) : (
                  <Button type="button" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                    Next
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
